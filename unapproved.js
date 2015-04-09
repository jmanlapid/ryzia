if (Meteor.isClient) {
  Template.unapproved.events({
    'click .btn-success': function (event, template) {
      var parentDiv = $(event.currentTarget).parent();
      parentDiv.empty();
      parentDiv.html(
        '<div class="alert alert-warning" role="alert"><span class="glyphicon glyphicon-floppy-save" aria-hidden="true"></span> Video is now being processed. It should take about a minute.</div>'
      );
      Session.set('success_message', this.title + ' by ' + this.artist + ' has been successfully encoded. It should now appear on the Approved page.');
      Meteor.call('transcode_video', this);

    },
    'click .btn-danger': function (event, template) {
      var parentDiv = $(event.currentTarget).parent();
      parentDiv.empty();
      parentDiv.html(
        '<div class="alert alert-warning" role="alert"><span class="glyphicon glyphicon-floppy-remove" aria-hidden="true"></span> Video is now being deleted.</div>'
      );
      Session.set('success_message', this.title + ' by ' + this.artist + ' has been successfully deleted from storage.');
      Meteor.call('delete_s3', this);
    }
  });

  Template.unapproved.helpers({
    'unapproved_videos': function () {
      return Videos.find({approved: false});
    },
    'stream_url': function () {
      return 'http://d1mzh3upct8ych.cloudfront.net/' + this.keys.unencoded;
    },
    'waiting': function () { 
      return Session.get('waiting');
    }
  });

  Template.unapproved.rendered = function () {
    Meteor.defer (function () {
      document.getElementById("unapproved_videos")._uihooks = {
        removeElement: function (node) {
          var placeholder = document.createElement('div');
          $placeholder = $(placeholder);
          $placeholder.html('<div class="alert alert-success" role="alert"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span> ' + Session.get('success_message') + '</div>');
          $placeholder.insertBefore(node);
          $(node).remove();
        }
      }
    });
  }
}

if (Meteor.isServer) {
  Meteor.startup(function () {
      AWS.config.update({
        accessKeyId: Meteor.settings.AWS.ACCESS_ID,
        secretAccessKey: Meteor.settings.AWS.ACCESS_KEY,
        region: "us-east-1"
      });
  });

  Meteor.methods({
    'test_delete': function (videoObj) {
      Videos.remove(videoObj);
    },
    'delete_s3': function (videoObj) {
      var params = {
        Bucket: Meteor.settings.AWS.BUCKET_NAME,
        Key: videoObj.keys.unencoded
      };

      s3 = new AWS.S3();
      var s3_deleteObjectSync = Meteor.wrapAsync(s3.deleteObject, s3);
      try {
        var result = s3_deleteObjectSync(params);
        Videos.remove(videoObj);
      } catch (error) {
        console.error(error);
      }
    },

    'transcode_video': function (videoObj) {
      var outputKeyPrefix = Meteor.settings.AWS.ENCODED_PREFIX + '/' + utils.formatS3(videoObj.artist) + '/' + utils.formatS3(videoObj.title) + '/'; 
      var params = {
        Input: {
          AspectRatio: 'auto',
          Container: 'auto',
          FrameRate: 'auto',
          Interlaced: 'auto',
          Key: videoObj.keys.unencoded,
          Resolution: 'auto'
        },
        PipelineId: Meteor.settings.AWS.PIPELINE_ID,
        OutputKeyPrefix: outputKeyPrefix,
        Outputs: [
          {
            AlbumArt: null,
            Captions: null,
            Composition: [],
            Key: 'desktop.mp4',
            PresetId: Meteor.settings.AWS.PRESET_ID,
            Rotate: '0',
            ThumbnailPattern:'thumb-{count}'
          }
        ]
      };

      var elasticTranscoder = new AWS.ElasticTranscoder();
      var createJobSync = Meteor.wrapAsync(elasticTranscoder.createJob, elasticTranscoder);

      try {
        var result = createJobSync(params);
        var jobId = result.Job.Id;
        Meteor.call('get_completed_status', videoObj, jobId);
      } catch (e) {
        console.error('Error sending job to elastic transcoder: ' + e);
      }
    },

    'get_completed_status': function (videoObj, jobId) {
      var elasticTranscoder = new AWS.ElasticTranscoder();
      var waitForSync = Meteor.wrapAsync(elasticTranscoder.waitFor, elasticTranscoder);
      try {
        var result = waitForSync('jobComplete', {Id: jobId});
        var outputKeyPrefix = result.Job.OutputKeyPrefix;
        var desktopKey = outputKeyPrefix + result.Job.Output.Key;
        var thumbnailKey = outputKeyPrefix + 'thumb-00001.png';
        Videos.update(
          videoObj,
          {
            $set: {
              "approved": true,
              "approved_date": new Date(),
              "keys.desktop": desktopKey,  
              "keys.thumbnail": thumbnailKey
            }
          },
          {
            $unset: {
              "keys.unencoded": ""
            }
          }
        );
      } catch (e) {
        console.error('Error waiting for encoder job to complete: ' + e);
      }
    }
  });
}


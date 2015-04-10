if (Meteor.isClient) {
  Template.unapproved.events({
    'click .btn-success': function (event, template) {
      var parentDiv = $(event.currentTarget).parent();
      parentDiv.empty();
      parentDiv.html(
        '<div class="alert alert-warning" role="alert"><span class="glyphicon glyphicon-floppy-save" aria-hidden="true"></span> Video is now being processed. It should take about a minute.</div>'
      );
      Session.set('success_message', this.title + ' by ' + this.artist + ' has been successfully encoded and will appear on approved page.');
      Meteor.call('create_job', this);
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
    unapproved_videos: function () {
      return Videos.find({approved: false});
    },
    stream_url: function () {
      return 'http://d1mzh3upct8ych.cloudfront.net/' + this.keys.unencoded;
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
  Future = Npm.require('fibers/future');
  Meteor.startup(function () {
      AWS.config.update({
        accessKeyId: Meteor.settings.AWS.ACCESS_ID,
        secretAccessKey: Meteor.settings.AWS.ACCESS_KEY,
        region: "us-east-1"
      });
  });

  Meteor.methods({
    delete_s3: function (videoObj) {
      var fut = new Future();
      var params = {
        Bucket: Meteor.settings.AWS.BUCKET_NAME,
        Key: videoObj.keys.unencoded
      };
      s3 = new AWS.S3();
      s3.deleteObject(params, Meteor.bindEnvironment(function (err, result) {
        if (err) return fut.error(err);
        Videos.remove(videoObj);
        fut.return(result);
      }));
      return fut.wait();
    },

    create_job: function (videoObj) {
      var fut = new Future();
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
      elasticTranscoder.createJob(params, Meteor.bindEnvironment(function (err, result) {
        if (err) {
          console.error('Error creating encoder job: ' + JSON.stringify(params));
          return fut.error(err);
        }
        var jobId = result.Job.Id;
        Meteor.call('wait_job', videoObj, jobId);
        fut.return(null);
      }));
      return fut.wait();
    },

    wait_job: function (videoObj, jobId) {
      var fut = new Future();
      var elasticTranscoder = new AWS.ElasticTranscoder();
      elasticTranscoder.waitFor('jobComplete', {Id: jobId}, Meteor.bindEnvironment(function (err, result) {
        if (err) {
          console.error('Error waiting for encoder job: ' + jobId);
          return fut.error(err);
        }
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
        fut.return(null);
      }));
      return fut.wait();
    }
  });
}


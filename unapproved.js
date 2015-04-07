if (Meteor.isClient) {
  Template.unapproved.events({
    'click .btn-success': function (event, template) {
      Meteor.call('transcode_video', this);
    },
    'click .btn-danger': function (event, template) {
      Meteor.call('delete_s3', this);
    }
  });

  Template.unapproved.helpers({
    unapproved_videos: function () {
      return Videos.find({});
    },
    stream_url: function () {
      return 'http://d1mzh3upct8ych.cloudfront.net/' + this.keys.unencoded;
    }
  });
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
            ThumbnailPattern:'{count}'
          }
        ]
      };

      var elasticTranscoder = new AWS.ElasticTranscoder();
      var createJobSync = Meteor.wrapAsync(elasticTranscoder.createJob, elasticTranscoder);

      try {
        var result = createJobSync(params);
      } catch (e) {
        console.error('Error sending job to elastic transcoder: ' + e);
      }
    }
  });
}


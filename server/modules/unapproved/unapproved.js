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
    delete_s3: function (key) {
      var fut = new Future();
      var params = {
        Bucket: Meteor.settings.AWS.BUCKET_NAME,
        Key: key
      };
      s3 = new AWS.S3();
      s3.deleteObject(params, Meteor.bindEnvironment(function (err, result) {
        if (err) return fut.error(err);
        fut.return(result);
      }));
      return fut.wait();
    },

    delete_video_doc: function (videoObj) {
      Videos.remove(videoObj);
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
        Videos.update(
          videoObj,
          {
            $set: {
              "jobId": jobId,
              "status": "ENCODING"
            }
          }
        )
        fut.return(null);
      }));
      return fut.wait();
    },
    email_denied: function (to, videoTitle, artist, reasons, comments) {
      this.unblock(); 
      var subject = 'Ryzia has denied your video to be publicly displayed';
      var text = 'Hi ' + artist + ',\n';
      text+= 'Your video, ' + videoTitle + ', does not meet our standards for the following reasons:\n ';
      text += reasons + '\n';
      if (comments) {
        text += 'Additional comments:';
        text += comments;
      }
      Email.send({
        to: to,
        from: 'james@ryzia.com',
        subject: subject,
        text: text
      });
    },
    email_approved: function (videoObj) {
      this.unblock();
      var subject = 'Ryzia has approved your video';
      var text = 'Hi ' + videoObj.artist + ',\n';
      text += 'Your video, ' + videoObj.title +', has been approved. It is being encoded and should publicly be available shortly.';
      Email.send({
        to: videoObj.email,
        from: 'james@ryzia.com',
        subject: subject,
        text: text
      });
    }
  });
}


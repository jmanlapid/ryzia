if (Meteor.isServer) {
  Meteor.methods({
    process_sns: function (body) {
      console.log(JSON.stringify(body));
      var message = body.Message;
      var state = message.state;
      switch (state) {
        case 'COMPLETED': 
          Meteor.call('finalize_job', message);
          break;
       default:
          break
      }
  },

    finalize_job: function (jobDetails) {
      var jobId = jobDetails.jobId;
      var outputKeyPrefix = jobDetails.outputKeyPrefix;
      var desktopKey = outputKeyPrefix + 'desktop.mp4';
      var thumbnailKey = outputKeyPrefix + 'thumb-00001.png';

      var videoObj = Videos.findOne({ jobId: jobId });
      Meteor.call('delete_s3', videoObj.keys.unencoded);
      Meteor.call('email_approved', videoObj);
      Videos.update(
        videoObj, 
        {
          $set: {
            "status": "APPROVED",
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
    }
  });
}
if (Meteor.isServer) {
  Meteor.methods({
    process_sns: function (body) {
      console.log(JSON.stringify(body));
      var message = body.Message;
      var state = message.state;
      switch (state) {
        case 'COMPLETED': 
          console.log('calling completed function');
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

      Videos.update(
        { jobId: jobId }, 
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
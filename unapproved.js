if (Meteor.isClient) {
  Template.unapproved.events({
    'click .btn-success': function (event, template) {
      alert(JSON.stringify(this));
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
      return Meteor.settings.AWS.CLOUDFRONT_URL + this.keys.unapproved;
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {

  });

  Meteor.methods({
    'delete_s3': function (videoObj) {
      AWS.config.update({
        accessKeyId: Meteor.settings.AWS.ACCESS_ID,
        secretAccessKey: Meteor.settings.AWS.ACCESS_KEY
      });

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
  });
}



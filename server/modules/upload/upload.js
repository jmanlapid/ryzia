if (Meteor.isServer) {
  var GLOBAL_KEY;
 
  Meteor.startup(function () {
    Slingshot.createDirective('ryzia', Slingshot.S3Storage, {
      AWSAccessKeyId: Meteor.settings.AWS.ACCESS_ID,
      AWSSecretAccessKey: Meteor.settings.AWS.ACCESS_KEY,
      bucket: Meteor.settings.AWS.BUCKET_NAME,
      key: function(file, metaContext) {
        GLOBAL_KEY = Meteor.settings.AWS.UNENCODED_PREFIX + '/' + utils.formatS3(metaContext.artist) + '-' + utils.formatS3(metaContext.title) + '-' + file.name;
        return GLOBAL_KEY;
      },
      maxSize: 500 * 1024 * 1024,
      allowedFileTypes: ['video/mp4', 'video/webm', 'video/ogg', 'video/wmv'],
      authorize: function() {
        return true;
      }
    });
  });

  Meteor.methods({
    'addVideo': function (title, artist, email, genres, youtube_id) {
      Videos.insert({
        title: title,
        artist: artist,
        email: email,
        genres: genres,
        status: 'SUBMITTED',
        submitted: new Date(),
        keys: {
          unencoded: GLOBAL_KEY
        },
        youtube_id: youtube_id
      });
    }
  });
}
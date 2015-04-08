

if (Meteor.isClient) {
  Template.upload.events({
    "submit #form": function(e) {
      var form = document.getElementById('form').elements;
      var file = form['file'].files[0];
      var genres = form['genres'].value;
      var title = form['title'].value;
      var artist = form['artist'].value;
      var email = form['email'].value;

      var genresArr = (function (genreStr) {
        var arr = [];
        var toArr = genreStr.split(',');
        toArr.forEach(function (item) {
          arr.push(item.trim());
        });
        return arr;
      } (genres));

      var metaContext = {
        title: title,
        artist: artist,
        email: email,
        genres: genresArr
      };

      var uploader = new Slingshot.Upload('ryzia', metaContext);

      uploader.send(file, function (err, downloadUrl) {
        if (err) {
          Session.set('uploadFailure', false);
          console.error('Error uploading', uploader.xhr.response);
        } else {
          Meteor.call('addVideo', title, artist, email, genresArr, downloadUrl);
          Session.set('uploadSuccess', true);
        }
      });
    
      return false;
    }

  });

  Template.upload.helpers({
    uploadSuccess: function () {
      return Session.get('uploadSuccess');
    },
    uploadFailure: function () {
      return Session.get('uploadFailure');
    }
  });
}

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
      maxSize: 10 * 1024 * 1024,
      allowedFileTypes: ['video/mp4', 'video/mov', 'video/wmv', 'video/flv', 'video/avi'],
      authorize: function() {
        return true;
      }
    });
  });

  Meteor.methods({
    addVideo: function (title, artist, email, genres) {
      Videos.insert({
        title: title,
        artist: artist,
        email: email,
        genres: genres,
        approved: false,
        submitted: new Date(),
        keys: {
          unencoded: GLOBAL_KEY
        }
      });
    }
  });
}



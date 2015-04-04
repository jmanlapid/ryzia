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
          console.error('Error uploading', uploader.xhr.response);
        } else {
          Meteor.call('addVideo', title, artist, email, genresArr, downloadUrl);
        }
      });
    
      return false;
    }

  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    function normalizeS3 (str) {
      return str.replace(/[`~!@#$%^&*()|+=÷¿?;:'",.<>\{\}\[\]\\\/]/gi, '')
      .replace(/ /gi, '-')
      .toLowerCase();
    }

    Slingshot.createDirective('ryzia', Slingshot.S3Storage, {
      AWSAccessKeyId: Meteor.settings.AWS.ACCESS_ID,
      AWSSecretAccessKey: Meteor.settings.AWS.ACCESS_KEY,
      bucket: Meteor.settings.AWS.BUCKET_NAME,
      key: function(file, metaContext) {
        return Meteor.settings.AWS.PREFIX_UNENCODED + '/' + normalizeS3(metaContext.artist) + '-' + normalizeS3(metaContext.title) + '-' + file.name;
      },
      maxSize: 10 * 1024 * 1024,
      allowedFileTypes: ['video/mp4'],
      authorize: function() {
        return true;
      }
    });
  });
}

Meteor.methods({
  addVideo: function (title, artist, email, genres, url) {
    Videos.insert({
      title: title,
      artist: artist,
      email: email,
      genres: genres,
      approved: false,
      added: new Date(),
      url: url
    });
  }
});

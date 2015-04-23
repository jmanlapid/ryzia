if (Meteor.isClient) {
  var uploaderReference = new Slingshot.Upload('init');
  
  Template.upload.events({
    'change #file': function (e) {
      var URL = window.URL || window.webkitURL;
      var file = document.getElementById('file').files[0];
      var type = file.type;
      var fileURL = URL.createObjectURL(file);

      function supports_video (type) {
        var player = document.createElement('video');
        return eval(!!player.canPlayType && !!player.canPlayType(type));
        }
      if (supports_video(type)) {
        Session.set({
          'url': fileURL,
          'type': type 
        });
      }
    },
    'submit #form': function (e) {
      var form = document.getElementById('form').elements;
      var file = form['file'].files[0];
      var title = form['title'].value;
      var artist = form['artist'].value;
      var email = form['email'].value;
      var youtube_id = form['youtube_id'].value;

      var genres = [];
      $('#form').find('input[type=checkbox]').each(function () {
        var input = $(this);
        if (input.prop('checked')) {
          genres.push(input.val());
        }
      });

      var metaContext = {
        title: title,
        artist: artist,
        email: email,
        genres: genres
      };

      var uploader = new Slingshot.Upload('ryzia', metaContext);
      uploaderReference = uploader;      
      
      Session.set('uploading', true);
      uploader.send(file, function (err, downloadUrl) {
        if (err) {
          Session.set('uploadFailure', false);
          console.error('Error uploading', uploader.xhr.response);
        } else {
          Meteor.call('addVideo', title, artist, email, genres, youtube_id);
          Session.set('uploadSuccess', true);
          $('#form').hide();
          Session.set('uploading', false);
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
    },
    url: function () {
      return Session.get('url');
    },
    uploading: function () {
      return Session.get('uploading');
    }
  });

  Template.preview.helpers({
    url: function () {
      return Session.get('url');
    },
    type: function () {
      return Session.get('type');
    }
  });

  Template.progressBar.helpers({
    progress: function () {
      return Math.round(uploaderReference.progress() * 100);
    }
  });
}

if (Meteor.isClient) {
  var uploaderReference = new Slingshot.Upload('init');
  
  Template.upload.events({
    'click #terms-link': function (e) {
      bootbox.dialog({
        message: 'Please read the following carefully before submitting your music video to Ryzia.' +
                  '<hr>' +
                  '<ol>' +
                    '<li>I am the original artist in the music video or an extension of the artist of which I was given permission to upload it on Ryzia.</li>' +
                    '<li>I am uploading a music video that is not violating any copyrights and has completely original content.</li>' +
                    '<li>I understand that Ryzia is not responsible for confidentiality within content of a submitted music video.</li>' +
                    '<li>I understand that Ryzia reserves the right to privately view the submitted music video for purposes of curating its originality, content, and quality before making it publicly viewable on the platform.</li>' +
                    '<li>I understand that Ryzia reserves the right to deny and delete a submitted music video submission based on any reason whatsoever such as to prevent it from being publicly viewable on the platform.</li>' +
                    '<li>I give Ryzia permission to save my email address in a secure database. Ryzia will not publicly display your email address without your permission.</li>' +
                    '<li>I give Ryzia permission to message the email address I have provided.</li>' +
                    '<li>I understand that Ryzia may remove my approved music video without notifiying me.</li>' +
                    '<li>I give Ryzia permission to publicy display my approved music video.</li>'+ 
                  '</ol>',
        buttons: {
          agree: {
            label: "Agree",
            className: "btn-success",
            callback: function() {
              $('#terms-checkbox').prop('checked', true);
              return;
            }
          },
          close: {
            label: "Close",
            className: "btn-default",
            callback: function() {
              return;
            }
          },
        }
      });
    },
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
      var genreChecked = false;
      $('#form').find('input[name=genre]').each(function () {
        var input = $(this);
        if (input.prop('checked')) {
          genres.push(input.val());
          genreChecked = true;
        }
      });
      if (!genreChecked) {
        $('#form-group-genres').addClass('has-error');
        return false;
      }

      if (!$('#terms-checkbox').prop('checked')) {
        $('#form-group-terms').addClass('has-error');
        return false;
      }

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

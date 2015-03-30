if (Meteor.isClient) {
  Template.body.events({
    "submit #form": function(e) {
      var form = document.getElementById('form').elements;
      var file = form['file'].files[0];
      var title = form['title'].value;
      var artist = form['artist'].value;
      var email = form['email'].value;
      
      var uploader = new Slingshot.Upload('ryzia');
      uploader.send(file, function (err, downloadUrl) {
        if (err) {
          console.error('Error uploading', uploader.xhr.response);
        }
        alert(downloadUrl);
      });
      return false;
    }
  });

  Template.body.helpers({

  });
    
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    Slingshot.createDirective('ryzia', Slingshot.S3Storage, {
      AWSAccessKeyId: Meteor.settings.AWS_ACCESS_ID,
      AWSSecretAccessKey: Meteor.settings.AWS_ACCESS_KEY,
      bucket: 'ryzia-test',
      key: 'test.mp4',
      maxSize: 10 * 1024 * 1024,
      allowedFileTypes: ['video/mp4'],
      authorize: function() {
        return true;
      }
    });
  });
}

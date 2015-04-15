if (Meteor.isClient) {
  Template.unapproved.events({
    'click .btn-success': function (event, template) {
      var parentDiv = $(event.currentTarget).parent();
      parentDiv.empty();
      parentDiv.html(
        '<div class="alert alert-warning" role="alert"><span class="glyphicon glyphicon-floppy-save" aria-hidden="true"></span> Video is now being processed. It should take about a minute.</div>'
      );
      Session.set('success_message', this.title + ' by ' + this.artist + ' has been successfully encoded and will appear on approved page.');
      Meteor.call('create_job', this);
    },
    'click .btn-danger': function (event, template) {
      var parentDiv = $(event.currentTarget).parent();
      parentDiv.empty();
      parentDiv.html(
        '<div class="alert alert-warning" role="alert"><span class="glyphicon glyphicon-floppy-remove" aria-hidden="true"></span> Video is now being deleted.</div>'
      );
      Session.set('success_message', this.title + ' by ' + this.artist + ' has been successfully deleted from storage.');
      Meteor.call('delete_s3', this);
      //Meteor.call('email_denied', this);
    },
    'click #send_email': function () {
      console.log('email_test trigger fired');
      Meteor.call('send_email');
    }
  });

  Template.unapproved.helpers({
    unapproved_videos: function () {
      return Videos.find({approved: false});
    },
    stream_url: function () {
      return 'http://d1mzh3upct8ych.cloudfront.net/' + this.keys.unencoded;
    }
    /*
    youtube_views: function () {
      if (!this.youtube_id) return false;
      Meteor.call('getYouTubeDetails', this.youtube_id, function (err, res) {
        if (err) return false;
        if (res.items[0]) Session.Set('youtube_views', res.items[0].statistics.viewCount);
      });
      return Session.get('youtube_views');
    }
    */
  });

  Template.unapproved.rendered = function () {
    Meteor.defer (function () {
      document.getElementById("unapproved_videos")._uihooks = {
        removeElement: function (node) {
          var placeholder = document.createElement('div');
          $placeholder = $(placeholder);
          $placeholder.html('<div class="alert alert-success" role="alert"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span> ' + Session.get('success_message') + '</div>');
          $placeholder.insertBefore(node);
          $(node).remove();
        }
      }
    });
  }
}

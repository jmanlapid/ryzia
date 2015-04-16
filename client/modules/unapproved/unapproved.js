if (Meteor.isClient) {
  Session.set('success_message', null);

  Template.unapproved.events({
    'click .btn-success': function (event, template) {
      var parentDiv = $(event.currentTarget).parent();
      var message = this.title + ' by ' + this.artist + ' is now being encoded. An email will be sent to ' + this.email + ' when finished.';
      Session.set('success_message', message);
      Meteor.call('create_job', this);
    },
    'click .btn-warning': function (event, template) {
      var parentDiv = $(event.currentTarget).parent();
      parentDiv.slideUp(300, function () {
        parentDiv.next().slideDown(300);
      });
    },
    'click .btn-default': function (event, template) {
      var $e = $(event.currentTarget);
      var $deny_confirmation = $e.closest('div.deny_confirmation');
      $deny_confirmation.slideUp(300, function () {
        $deny_confirmation.siblings().slideDown(300);  
      });
      return false;
    },
    'click .btn-danger': function (event, template) {
      var form = $(event.currentTarget).closest('form');
      var reasons = '';
      var comments = form.find('textarea[name="comments"]').val();
      form.find('input[type=checkbox]').each(function () {
        var input = $(this);
        if (input.prop('checked')) {
          reasons += input.val() + '\n';
        }
      });
      if (!reasons) {
        alert('Please check at least one reason for denying video');
        return false;
      }
      Session.set('success_message', this.title + ' by ' + this.artist + ' has been successfully deleted from storage. An email has been sent to ' + this.email + '.');
      Meteor.call('delete_video_s3', this.keys.unencoded);
      Meteor.call('delete_video_doc', this);
      Meteor.call('email_denied', this.email, this.title, this.artist, reasons, comments);
      return false;
    },
  });

  Template.unapproved.helpers({
    unapproved_videos: function () {
      return Videos.find({status: 'SUBMITTED'});
    },
    stream_url: function () {
      return 'http://d1mzh3upct8ych.cloudfront.net/' + this.keys.unencoded;
    }
  });

  Template.unapproved.rendered = function () {
    Session.set('success_message', '');
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

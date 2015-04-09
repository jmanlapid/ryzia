if (Meteor.isClient) {
  Session.set('video_url', null);
  Template.approved.events({
    'click img': function () {
      Session.set('video_url', CLIENT_SETTINGS.CLOUDFRONT_URL + this.keys.desktop);
    }
  });

  Template.approved.helpers({
    'approved': function () {
      return Videos.find({approved: true});
    },
    'thumbnail_url': function () {
      return CLIENT_SETTINGS.CLOUDFRONT_URL + this.keys.thumbnail;
    },
    'video_url': function () {
      return Session.get('video_url');
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {

  });

  Meteor.methods({

  });
}


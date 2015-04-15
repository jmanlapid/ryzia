if (Meteor.isClient) {
  Session.set('player_vid_url', null);

  Template.approved.events({
    'click img': function () {
      Session.set('player_vid_url', CLIENT_SETTINGS.CLOUDFRONT_URL + this.keys.desktop);
      Session.set('player_thumbnail_url', CLIENT_SETTINGS.CLOUDFRONT_URL + this.keys.thumbnail);
    }
  });

  Template.approved.helpers({
    'approved': function () {
      return Videos.find({approved: true});
    },
    'thumbnail_url': function () {
      return CLIENT_SETTINGS.CLOUDFRONT_URL + this.keys.thumbnail;
    },
    'player_vid_url': function () {
      return Session.get('player_vid_url');
    },
    'player_thumbnail_url': function () {
      return Session.get('player_thumbnail_url');
    }
  });
}

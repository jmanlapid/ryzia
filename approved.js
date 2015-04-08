if (Meteor.isClient) {
  Template.approved.events({

  });

  Template.approved.helpers({
    'approved': function () {
      return Videos.find({approved: true});
    },
    'thumbnail_url': function () {
      return CLIENT_SETTINGS.CLOUDFRONT_URL + this.keys.thumbnail;
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {

  });

  Meteor.methods({

  });
}


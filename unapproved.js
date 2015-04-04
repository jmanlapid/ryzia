if (Meteor.isClient) {
  Template.unapproved.events({

  });

  Template.unapproved.helpers({
    unapproved_videos: function () {
      return Videos.find({});
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
  });
}

Meteor.methods({

});

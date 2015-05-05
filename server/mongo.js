Meteor.startup(function () {
  process.env.MONGO_URL = Meteor.settings.MONGO_URL;
});
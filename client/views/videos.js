Videos = new Mongo.Collection('videos');

Template.videos.helpers({
  videos: function () {
    return Videos.find({});
  }
});
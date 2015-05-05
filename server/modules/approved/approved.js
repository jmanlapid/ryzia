if (Meteor.isServer) {
  Meteor.publish('landing', function (genres) {
    //return FakeVideos.find({}, { sort: {approved_date: -1 }, limit: 3 });
    return Videos.find({status: 'APPROVED'});
  });

  Meteor.publish('sort', function (genres) {
    return Videos.find({genres: { $in: genres}});
  });

  Meteor.methods({
    incViewCount: function (videoObj) {
      Videos.update(videoObj,
        { $inc: { 'views.ryzia': 1 } }
      );
    }
  })
}
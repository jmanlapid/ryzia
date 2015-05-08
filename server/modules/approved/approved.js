if (Meteor.isServer) {
  Meteor.publish('landing', function (genres) {
    //return Videos.find({}, { sort: {approved_date: -1 }, limit: 3 });
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
    },
    addViewGeolocation: function (videoObj, latitude, longitude) {
      var video_id = videoObj._id;
      var viewObj = Views.findOne({ video_id: video_id });
      var coordStr = latitude + ',' + longitude;
      if (!viewObj) {
        Views.insert({ 
          video_id: video_id,
          geolocations: [coordStr]
        });
      } else {
        Views.update(
          viewObj,
          { $push: { geolocations: coordStr }
        });
      }
    }
  });
}
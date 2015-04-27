if (Meteor.isServer) {
  SyncedCron.add({
    name: 'Updating YouTube views from all APPROVED videos with a youtube_id',
    schedule: function(parser) {
      // parser is a later.parse object
      return parser.text('every 15 minutes');
    },
    job: function() {
      var ids = [];
      Videos.find({ status: "APPROVED", youtube_id: { $exists: true }})
      .forEach(function (vid) {
        ids.push(vid.youtube_id);
      });
      try {
        var result = Meteor.call('getYouTubeDetails', ids.join());
        if (result.statusCode === 200 && result.data.items.length > 0) {
          result.data.items.forEach(function (item) {
            var youtube_id = item.id;
            var views = item.statistics.viewCount;
            Videos.update(
              { 'youtube_id': youtube_id },
              { $set: { 'views.youtube': views }
            });
          });
        } else {
          throw new Error(result);
        }
      } catch (e) {
        throw new Error(e);
      }
    }
  });

  SyncedCron.start();
}
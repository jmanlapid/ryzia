if (Meteor.isClient) {
  Template.index.events({
    'submit form': function () {
      var id = document.getElementById('youtube_id').value;
      Meteor.call('getYouTubeDetails', id, function (err, res) {
        if (err) console.error(err);
        alert(JSON.stringify(res.data.items[0].statistics));
      });
      return false;
    }
  });

  Template.index.helpers({
    /*
    youtube_details: function () {
      return Session.get('youtube_details');
    }
    */
  });
}
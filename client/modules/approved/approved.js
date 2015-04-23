if (Meteor.isClient) {
  Meteor.call('loadFakeData');

  Session.set('playing', null);
  var played = [];
  var similar = new ReactiveArray();

  ApprovedProto = {
    playVideo: function (videoObj) {
      Session.set('playing', videoObj);
      var video_url = CLIENT_SETTINGS.CLOUDFRONT_URL + videoObj.keys.desktop;
      var video_thumb = CLIENT_SETTINGS.CLOUDFRONT_URL + videoObj.keys.thumbnail;
      var player = document.getElementById('player');
      var source = document.getElementById('source');
      
      player.setAttribute('poster', video_thumb);
 
      setTimeout(function() {
        player.pause();
        source.setAttribute('src', video_url); 
        player.load();
        player.play();
      } , 500);
    },
  }

  Template.approved.events({
    'ended #player': function (event, template) {
      var next = similar.shift();
      if (next) {
        //nextVideo = FakeVideos.findOne({_id: next_id});
        played.push(next);
        ApprovedProto.playVideo(next);
      }
    },

    'click img': function (event, template) {
      var self = this;
      //reset played and similar since user clicked another video
      played = [];
      similar.clear();

      var genres = this.genres;
      //add all similar videos, minus the current video to similar
      FakeVideos.find(
        { genres: { $in: genres },
          _id: { $ne: self._id}
      })
      .forEach( function (vid) {
        similar.push(vid);
      });

      $("html, body").animate({
        scrollTop:0
      }, 'slow');
      $('#player_div').slideDown(500);

      ApprovedProto.playVideo(this);

      //add the current playing video to played
      played.push(this._id);


    }
  });

  Template.approved.helpers({
    'approved': function () {
      return FakeVideos.find({status: 'APPROVED'});
    },
    'thumbnail_url': function () {
      return CLIENT_SETTINGS.CLOUDFRONT_URL + this.keys.thumbnail;
    },
    'playing': function () {
      return Session.get('playing');
    },
    'similar': function () {
      return similar.list().slice(0, 3);
    }
  });
}

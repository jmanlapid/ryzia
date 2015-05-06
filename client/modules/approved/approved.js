if (Meteor.isClient) {
  //Meteor.call('loadFakeData');
  Session.set('playing', null);
  var played = [];
  var similar = new ReactiveArray();
  var sort = new ReactiveArray();

  ApprovedProto = {
    playVideo: function (videoObj) {
      Session.set('playing', videoObj);
      var video_url = Meteor.settings.public.CLOUDFRONT_URL + videoObj.keys.desktop;
      var video_thumb = Meteor.settings.public.CLOUDFRONT_URL + videoObj.keys.thumbnail;
      var player = document.getElementById('player');
      var source = document.getElementById('source');
      
      player.setAttribute('poster', video_thumb);
 
      setTimeout(function() {
        player.pause();
        source.setAttribute('src', video_url); 
        player.load();
        player.play();
        Meteor.call('incViewCount', videoObj);
      } , 500);
    },
  }

  Template.approved.events({
    'ended #player': function (event, template) {
      var next = similar.shift();
      if (next) {
        played.push(next);
        ApprovedProto.playVideo(next);
      } else {
        $('#player_div').slideUp(1000);
      }
    },
    'click .btn-group a': function (event, template) {
      sort.clear();
      var $btn = $(event.currentTarget);

      if ($btn.hasClass('btn-default')) {
        $btn
        .removeClass('btn-default')
        .addClass('btn-success active');
      } else {
        $btn
        .removeClass('btn-success active')
        .addClass('btn-default');
      }

      $('a[role="genre"]').each(function () {
        var input = $(this);
        if (input.hasClass('active'))
          sort.push(input.data('genre'));
      });
      event.preventDefault();
      return false;
    },

    'click #clear': function (event, template) {
      sort.clear();
      $('#sort').find('input[type=checkbox]').each(function () {
        var input = $(this);
        input.prop('checked', false);
      });
    }
  });

  Template.approved.helpers({
    'playing': function () {
      return Session.get('playing');
    },
    'similar': function () {
      return similar.list().slice(0, 3);
    },
    'thumbnail_url': function () {
      return Meteor.settings.public.CLOUDFRONT_URL + this.keys.thumbnail;
    },
  });

  Template.videoList.events({
    'click img': function (event, template) {
      var self = this;
      var genres = this.genres;
      //reset played and similar since user clicked another video
      played = [];
      similar.clear();

      //add all similar videos, minus the currenst video to similar
      Videos.find(
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

  Template.videoList.helpers({
    'sort': function () {
      return sort;
    },
    'thumbnail_url': function () {
      return Meteor.settings.public.CLOUDFRONT_URL + this.keys.thumbnail;
    },
    'approved': function () {
      var sortArr = sort.array();
      if (sortArr.length > 0)
        return Videos.find({genres: { $in: sortArr }});
      else
        return Videos.find({});
    },
    'totalViews': function () {
      var total = 0;
      total += this.views.ryzia;
      if (this.views.youtube) total += parseInt(this.views.youtube);
      return total;
    }
  });

}

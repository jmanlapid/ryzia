if (Meteor.isClient) {
  var options = {
    keepHistory: 1000 * 60 * 5,
    localSearch: true
  };
  var fields = ['title', 'artist'];
  VideoSearch = new SearchSource('videos', fields, options);
  var markers = [];
  var bounds;

  Template.analytics.events({
    'keyup #search-box': _.throttle(function (e) {
      var text = $(e.target).val().trim();
      VideoSearch.search(text);
      $('#video-details').hide();
      markers.forEach(function (marker) {
        marker.setMap(null);
      });
      markers = [];
    }, 200),
    'click ul a': function (e, t) {
      Session.set('videoId', this._id);
      $('#video-details').show();
      google.maps.event.trigger(GoogleMaps.maps.exampleMap.instance, 'resize');
      var viewsObj = Views.findOne({ video_id: this._id});
      if (viewsObj) {
        bounds = new google.maps.LatLngBounds();
        viewsObj.geolocations.forEach(function (latLangStr) {
          var split = latLangStr.split(',');
          var marker = new google.maps.Marker({
            position: new google.maps.LatLng(split[0], split[1])
          });
          bounds.extend(marker.position);
          marker.setMap(GoogleMaps.maps.exampleMap.instance);
          markers.push(marker);
        });
        GoogleMaps.maps.exampleMap.instance.fitBounds(bounds);
      }
    }
  });

  Template.analytics.helpers({
    getVideos: function () {
      return VideoSearch.getData({
        transform: function(matchText, regExp) {
          return matchText.replace(regExp, "<b>$&</b>")
        },
        sort: { title: 1 }
      });
    },
    isLoading: function () {
      return VideoSearch.getStatus().loading;
    },
    videoDetails: function () {
      return Videos.findOne(Session.get('videoId'));
    },
    exampleMapOptions: function() {
      // Make sure the maps API has loaded
      if (GoogleMaps.loaded()) {
        return {
          center: new google.maps.LatLng(37.09024, -95.712891),
          zoom: 4
        };
      }
    }
  });

}
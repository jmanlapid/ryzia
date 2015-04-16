if (Meteor.isServer) {

  Meteor.startup(function () {

  });

  Meteor.methods({
    getYouTubeDetails: function (id) {
      Future = Npm.require('fibers/future');
      var fut = new Future();
      var params = {
        key: 'AIzaSyAaq6keItnvEGtKcV5mvGH1D9QhT2Rw38U',
        part: 'contentDetails, statistics',
        id: id
      }
      HTTP.call('GET', 'https://www.googleapis.com/youtube/v3/videos', {params: params}, Meteor.bindEnvironment(function (err, res) {
        if (err) {
          console.error('Error http get in getYouTubeDetails: ' + err);
          return fut.error(err);
        }
        fut.return(res.data);
      }));
      return fut.wait();
    },
    getYouTubeDetails_sync: function (id) {
      var params = {
        key: 'AIzaSyAaq6keItnvEGtKcV5mvGH1D9QhT2Rw38U',
        part: 'contentDetails, statistics',
        id: id
      }
      try {
        var result = HTTP.call('GET', 'https://www.googleapis.com/youtube/v3/videos', {params: params});
        return result.data;
      } catch (e) {
          console.error('Error http get in getYouTubeDetails: ' + e);
      }
    }
  });
}

/*
example json return
{
 "kind": "youtube#videoListResponse",
 "etag": "\"kYnGHzMaBhcGeLrcKRx6PAIUosY/upiWdjvjYxdSxo3zaZjzHE2oMic\"",
 "pageInfo": {
  "totalResults": 1,
  "resultsPerPage": 1
 },
 "items": [
  {
   "kind": "youtube#video",
   "etag": "\"kYnGHzMaBhcGeLrcKRx6PAIUosY/ql-3nYOLqqnCSjA2vM7gInJSLHk\"",
   "id": "cb8qk0cVTos",
   "contentDetails": {
    "duration": "PT1H33M48S",
    "dimension": "2d",
    "definition": "sd",
    "caption": "false",
    "licensedContent": true
   },
   "statistics": {
    "viewCount": "1873230",
    "likeCount": "6292",
    "dislikeCount": "474",
    "favoriteCount": "0",
    "commentCount": "620"
   }
  }
 ]
}
*/

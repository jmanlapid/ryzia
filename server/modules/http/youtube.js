if (Meteor.isServer) {

  Meteor.methods({
    //if more than one id, separate by comma (,) and no spaces
    getYouTubeDetails: function (ids) {
      var params = {
        key: Meteor.settings.GOOGLE_API_KEY,
        part: 'contentDetails, statistics',
        id: ids
      }
      return HTTP.call('GET', 'https://www.googleapis.com/youtube/v3/videos', {params: params});
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

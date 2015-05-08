if (Meteor.isServer) {
  Meteor.publish('analytics', function (genres) {
    //return Videos.find({}, { sort: {approved_date: -1 }, limit: 3 });
    return [
      Videos.find({status: 'APPROVED'}),
      Views.find({})
    ]
  });

  SearchSource.defineSource('videos', function (searchText, options) {
    var options = { sort: { title: 1 }, limit: 20 };
    
    if(searchText) {
      var regExp = buildRegExp(searchText);
      var selector = {$or: [
        {title: regExp},
        {artist: regExp}
      ]};
      
      return Videos.find(selector, options).fetch();
    } else {
      return Videos.find({}, options).fetch();
    }
  });

  function buildRegExp(searchText) {
    // this is a dumb implementation
    var parts = searchText.trim().split(/[ \-\:]+/);
    return new RegExp("(" + parts.join('|') + ")", "ig");
  }
}
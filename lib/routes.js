Router.route('/', function () {
	this.render('index');
});

Router.map( function () {
  this.route('unapproved', {
  	path: '/unapproved',
    waitOn: function() {
      return [
        Meteor.subscribe('unapproved'),
      	IRLibLoader.load('http://vjs.zencdn.net/4.12/video.js')
      ]
    }
  });
});

Router.map( function () {
  this.route('approved', {
    path: '/approved',
    waitOn: function() {
      return [
        Meteor.subscribe('landing'),
        IRLibLoader.load('http://vjs.zencdn.net/4.12/video.js')
      ]
    }
  });
});

Router.route('/upload', function () {
	this.render('upload');
}); 

Router.route('/about', function () {
  this.render('about');
});

Router.map(function () {
  this.route('serverFile', {
    path: '/aws/sns/elastic-transcoder',
    where: 'server',
    action: function () {
      //the request body comes in as contentt-ype text/plain
      //its needs massaging before being parsed to a JSON
      var jsonStr = this.request.body
        .replace('"{', '{')
        .replace('}"', '}')
        .replace(/(?:\\[rn])+/g, '')
        .replace(/(?:\\[r"])+/g, '"');
      var body = JSON.parse(jsonStr);
      var resp = Meteor.call('process_sns', body);
      this.response.writeHead(200,
        {'Content-Type' : 'application/json; charset=utf-8'});
      this.response.end();
    }
  });
});





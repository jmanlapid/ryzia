Router.route('/', function () {
	this.render('index');
});

Router.map( function () {
  this.route('unapproved', {
  	path: '/unapproved',
    waitOn: function() {
      return [
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
        IRLibLoader.load('http://vjs.zencdn.net/4.12/video.js')
      ]
    }
  });
});

Router.route('/upload', function() {
	this.render('upload');
}); 



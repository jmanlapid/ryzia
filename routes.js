Router.route('/', function () {
	this.render('home');
});

Router.map( function () {
  this.route('unapproved',{
  	path: '/unapproved',
    waitOn: function() {
        return [
        	IRLibLoader.load('http://vjs.zencdn.net/4.12/video.js'),
        	IRLibLoader.load('http://vjs.zencdn.net/4.12/video-js.css')
        ]
    }
  });
});

Router.route('/approved', function () {
  this.render('/approved')
});

Router.route('/upload', function() {
	this.render('upload');
}); 



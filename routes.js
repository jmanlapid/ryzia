Router.route('/', function () {
	this.render('home');
});

Router.route('/unapproved', function () {
	this.render('unapproved');
});

Router.route('/upload', function() {
	this.render('upload');
}); 
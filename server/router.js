if (Meteor.isServer) {
  Router.onBeforeAction(Iron.Router.bodyParser.text());
}

if (Meteor.isClient) {

  Meteor.subscribe('unapprovedCount');

  Template.navbar.events({
    'submit form#login': function (e, t) {
      var email = t.find('#login-email').value
        , password = t.find('#login-password').value; 
      Meteor.loginWithPassword(email, password, function (err) {
        if (err) {
          alert(err);
          return false;
        } else {
          return Meteor.user();
        }
      });
      return false;
    },
    
    'click button#logout': function (e, t) {
      e.preventDefault();
      Meteor.logout(function (err) {
        if (err) {
          alert(err);
        }
      });
    }
  });

}
if (Meteor.isServer) {
  Meteor.startup(function () {
    if ( Meteor.users.find().count() === 0 ) {
      var users = [
        { email: 'james@ryzia.com', username: 'james', name: 'James', roles: ['admin'] },
        { email: 'john@ryzia.com', username: 'john', name: 'John', roles: ['admin'] },
        { email: 'kyle@ryzia.com', username: 'kyle', name: 'Kyle', roles: ['admin'] },
      ];

      _.each(users, function (user) {
        var id;

        id = Accounts.createUser({
            email: user.email,
            password: Meteor.settings.ADMIN.PASSWORD,
            profile: { username: user.username },
            profile: { name: user.name },
            roles: user.roles
        });

        if (user.roles.length > 0) {
          Roles.addUsersToRoles(id, user.roles);
        }

      });
    }
  });
}
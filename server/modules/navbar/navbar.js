if (Meteor.isServer) {
    Meteor.publish('unapprovedCount', function () {
      Counts.publish(this, 'count', Videos.find({ status: 'SUBMITTED' }));
    });
}
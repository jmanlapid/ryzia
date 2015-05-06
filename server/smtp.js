Meteor.startup(function () {
  smtp = {
    username: Meteor.settings.SMTP.USERNAME,   // eg: server@gentlenode.com
    password: Meteor.settings.SMTP.PASSWORD,   // eg: 3eeP1gtizk5eziohfervU
    server:   Meteor.settings.SMTP.SERVER,  // eg: mail.gandi.net
    port: Meteor.settings.SMTP.PORT
  }

  process.env.MAIL_URL = 'smtp://' + 
  	encodeURIComponent(smtp.username) + ':' + 
  	encodeURIComponent(smtp.password) + '@' + 
  	encodeURIComponent(smtp.server) + ':' + 
  	smtp.port;
});
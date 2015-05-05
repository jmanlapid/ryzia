Meteor.startup(function () {
  smtp = {
    username: Meteor.settings.SMTP.USERNAME,   // eg: server@gentlenode.com
    password: Meteor.settings.SMTP.PASSWORD,   // eg: 3eeP1gtizk5eziohfervU
    server:   'email-smtp.us-east-1.amazonaws.com',  // eg: mail.gandi.net
    port: 465
  }

  process.env.MAIL_URL = 'smtp://' + 
  	encodeURIComponent(smtp.username) + ':' + 
  	encodeURIComponent(smtp.password) + '@' + 
  	encodeURIComponent(smtp.server) + ':' + 
  	smtp.port;
});
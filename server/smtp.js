Meteor.startup(function () {
  smtp = {
    username: Meteor.settings.AWS.SMTP_USERNAME,   // eg: server@gentlenode.com
    password: Meteor.settings.AWS.SMTP_PASSWORD,   // eg: 3eeP1gtizk5eziohfervU
    server:   'email-smtp.us-east-1.amazonaws.com',  // eg: mail.gandi.net
    port: 465
  }

  process.env.MAIL_URL = 'smtp://' + 
  	encodeURIComponent(smtp.username) + ':' + 
  	encodeURIComponent(smtp.password) + '@' + 
  	encodeURIComponent(smtp.server) + ':' + 
  	smtp.port;
});
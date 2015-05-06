#### Meteor Up Guidelines for EC2
Install Meteor
````
curl https://install.meteor.com/ | sh
````
Install Git
````
sudo apt-get install git
````
Follow the MUP tutorial (be careful with sudo, you may need to install NPM and NodeJS without it)
````
https://github.com/arunoda/meteor-up
````

#### Configuring approve video workflow

1. Configure SNS
    1. Create Topic (http)
    2. Subscribe and specify server's endpoint http://{SERVER}//aws/sns/elastic-transcoder
    3. Log into server, check MUP logs, confirm subscription link
    
2. Elastic Transcoder Pipeline
    1. Notifications -->
    2. On Completion Event -->
    3. Use an existing SNS topic (choose the appropriate one).
    
3. In MUP settings.json file, make sure the AWS.PIPELINE_ID is set correctly.
    
You may want to send an email directly to admin for 'On Error Event'.

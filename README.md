"# MySQL-Node-Angular" 

The app allows you to send automated emails with MySQL and Node, and includes an Angular front-end with EJS and UI-Router for a single-page-application experience.

The app also uses <a href="https://www.npmjs.com/package/node-schedule">'node-schedule'</a> to automatically send the results from a MySQL database to any user.

Step 1: Create a database - any name.

Step 2: Import the 'database-edited.sql' file into your database - or just copy-paste that text into your SQL Command Query Runner. That will create the neccessary tables for the app to work.

Step 3: Add a .env file to your root directory that includes MySQL and Email Creds - should look like this:

```bash
HOST=integer
DATABASE=text
USER=text	
PASSWORD=text

EMAIL_ADDRESS=text
EMAIL_PASSWORD=text
```


Currently the app will send an email every 42 seconds - you're gonna want to change that. Go to routes.js, and search for:

 var j = schedule.scheduleJob('42 * * * * *', function(){

Here's the syntax to control when emails get sent.


```bash
*    *    *    *    *    *
┬    ┬    ┬    ┬    ┬    ┬
│    │    │    │    │    |
│    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
│    │    │    │    └───── month (1 - 12)
│    │    │    └────────── day of month (1 - 31)
│    │    └─────────────── hour (0 - 23)
│    └──────────────────── minute (0 - 59)
└───────────────────────── second (0 - 59, OPTIONAL)

```

You can upload the app to Heroku, and the automated emails will probably work - but you may have to pay to keep the app running full-time (i.e. pay for a 'dyno') so that your Heroku app is turned on when the scheduler reaches the Send-Time.
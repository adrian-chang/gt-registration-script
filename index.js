/**
 * index.js
 *
 * Main script to access the registration website
 */
'use strict';

var webdriverio = require('webdriverio'),
    yargs = require('yargs');

var options = { 
      desiredCapabilities: { 
        browserName: 'chrome' 
      } 
    },
    client = webdriverio.remote(options);

// setup the credentials command line
var argv = yargs.demand('u')
  .alias('u', 'username')
  .demand('u')
  .nargs('u', 1)
  .describe('u', 'GT Username')
  .alias('p', 'password')
  .demand('p')
  .nargs('p', 1)
  .describe('p', 'GT Password')
  .example('node $0 -u username -p password')
  .argv;

// actual driver 
client
    .init()
    .url('https://buzzport.gatech.edu/cp/home/displaylogin')
    .click('#login_btn')
    .addValue('#username', argv.u)
    .addValue('#password', argv.p)
    .click('#login .btn-submit')
    .waitForExist("#logout", 10000)
    .execute(function() {
      var tags = document.querySelectorAll('#tab'),
          tag;

      for (var j = 0; j < tags.length; j++) {
        tag = tags[j];
        if (tag.text.match('Student')) {
          tag.click();
          return tag;
        }
      }
     })
    .click('img[alt=Registration]')
    .getTitle().then(function(title) {
        console.log('Title is: ' + title);
        // outputs: "Title is: WebdriverIO (Software) at DuckDuckGo"
    })
    .end();

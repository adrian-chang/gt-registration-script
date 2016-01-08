/**
 * index.js
 *
 * Main script to access the registration website
 */
'use strict';

const webdriverio = require('webdriverio'),
      yargs = require('yargs');

const options = { 
  desiredCapabilities: { 
    browserName: 'chrome' 
  } 
};

let client = webdriverio.remote(options);

// setup the credentials command line
let argv = yargs.demand('u')
  .alias('u', 'username')
  .demand('u')
  .nargs('u', 1)
  .describe('u', 'GT Username')
  .alias('p', 'password')
  .demand('p')
  .nargs('p', 1)
  .describe('p', 'GT Password')
  .example('node $0 -u username -p password')
  .command('register', 'register for classes')
  .command('lookup', 'lookup classes')
  .help('help')
  .argv;

// get the command
const command = argv._[0];

// no command == help
if (!command) {
  return yargs.showHelp();
}

// deal with login
client = client.init()
  .url('https://oscar.gatech.edu/')
  .click('#securelogin')
  .addValue('#UserId', argv.u)
  .addValue('input[type="password"]', argv.p)
  .click('input[type="submit"][value="Login"]');

if (command === 'register') {
  argv = yargs
    .reset()
    .array('c')
    .alias('c', 'classes')
    .demand('c')
    .nargs('c', 1)
    .usage('register')
    .example('$0 register -c 1234 4567')
    .help('h')
    .alias('h', 'help')
    .argv;
} else if (command === 'lookup') {
    yargs
    .reset()
    .usage('$0 lookup');
}

// go through the shared menus
client = client
  .click('a[href="/pls/bprod/twbkwbis.P_GenMenu?name=bmenu.P_StuMainMnu"]')
  .click('a[href="/pls/bprod/twbkwbis.P_GenMenu?name=bmenu.P_RegMnu"]');

  /pls/bprod/bwskfcls.p_sel_crse_search

client
  .click('a[href="/pls/bprod/bwskfreg.P_AltPin"]');
    /*.frame(client.element('frame[name="content"]'))
    .setValue('#crn_id1', argv.c[0])
    .setValue('#crn_id2', argv.c[1])
    .click('input[type="submit"][value="Submit Changes"])')*/
    .getTitle().then(function(title) {
        console.log('Title is: ' + title);
        // outputs: "Title is: WebdriverIO (Software) at DuckDuckGo"
    });

/**
 * index.js
 *
 * Main script to access the registration website
 */
'use strict';

// cli and the actual web driver
const webdriverio = require('webdriverio'),
      yargs = require('yargs');

// setup the actual driver options here
const options = {
  desiredCapabilities: {
    browserName: 'chrome'
  }
};

// start the session
let client = webdriverio.remote(options);

// setup the credentials command line
let argv = yargs.demand('u')
  .alias('u', 'username')
  .demand('u')
  .nargs('u', 1)
  // password and username
  .describe('u', 'GT Student ID')
  .alias('p', 'password')
  .demand('p')
  .nargs('p', 1)
  .describe('p', 'GT OSCAR Pin')
  .describe('s', 'Seconds to close browser after reaching the end of a command, 0 = do not close automatically')
  .default('s', 60)
  .alias('s', 'seconds')
  .example('node $0 -u username -p password')
  .command('register', 'register for classes')
  .command('lookup', 'lookup classes')
  .command('schedule', 'look at your schedule')
  .argv;

// get the command
const command = argv._[0],
      timeout = argv.s * 1000;

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
  .click('input[type="submit"][value="Login"]')
  // inside now
  .click('a[href="/pls/bprod/twbkwbis.P_GenMenu?name=bmenu.P_StuMainMnu"]')
  .click('a[href="/pls/bprod/twbkwbis.P_GenMenu?name=bmenu.P_RegMnu"]');

// let's figure out what else is needed for the command
switch (command) {
  // let's register for a class
  case 'register':
    // what do we need for register
    argv = yargs
      .reset()
      // at least a class
      .array('c')
      .alias('c', 'classes')
      .describe('c', 'Space delimited list of CRNs to use')
      .demand('c')
      .nargs('c', 1)
      .usage('$0 register')
      .example('$0 register -c 1234 4567')
      .alias('s', 'submit')
      .describe('s', 'Do we want to submit adding classes?')
      .default('s', false)
      .help('h')
      .alias('h', 'help')
      .argv;

    // go through adding
    client = client
      .click('a[href="/pls/bprod/bwskfreg.P_AltPin"]')
      .submitForm('form[action="/pls/bprod/bwskfreg.P_AltPin"]');

    // add each class here
    const classes = argv.c,
          max = Math.min(10, classes.length);
    let c = 0;

    for (c; c < max; c++) {
      client = client.setValue('#crn_id' + (c + 1), classes[c]);
    }

    // submission
    if (argv.s) {
      console.dir('Submitting class changes');
      client =
        client.submitForm('form[action="/pls/bprod/bwckcoms.P_Regs"]');
    } else {
      console.dir('Submitting class changes');
    }
    break;
  // I generally want to lookup all classes for this semester
  case 'lookup':
    // what do we need for lookup
    argv = yargs
    .reset()
    .usage('$0 lookup')
    .help('h')
    .alias('h', 'help')
    .argv;

    // go to specific page then click the most recent semester
    client = client
      .click('a[href="/pls/bprod/bwskfcls.p_sel_crse_search"]')
      // seems to be an empty option
      .selectByIndex('#term_input_id', 1)
      .submitForm('form[action="/pls/bprod/bwckgens.p_proc_term_date"]')
      // do advanced search
      .click('input[value="Advanced Search"]')
      // subjects and campus
      .selectByValue('#subj_id', 'CS')
      .selectByValue('#subj_id', 'CSE')
      // unselect all
      .selectByValue('#camp_id', '%')
      .selectByValue('#camp_id', 'O')
      .click('#advCourseBtnDiv input[type="Submit"]');

    console.log('Showing current OMSCS Semester classes');
    break;
  // view my schedule
  case 'schedule':
    argv = yargs
    .reset()
    .usage('$0 lookup')
    .help('h')
    .alias('h', 'help')
    .argv;

    // simple
    client = client
      .click('a[href="/pls/bprod/bwskfshd.P_CrseSchdDetl"]');

    client = client
      .element('form[action="/pls/bprod/bwskfshd.P_CrseSchdDetl"] input[type="submit"]');

    // ugly, but we need the last promise
    client
      .then((elem) => {
        if (elem) {
          return client.elementIdClick(elem.value.ELEMENT);
        }
      });

    console.log('Showing my schedule');
    break;
  // unknown, show help
  default:
    yargs.showHelp();
    break;
}

// if the timeout is 0, don't do anything
if (timeout > 0) {
  client.then(() => {
    // close the app
    setTimeout(() => {
      console.log('Closing the application')
       client.end();
    }, timeout);
  });
}

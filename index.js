var webdriverio = require('webdriverio');
var options = { desiredCapabilities: { browserName: 'chrome' } };
var client = webdriverio.remote(options);
 
client
    .init()
    .url('https://buzzport.gatech.edu/cp/home/displaylogin')
    .click('#login_btn')
    .addValue('#username', '')
    .addValue('#password', '')
    .click('#login .btn-submit')
    .getTitle().then(function(title) {
        console.log('Title is: ' + title);
        // outputs: "Title is: WebdriverIO (Software) at DuckDuckGo"
    });

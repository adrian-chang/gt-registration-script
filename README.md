#gt-registration-script

This is a simple script which can be run to register for classes, view your schedule, or to view **CS / CSE** classes for the current semester, in an automated fashion at **Georgia Tech**.

For registration, it will not resolve waitlist issues or handle errors with classes being full.

When viewing your schedule, it will only display your schedule for the current semester.

** Use this script at your own risk. If Georgia Tech bans you for abusing their computing resources while using this script, it is your own responsibility to resolve your own ban. **

** It is not guaranteed to work if Georgia Tech changes [Oscar](http://oscar.gatech.edu). (Working as of 1/10/16) **

## Requirements
1. `node 4.x` or higher
2. `npm 3.x`
3. Chrome Web Browser
4. `java 1.6`
5. `*Nix` System, sorry I'm not sure if this will work on Windows at all.

## Install
1. Checkout the repository
2. `npm install`
3. `npm run install` (will install selenium with chrome driver)

## Examples
```
npm run start --
```

## Help
```
node ./index.js "-h"

Commands:
  register  register for classes
  lookup    lookup classes

Options:
  -u, --username  GT Username                                         [required]
  -p, --password  GT Password                                         [required]
  -h, --help      Show help                                            [boolean]

Examples:
  node index.js -u username -p password

```
Run each command with `-h/--help` to see each command's arguments.

## License

```
MIT License
```

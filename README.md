#gt-registration-script

This is a simple script which can be run to register for classes in an automated fashion at **Georgia Tech**. It is not guaranteed to work if Georgia Tech changes Oscar.

** Use this script at your own risk. If Georgia Tech bans you for abusing their computing resources while using this script, it is your own responsibility to remove your own ban. **

## Requirements
1. `node 4.x` or higher
2. `npm 3.x`
3. Chrome Web Browser
4. `java 1.8`

## Install
1. Checkout the repository
2. `npm install`
3. `npm run install` (will install selenium with chrome driver)

## Example
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

---

node ./index.js "-u=user" "-p=password" "register" "-h"

register

Options:
  -h, --help     Show help                                             [boolean]
  -c, --classes                                               [array] [required]

Examples:
  index.js register -c 1234 4567

```

## License

```
MIT License
```

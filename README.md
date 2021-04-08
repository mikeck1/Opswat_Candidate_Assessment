[![Build Status](https://www.travis-ci.com/mikeck1/Opswat_Candidate_Assessment.svg?branch=main)](https://www.travis-ci.com/mikeck1/Opswat_Candidate_Assessment)


# `Opswat_Candidate_Assessment`

## Add an environment Variable for API Key
```bash
.env
> API_KEY=12345678910
```

## Installation for Ubuntu VM
```bash
# Tested on:

# Distributor ID: Ubuntu
# Description:    Ubuntu 20.04.2 LTS
# Release:        20.04
# Codename:       focal

chmod 777 installNode.sh
./installNode.sh
```

## Testing
```bash

# npm install ## (if you did not use installNode script)
npm test
```

## Run
```bash
# node index.js fileToScan
node upload_file.js tests/data/hi2.txt 
# OR
npm start tests/data/hi2.txt 
```

## Dependencies 

| dependency | README |
| ------ | ------ |
| axios | https://www.npmjs.com/package/axios |
| chai | https://www.chaijs.com/api/bdd/ |
| dotenv | https://www.npmjs.com/package/dotenv |
| mocha | https://mochajs.org/ |
| mocha-sinon | https://sinonjs.org/ |
| sinon | https://sinonjs.org/ |

## Author
Mike Kaufman

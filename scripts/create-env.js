const fs = require('fs')// file sistem

fs.writeFileSync('./.env', `API=${process.env.API}\n`)
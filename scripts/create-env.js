const fs = require('fs')// filesistem

fs.writeFileSync('./.env', `API=${process.env.API}\n`)
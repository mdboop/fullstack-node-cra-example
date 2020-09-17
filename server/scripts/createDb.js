const pgtools = require("pgtools")
require("dotenv").config()

const config = {
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
}

pgtools.createdb(config, process.env.PGDATABASE, function (err, res) {
  if (err) {
    console.error(err)
    process.exit(-1)
  }

  console.log("\x1b[32m", `Successfully created DB ${process.env.PGDATABASE}.`)
})

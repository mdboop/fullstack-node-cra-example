const pgtools = require("pgtools")
require("dotenv").config()

const config = {
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
}

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
})

readline.question(
  "This operation will drop your database, and you will lose all data.\n" +
    "If you would like to continue, please enter the name of the database\n" +
    "(hint: it should be in your .env file)\n>",
  (db) => {
    console.log("\x1b[33m", `Dropping DB ${db}.`)
    readline.close()
    pgtools.dropdb(config, process.env.PGDATABASE, function (err, res) {
      if (err) {
        console.error(err)
        process.exit(1)
      }
      console.log("\x1b[32m", `Successfully dropped DB ${db}.`)
    })
  }
)

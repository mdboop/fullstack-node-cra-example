const pgtools = require("pgtools")
require("dotenv").config()

const config = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
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
    pgtools.dropdb(config, process.env.DB_NAME, function (err, res) {
      if (err) {
        console.error(err)
        process.exit(1)
      }
      console.log("\x1b[32m", `Successfully dropped DB ${db}.`)
    })
  }
)

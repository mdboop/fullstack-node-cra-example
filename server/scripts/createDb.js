const pgtools = require("pgtools")
require("dotenv").config()

const config = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
}

pgtools.createdb(config, process.env.DB_NAME, function (err, res) {
  if (err) {
    console.error(err)
    process.exit(-1)
  }

  console.log("\x1b[32m", `Successfully created DB ${process.env.DB_NAME}.`)
})

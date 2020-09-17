const PGConnectionStringParser = require("pg-connection-string")

const baseConnection = {
  type: "postgres",
  synchronize: true,
  entities: ["src/entity/**/*.ts"],
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber",
  },
}

let connection

if (process.env.NODE_ENV === "production") {
  const databaseUrl = process.env.DATABASE_URL
  const pgConnectionOptions = PGConnectionStringParser.parse(databaseUrl)
  const productionConnection = {
    ...baseConnection,
    name: pgConnectionOptions.name,
    host: pgConnectionOptions.host,
    port: pgConnectionOptions.port,
    username: pgConnectionOptions.username,
    password: pgConnectionOptions.password,
    database: pgConnectionOptions.database,
    extra: {
      ssl: true,
    },
  }
  connection = productionConnection
} else {
  const devConnection = {
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    logging: false,
  }

  connection = devConnection
}

module.exports = connection

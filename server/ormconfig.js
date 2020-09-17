const PostgressConnectionStringParser = require("pg-connection-string")
const typeorm = require("typeorm")
const databaseUrl = process.env.DATABASE_URL

const connectionOptions = PostgressConnectionStringParser.parse(databaseUrl)

let connection

if (process.env.APP_ENV === "production") {
  const typeOrmOptions = {
    type: "postgres",
    name: connectionOptions.name,
    host: connectionOptions.host,
    port: connectionOptions.port,
    username: connectionOptions.username,
    password: connectionOptions.password,
    database: connectionOptions.database,
    synchronize: true,
    logging: false,
    entities: ["src/entity/**/*.ts"],
    migrations: ["src/migration/**/*.ts"],
    subscribers: ["src/subscriber/**/*.ts"],
    extra: {
      ssl: true,
    },
  }

  connection = typeorm.createConnection(typeOrmOptions)
} else {
  connection = {
    type: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: true,
    entities: ["src/entity/**/*.ts"],
    migrations: ["src/migration/**/*.ts"],
    subscribers: ["src/subscriber/**/*.ts"],
    cli: {
      entitiesDir: "src/entity",
      migrationsDir: "src/migration",
      subscribersDir: "src/subscriber",
    },
  }
}

module.exports = connection

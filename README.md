# Fullstack TypeORM, Express, React (CRA) Monorepo

This project is an example of how you can use the initialization scripts to create a server and client for the same project and keep them all in one monorepo.

## Why?

In speaking with some folks who are new to coding, I noticed some gaps in understanding and I thought this project could serve to answer some possible questions and show one potential solution for a common problem/question we all face: "how am I going to organize my code??"

## Organization/Design

This project has a long, self-descriptive name. If you want to try this, just replace `fullstack-node-cra-example` with your project's name as you look through the repo and docs.

### Structure

One thing new programmers may not be aware of is that you can have multiple `package.json` files in the same repo. They don't have to be at the root of the project, even though that is the most common structure you'll see and is often the most desirable.

However, when using a zero-config tool like Create React App, or another project initializer, you may run into problems where each script overwrites values from the other. For example, both TypeORM and CRA want to have an `npm start` command, but that won't work. So, what should you do? Well, one thing is you can just wrap each project up in a directory and make that the root of your git repository. It will look like this:

```
fullstack-node-cra-example
├── README.md
├── client
│   ├── README.md
│   ├── node_modules
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   └── src
└── server
    ├── README.md
    ├── ormconfig.json
    ├── package.json
    ├── src
    └── tsconfig.json
```

### Creating the repo

1. Created empty git repository
2. `git clone https://github.com/mdboop/fullstack-node-cra-example.git`
3. `cd fullstack-node-cra-example`
4. `npx create-react-app client` (note: our app name is now just client because it's just a folder in our project!)
5. `npx typeorm init --name server --database postgres` (note: same here, it's just `server` now!)

## Development

### Pre-requisites

1. Node (>=12.x.x)
2. PostgreSQL

### Install dependencies

1. `cd client && npm install`
2. `cd server && npm install`

### Add environment variables

1. At the root of the project, `touch .env`
2. Add the following values:

```
PGDATABASE=<NAME>
PGUSER=<USER>
PGHOST=localhost
PGPASSWORD=<SOME PASSWORD>
PGPORT=5432
```

### Run migrations

1. Make sure your postgres server is up and running (e.g. `brew services start postgresql`)
2. `npm run migration:run`

**note:** I'd like to improve this, but for now, you need to enter a postgres role that exists already. If you

### Run client and server in development mode

1. in one terminal: `cd client && npm start`
2. in another: `cd server && npm dev`

### Migrations

#### Generate migrations

`npm run migrations:gen -- -n <MIGRATION NAME>`

#### Run migrations

`npm run migrations:run`

## Deployment

This example is also meant to guide you through a deployment to Heroku.

### Prerequisites

1. Heroku account
2. Heroku CLI installed

### Heroku app setup

1. Create a new app and name it
2. `heroku buildpacks:set https://github.com/timanovsky/subdir-heroku-buildpack`
3. `heroku buildpacks:add heroku/nodejs`
4. `heroku config:set PROJECT_PATH=server`
5. `heroku config:set APP_ENV=production`
6. Go to `Resources > Add-ons` and type in "postgres", select, and choose the free plan

### Deploy the app!

1. `npm run build`
2.

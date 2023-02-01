- Starts a project
  npm init -y

- Installing dependencies
  npm i
  => express
  => typescript -D
  => @types/express -D
  => ts-node-dev -D

- Creates a typescript's config document
  npx tsc --init

- In package.json
  => "type": "module"

- In tsconfig.json
  => "module": "ES2020"
  => "rootDir": "./src"
  => "outDir": "./build"

- Using ts-node-dev
  -- In tsconfig.json
  => "module": "CommonJS"
  -- In package.json
  => delete "type": "module"
  => script dev: "tsnd src/server.ts"
  or "tsnd --exit-child src/server.ts" -> --exit-child: is a flag to use to force database to reload

- HTTP Methods
  => Get: List/Get some information
  => Post: Create
  => Put: Update more than one info from an entity
  => Patch: Specific update from an entity
  => Delete: Deletes an information

- Parameters Types
  => Query: Params in url, used to persist state. Need to be named. (ex: url?=something)
  => Route: Params in url, not named and used to identify/access some data. (ex: url/post/how-to-create-a-spa-project)
  => Body: Send information in one request, normally used for forms. Hidden.

- Objectives
  => List games with numbered ads
  => Create new ad
  => List ads by game
  => Get discord tag by Ad ID

- ORM (Object Relational Mapper) -> PRISMA: easier way to model a database using js
  => npm i prisma -D
  => npx prisma init -h
  => npx prisma init --datasource-provider <database>
  => npm i @prisma/client

- MIGRATION: similar as Git for database
  => npx prisma migrate dev --name name

- Graphic Interface for database using Prisma
  => npx prisma studio

- CORS: allow front to connect with back end
  => npm i cors
  => npm i @types/cors
  => app.use(cors())

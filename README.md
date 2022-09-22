<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

<p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

## Description

No. 2. Calculation of the cost of car rental. [details here](https://docs.google.com/document/d/1FU7RZNQdHMjzVcEDm94gEjjlkDfQT9LcxpT8ht4Fo2Q/edit#)

## Setup service dependencies

```bash
# make env file
$ cp .env.example .env

# up postgres and pgadmin4
$ docker-compose up -d
```

## Installation

```bash
# install node modules
$ npm install

# migrate database tables
$ npx knex migrate:latest

# seed database inital values
$ npx knex seed:run
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Swagger

Learn more about api in swagger documentation [here](http://localhost:3000/api)


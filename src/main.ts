import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import "reflect-metadata";

import * as session from 'express-session';
import * as passport from 'passport';

const redis = require('redis');
require('dotenv').config()

const { REDIS_HOST, REDIS_PORT } = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  let RedisStore = require('connect-redis')(session)
  let redisClient = redis.createClient(REDIS_PORT, REDIS_HOST)
  app.use(
    session({
      secret: 'strictly confidential secret',
      store: new RedisStore({ host: REDIS_HOST, port: REDIS_PORT, client: redisClient}),
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 300 * 1000
      }
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(3000);
}
bootstrap();

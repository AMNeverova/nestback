import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsController } from './posts/posts.controller';
import { PostsService } from './posts/posts.service';
import { TagsController } from './tags/tags.controller';
import { TagsService } from './tags/tags.service';
import { AuthModule } from './auth/auth.module';
import "reflect-metadata";
require('dotenv').config()

let port = parseInt(process.env.MYSQL_PORT)
const {
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE
} = process.env;


@Module({
  imports: [
    TypeOrmModule.forRoot(
      {
        "type": "mysql",
        "port": port,
        "host": MYSQL_HOST,
        "username": MYSQL_USER,
        "password": MYSQL_PASSWORD,
        "database": MYSQL_DATABASE,
        "entities": ["dist/**/*.entity{.ts,.js}"],
        "synchronize": true
      }
    ),
    AuthModule
  ],
  controllers: [AppController, UsersController, PostsController, TagsController],
  providers: [AppService, UsersService, PostsService, TagsService],
})
export class AppModule {}

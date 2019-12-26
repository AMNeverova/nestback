import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Service } from '../models'
import { Users } from 'src/entities/users.entity';
import { EntityManager } from 'typeorm';

@Injectable()
export class UsersService extends Service {

    constructor(entities: EntityManager) {
        super(Users, entities)
    }

    async getPosts(id) {
        let userRep = await this.entities.getRepository(Users);
        let user = await userRep.findOne(id, { relations: ["posts"]});
        return user.posts;
    }

    async addRow(user) {
        let newUser = await this.entities.findOne(Users, { name: user.name} );
        if (newUser) {
            throw new HttpException('User already exists', 400);
        }
        newUser = await this.entities.create(Users, user);
        await this.entities.save(newUser)
        let {password, ...result} = user;
        return result;
    }
    
}

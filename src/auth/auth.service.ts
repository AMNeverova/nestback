import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor( @InjectRepository(Users) private UsersRep: Repository<Users> ) {

    }

    async validateUser(username, password) {
        const user = await this.UsersRep.findOne({ name: username });
        console.log(user);
        if (user && user.password === password) {
            const { password, ...result } = user;
            return result;
        }
        return false;
    }

}

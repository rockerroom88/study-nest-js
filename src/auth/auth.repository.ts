import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from '../user/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthRepository extends Repository<User>{
    constructor(private dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }

    async signIn(username: string, password: string): Promise<string> {
        const user = await this.findOneBy({ username });
        if (user && (await bcrypt.compare(password, user.password))) {
            return user.username;
        } else {
            throw new UnauthorizedException('Login Failed');
        }
    }
}

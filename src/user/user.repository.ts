import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './etc/user.entity';
import { CreateUserDto, PatchUserDto } from './etc/user.dtos';

@Injectable()
export class UserRepository extends Repository<User> {
    constructor(private dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }

    async getAllUser(): Promise<User[]> {
        return await this.find();
    }

    async getUserById(id: number): Promise<User> {
        return await this.findOneBy({ id });
    }

    async postUser(createUserDto: CreateUserDto): Promise<User> {
        const { username, password } = createUserDto;
        const user = await this.create({
            username,
            password
        }).save();
        return user;
    }

    async patchUserById(id: number, patchUserDto: PatchUserDto): Promise<User> {
        const { username, password } = patchUserDto;
        const user = await this.getUserById(id);
        if (user) {
            user.username = username;
            user.password = password;
            await this.save(user);
        }
        return user;
    }

    async deleteUserById(id: number): Promise<void> {
        const r = await this.delete({id});
        if (!r.affected) {
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }
    }
}

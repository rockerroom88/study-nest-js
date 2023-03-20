import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDto, PatchUserDto } from './user.dtos';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

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

    async postUser(createUserDto: CreateUserDto): Promise<void> {
        const { username, password } = createUserDto;

        const salt = await bcrypt.genSalt();
        const hashedPwd = await bcrypt.hash(password, salt);

        const user = this.create({
            username,
            password: hashedPwd
        });

        try {
            await user.save();
        } catch (e) {
            if (e.code === '23505') {
                throw new ConflictException('Existing username');
            } else {
                throw new InternalServerErrorException();
            }
        }

        /**
        const user = await this.create({
            username,
            password
        }).save();
        */
    }

    async patchUserById(id: number, patchUserDto: PatchUserDto): Promise<User> {
        const { username, password } = patchUserDto;
        const user = await this.getUserById(id);
        if (user) {
            user.username = username;
            user.password = password;
            return await this.save(user);
        }
    }

    async deleteUserById(id: number): Promise<number> {
        const r = await this.delete(id);
        if (!r.affected) {
            throw new NotFoundException(`Can't find User with id ${id}`);
        }
        return r.affected;
    }

}

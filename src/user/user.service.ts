import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { CreateUserDto, PatchUserDto } from './user.dtos';

@Injectable()
export class UserService {

    constructor(
        private userRepository: UserRepository
    ) {}

    async getAllUser(): Promise<User[]> {
        return await this.userRepository.getAllUser();
    }

    async getUserById(id: number): Promise<User> {
        return await this.userRepository.getUserById(id);
    }

    async postUser(createUserDto: CreateUserDto): Promise<void> {
        await this.userRepository.postUser(createUserDto);
    }

    async patchUserById(id: number, patchUserDto: PatchUserDto): Promise<User> {
        return await this.userRepository.patchUserById(id, patchUserDto);
    }

    async deleteUserById(id: number): Promise<number> {
        return await this.userRepository.deleteUserById(id);
    }

}

import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './etc/user.entity';
import { CreateUserDto, PatchUserDto } from './etc/user.dtos';

@Injectable()
export class UserService {
    // 데코레이터를 이용하여 이 서비스에서 Repository를 이용한다고 선언
    constructor(private userRepository: UserRepository) {}

    async getAllUser(): Promise<User[]> {
        return await this.userRepository.getAllUser();
    }

    async getUserById(id: number): Promise<User> {
        return await this.userRepository.getUserById(id);
    }

    async postUser(createUserDto: CreateUserDto): Promise<User> {
        return await this.userRepository.postUser(createUserDto);
    }

    async patchUserById(id: number, patchUserDto: PatchUserDto): Promise<User> {
        return await this.userRepository.patchUserById(id, patchUserDto);
    }

    async deleteUserById(id: number): Promise<void> {
        return await this.userRepository.deleteUserById(id);
    }
}

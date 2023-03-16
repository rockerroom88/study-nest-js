import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthRepository } from './auth.repository';
import { AuthCredentialDto } from './etc/auth.dto';
import { Auth } from './etc/auth.entity';

@Injectable()
export class AuthService {

    constructor(@InjectRepository(Auth) private authRepository: AuthRepository) {}

    async signUp(authCredentialDto: AuthCredentialDto): Promise<Auth> {
        const {username, password} = authCredentialDto;
        const auth = await this.authRepository.create({
            username,
            password
        });
        await this.authRepository.save(auth);
        return auth;
    }

    async getAllAuth(): Promise<Auth[]> {
        return await this.authRepository.find();
    }

    async getAuthById(id: number): Promise<Auth> {
        return await this.authRepository.findOneBy({id});
    }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { JwtService } from '@nestjs/jwt';
import { UserJwtPayload } from '../_config/jwt/jwt.payload';

@Injectable()
export class AuthService {
    constructor(private authRepository: AuthRepository, private jwtService: JwtService) {}

    async signIn(username: string, password: string): Promise<{ accessToken: string }> {
        const username$ = await this.authRepository.signIn(username, password);
        if (!username$) {
            throw new UnauthorizedException('Invalid user info');
        }
        const payload: UserJwtPayload = { username: username$ };
        const accessToken = await this.jwtService.signAsync(payload);
        return { accessToken };
    }
}

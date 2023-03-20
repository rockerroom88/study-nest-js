import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';
import { JwtStrategy } from '../_config/jwt/jwt.strategy';
import { User } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';
import * as config from 'config';

const jwtConfig = config.get('jwt');

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: jwtConfig.secret,
            signOptions: {
                expiresIn: process.env.JWR_SECRET || jwtConfig.expiresIn
            }
        }),
        TypeOrmModule.forFeature([User])
    ],
    controllers: [AuthController],
    providers: [AuthService, AuthRepository, UserRepository, JwtStrategy],
    exports: [JwtStrategy, PassportModule]
})
export class AuthModule {}

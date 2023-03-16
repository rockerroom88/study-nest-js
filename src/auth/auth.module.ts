import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Auth } from './etc/auth.entity';
import { AuthRepository } from './auth.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([Auth])
    ],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule {}

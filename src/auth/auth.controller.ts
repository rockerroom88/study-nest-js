import { Body, Controller, Get, Param, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './etc/auth.dto';
import { Auth } from './etc/auth.entity';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Get()
    getAllAuth(): Promise<Auth[]> {
        return this.authService.getAllAuth();
    }

    @Get(':id')
    getAuthById(@Param('id') id: number): Promise<Auth> {
        return this.authService.getAuthById(id);
    }

    @Post('/signup')
    postSignUp(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto): Promise<Auth> {
        return this.authService.signUp(authCredentialDto);
    }
}

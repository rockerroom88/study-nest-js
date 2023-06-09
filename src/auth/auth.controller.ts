import { Body, Controller, Post, Req, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiOperation({ summary: '로그인' })
    @Post('/signin')
    async signIn(@Req() req, @Body('username', ValidationPipe) username: string, @Body('password', ValidationPipe) password: string): Promise<{ accessToken: string }> {
        return await this.authService.signIn(username, password);
    }

}

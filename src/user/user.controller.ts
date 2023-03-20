import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserDto, PatchUserDto } from './user.dtos';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation } from '@nestjs/swagger';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @ApiOperation({ summary: '모든 사용자 조회' })
    @Get()
    @UseGuards(AuthGuard())
    async getAllUser(): Promise<User[]> {
        return await this.userService.getAllUser();
    }

    @ApiOperation({ summary: '사용자 조회 with id' })
    @Get('/:id')
    @UseGuards(AuthGuard())
    async getUserById(@Param('id') id: number): Promise<User> {
        return await this.userService.getUserById(id);
    }

    @ApiOperation({ summary: '사용자 등록' })
    @Post()
    async postUser(@Body() createUserDto: CreateUserDto): Promise<void> {
        await this.userService.postUser(createUserDto);
    }

    @ApiOperation({ summary: '사용자 수정' })
    @Patch('/:id')
    @UseGuards(AuthGuard())
    async patchUserById(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) patchUserDto: PatchUserDto): Promise<User> {
        return await this.userService.patchUserById(id, patchUserDto);
    }

    @ApiOperation({ summary: '사용자 삭제' })
    @Delete('/:id')
    @UseGuards(AuthGuard())
    async deleteUserById(@Param('id', ParseIntPipe) id: number): Promise<number> {
        return await this.userService.deleteUserById(id);
    }

}

import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './etc/user.entity';
import { CreateUserDto, PatchUserDto } from './etc/user.dtos';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
    async getAllUser(): Promise<User[]> {
        return await this.userService.getAllUser();
    }

    @Get('/:id')
    async getUserById(@Param('id') id: number): Promise<User> {
        return await this.userService.getUserById(id);
    }

    @Post()
    async postUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        return await this.userService.postUser(createUserDto);
    }

    @Patch('/:id')
    async patchUserById(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) patchUserDto: PatchUserDto): Promise<User> {
        return await this.userService.patchUserById(id, patchUserDto);
    }

    @Delete('/:id')
    async deleteUserById(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return await this.userService.deleteUserById(id);
    }

}

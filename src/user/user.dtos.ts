import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({
        example: 'rockerroom',
        description: '사용자 계정',
        required: true
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @ApiProperty({
        example: 'qwer1234',
        description: '사용자 비밀번호',
        required: true
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/^[a-zA-Z0-9]*$/)
    password: string;
}

export class PatchUserDto {
    @ApiProperty({
        example: 'rockerroom',
        description: '사용자 계정',
        required: true
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @ApiProperty({
        example: 'qwer1234',
        description: '사용자 비밀번호',
        required: true
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/^[a-zA-Z0-9]*$/)
    password: string;
}

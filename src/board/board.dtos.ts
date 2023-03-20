import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBoardDto {
    @ApiProperty({
        example: '점점 봄이오는 날씨입니다',
        description: '게시글 제목',
        required: true
    })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({
        example: '안녕하세요. 게시글 내용입니다',
        description: '게시글 내용',
        required: true
    })
    @IsNotEmpty()
    @IsString()
    description: string;
}

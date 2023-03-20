import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardService } from './board.service';
import { Board } from './board.entity';
import { CreateBoardDto } from './board.dtos';
import { BoardStatus } from './board.enum';
import { BoardValidation } from './board.validation';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../user/user.entity';
import { GetUser } from '../_dec/decorators';
import { ApiBody, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';

@Controller('board')
@UseGuards(AuthGuard())
export class BoardController {
    private logger = new Logger('Board Controller');

    constructor(private boardService: BoardService) {}

    @ApiOperation({ summary: '모든 게시글 조회' })
    @Get()
    async getAllBoard(): Promise<Board[]> {
        return await this.boardService.getAllBoard();
    }

    @ApiOperation({ summary: '게시글 조회 (로그인 사용자)' })
    @ApiParam({
        name: 'User',
        required: true,
        description: '로그인한 사용자 객체'
    })
    @ApiQuery({
        name: 'User2',
        required: false,
        description: '로그인한 사용자 객체2'
    })
    @Get('/self')
    async getSelfBoards(@GetUser() user: User): Promise<Board[]> {
        this.logger.verbose(`User "${user.username} trying to get all boards`);
        return this.boardService.getSelfBoards(user);
    }

    @ApiOperation({ summary: '게시글 조회 (게시글 id)' })
    @Get('/:id')
    async getBoardById(@Param('id') id: number): Promise<Board> {
        return await this.boardService.getBoardById(id);
    }

    @ApiOperation({ summary: '게시글 조회 (게시글 id 및 로그인 사용자)' })
    @Get('/self/:id')
    async getSelfBoardById(@Param('id', ParseIntPipe) id: number, @GetUser() user: User): Promise<Board> {
        return await this.boardService.getSelfBoardById(id, user);
    }

    @ApiOperation({ summary: '게시글 등록' })
    @Post()
    @UsePipes(ValidationPipe)
    async postBoardByDto(@Body() createBoardDto: CreateBoardDto, @GetUser() user: User): Promise<Board> {
        this.logger.verbose(`User "${user.username}" creating a new board. Payload: ${JSON.stringify(createBoardDto)}`);
        return await this.boardService.postBoardByDto(createBoardDto, user);
    }

    @ApiOperation({ summary: '게시글 수정 (게시글 id)' })
    @Patch('/status/:id')
    async patchBoardStatusById(@Param('id', ParseIntPipe) id: number, @Body('status', BoardValidation) status: BoardStatus): Promise<Board> {
        return await this.boardService.updateBoardStatusById(id, status);
    }

    @ApiOperation({ summary: '게시글 수정 (게시글 id 및 로그인 사용자)' })
    @Patch('/status/self/:id')
    async patchSelfBoardStatusById(@Param('id', ParseIntPipe) id: number, @Body('status', BoardValidation) status: BoardStatus, @GetUser() user: User): Promise<Board> {
        return await this.boardService.updateSelfBoardStatusById(id, status, user);
    }

    @ApiOperation({ summary: '게시글 삭제' })
    @Delete('/:id')
    async deleteBoardById(@Param('id', ParseIntPipe) id: number): Promise<number> {
        return await this.boardService.deleteBoardById(id);
    }

    @ApiOperation({ summary: '게시글 삭제 (로그인 사용자)' })
    @Delete('/self/:id')
    async deleteSelfBoardById(@Param('id', ParseIntPipe) id: number, @GetUser() user: User): Promise<number> {
        return await this.boardService.deleteSelfBoardById(id, user);
    }

}

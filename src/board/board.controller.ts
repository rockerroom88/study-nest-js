import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardService } from './board.service';
import { Board } from './board.entity';
import { CreateBoardDto } from './board.dtos';
import { BoardStatus } from './board.enum';
import { BoardValidation } from './board.validation';
import { AuthGuard } from '@nestjs/passport';

@Controller('board')
@UseGuards(AuthGuard())
export class BoardController {
    constructor(private boardService: BoardService) {}

    @Get()
    async getAllBoard(): Promise<Board[]> {
        return await this.boardService.getAllBoard();
    }

    @Get('/:id')
    async getBoardById(@Param('id') id: number): Promise<Board> {
        return await this.boardService.getBoardById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    async postBoardByDto(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
        return await this.boardService.postBoardByDto(createBoardDto);
    }

    @Patch('/:id/status')
    async patchBoardStatus(@Param('id', ParseIntPipe) id: number, @Body('status', BoardValidation) status: BoardStatus): Promise<Board> {
        return await this.boardService.updateBoardStatus(id, status);
    }

    @Delete('/:id')
    async deleteBoard(@Param('id', ParseIntPipe) id: number): Promise<number> {
        return await this.boardService.deleteBoard(id);
    }

}

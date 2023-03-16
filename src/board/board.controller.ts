import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { BoardService } from './board.service';
import { Board } from './etc/board.entity';
import { CreateBoardDto } from './etc/board.dto';
import { BoardStatus } from './etc/board-status.enum';
import { BoardStatusValidationPipe } from './etc/board-status.validation-pipe';

@Controller('board')
export class BoardController {
    constructor(private boardService: BoardService) {}

    @Get()
    getAllBoard(): Promise<Board[]> {
        return this.boardService.getAllBoard();
    }

    @Get('/:id')
    getBoardById(@Param('id') id: number): Promise<Board> {
        return this.boardService.getBoardById(id);
    }

    @Post()
    postBoardByDto(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
        return this.boardService.postBoardByDto(createBoardDto);
    }

    @Patch('/:id/status')
    patchBoardStatus(@Param('id', ParseIntPipe) id: number, @Body('status', BoardStatusValidationPipe) status: BoardStatus): Promise<Board> {
        return this.boardService.updateBoardStatus(id, status);
    }

    @Delete('/:id')
    deleteBoard(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.boardService.deleteBoard(id);
    }

}

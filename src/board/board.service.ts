import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
import { CreateBoardDto } from './board.dtos';
import { BoardStatus } from './board.enum';

@Injectable()
export class BoardService {

    constructor(private boardRepository: BoardRepository) {}

    async getAllBoard(): Promise<Board[]> {
        return await this.boardRepository.getAllBoard();
    }

    async getBoardById(id: number): Promise<Board> {
        return await this.boardRepository.getBoardById(id);
    }

    async postBoardByDto(createBoardDto: CreateBoardDto): Promise<Board> {
        return await this.boardRepository.postBoard(createBoardDto);
    }

    async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
        return await this.boardRepository.updateBoardStatus(id, status);
    }

    async deleteBoard(id: number): Promise<number> {
        return await this.boardRepository.deleteBoard(id);
    }
}

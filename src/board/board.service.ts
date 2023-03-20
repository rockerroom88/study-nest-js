import { Injectable } from '@nestjs/common';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
import { CreateBoardDto } from './board.dtos';
import { BoardStatus } from './board.enum';
import { User } from '../user/user.entity';

@Injectable()
export class BoardService {

    constructor(private boardRepository: BoardRepository) {}

    async getAllBoard(): Promise<Board[]> {
        return await this.boardRepository.getAllBoard();
    }

    async getSelfBoards(user: User): Promise<Board[]> {
        return await this.boardRepository.getSelfBoards(user);
    }

    async getBoardById(id: number): Promise<Board> {
        return await this.boardRepository.getBoardById(id);
    }

    async getSelfBoardById(id: number, user: User): Promise<Board> {
        return await this.boardRepository.getSelfBoardById(id, user);
    }

    async postBoardByDto(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
        return await this.boardRepository.postBoardByDto(createBoardDto, user);
    }

    async updateBoardStatusById(id: number, status: BoardStatus): Promise<Board> {
        return await this.boardRepository.updateBoardStatusById(id, status);
    }

    async updateSelfBoardStatusById(id: number, status: BoardStatus, user: User): Promise<Board> {
        return await this.boardRepository.updateSelfBoardStatusById(id, status, user);
    }

    async deleteBoardById(id: number): Promise<number> {
        return await this.boardRepository.deleteBoardById(id);
    }

    async deleteSelfBoardById(id: number, user: User): Promise<number> {
        return await this.boardRepository.deleteSelfBoardById(id, user);
    }

}

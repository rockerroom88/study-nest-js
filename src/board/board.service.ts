import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { Board } from './etc/board.entity';
import { CreateBoardDto } from './etc/board.dto';
import { BoardStatus } from './etc/board-status.enum';

@Injectable()
export class BoardService {

    // 데코레이터를 이용하여 이 서비스에서 BoardRepository를 이용한다고 선언
    constructor(@InjectRepository(Board) private boardRepository: BoardRepository) {}

    async getAllBoard(): Promise<Board[]> {
        return await this.boardRepository.find();
    }

    async getBoardById(id: number): Promise<Board> {
        const board$ = await this.boardRepository.findOneBy({ id });
        if (!board$) {
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }
        return board$;
    }

    async postBoardByDto(createBoardDto: CreateBoardDto): Promise<Board> {
        const { title, description } = createBoardDto;
        const board = await this.boardRepository.create({
            title,
            description,
            status: BoardStatus.PUBLIC
        });
        await this.boardRepository.save(board);
        return board;
    }

    async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
        const board = await this.getBoardById(id);
        board.status = status;
        await this.boardRepository.save(board);
        return board;
    }

    async deleteBoard(id: number): Promise<void> {
        const result = await this.boardRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }
    }
}

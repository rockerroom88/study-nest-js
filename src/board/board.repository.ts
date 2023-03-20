import { DataSource, Repository } from 'typeorm';
import { Board } from './board.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBoardDto } from './board.dtos';
import { BoardStatus } from './board.enum';

@Injectable()
export class BoardRepository extends Repository<Board> {
    constructor(private dataSource: DataSource) {
        super(Board, dataSource.createEntityManager());
    }

    async getAllBoard(): Promise<Board[]> {
        return await this.find();
    }

    async getBoardById(id: number): Promise<Board> {
        const board = await this.findOneBy({ id });
        if (!board) {
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }
        return board;
    }

    async postBoard(createBoardDto: CreateBoardDto): Promise<Board> {
        const { title, description } = createBoardDto;
        const board = await this.create({
            title,
            description,
            status: BoardStatus.PUBLIC
        }).save();
        return board;
    }

    async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
        const board = await this.getBoardById(id);
        if (board) {
            board.status = status;
            return await this.save(board);
        }
    }

    async deleteBoard(id: number): Promise<number> {
        const r = await this.delete(id);
        if (!r.affected) {
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }
        return r.affected;
    }
}

import { DataSource, Repository } from 'typeorm';
import { Board } from './board.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBoardDto } from './board.dtos';
import { BoardStatus } from './board.enum';
import { User } from '../user/user.entity';

@Injectable()
export class BoardRepository extends Repository<Board> {
    constructor(private dataSource: DataSource) {
        super(Board, dataSource.createEntityManager());
    }

    async getAllBoard(): Promise<Board[]> {
        return await this.find();
    }

    async getSelfBoards(user: User): Promise<Board[]> {
        const boards = await this.findBy({ userId: user.id });
        if (!boards) {
            throw new NotFoundException(`Can't find boards with login user ${user.id}`);
        }
        return boards;
    }

    async getBoardById(id: number): Promise<Board> {
        const board = await this.findOneBy({ id });
        if (!board) {
            throw new NotFoundException(`Can't find board with id ${id}`);
        }
        return board;
    }

    async getSelfBoardById(id: number, user: User): Promise<Board> {
        const board = await this.findOneBy({ id, userId: user.id });
        if (!board) {
            throw new NotFoundException(`Can't find self board with id ${id}`);
        }
        return board;
    }

    async postBoardByDto(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
        const { title, description } = createBoardDto;
        const board = await this.create({
            title,
            description,
            status: BoardStatus.PUBLIC,
            user
        }).save();
        delete board.user;
        return board;
    }

    async updateBoardStatusById(id: number, status: BoardStatus): Promise<Board> {
        const board = await this.getBoardById(id);
        if (board) {
            board.status = status;
            return await this.save(board);
        }
    }

    async updateSelfBoardStatusById(id: number, status: BoardStatus, user: User): Promise<Board> {
        const board = await this.getSelfBoardById(id, user);
        board.status = status;
        return await this.save(board);
    }

    async deleteBoardById(id: number): Promise<number> {
        const r = await this.delete(id);
        if (!r.affected) {
            throw new NotFoundException(`Can't find board with id ${id}`);
        }
        return r.affected;
    }

    async deleteSelfBoardById(id: number, user: User): Promise<number> {
        const r = await this.delete({id, userId: user.id});
        if (!r.affected) {
            throw new NotFoundException(`Can't find self board with id ${id}`);
        }
        return r.affected;
    }
}

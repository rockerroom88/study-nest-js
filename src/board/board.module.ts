import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { Board } from './etc/board.entity';
import { BoardRepository } from './board.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([Board])
    ],
    controllers: [BoardController],
    providers: [BoardService]
})
export class BoardModule {}

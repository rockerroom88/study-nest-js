import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Board]),
        AuthModule
    ],
    controllers: [BoardController],
    providers: [BoardService, BoardRepository]
})
export class BoardModule {}

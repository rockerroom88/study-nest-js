import { Repository } from 'typeorm';
import { Board } from './etc/board.entity';

export class BoardRepository extends Repository<Board> {}

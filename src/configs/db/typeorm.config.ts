import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Board } from '../../board/etc/board.entity';
import { User } from '../../user/etc/user.entity';

export const typeORMConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '0000',
    database: 'nest-js-board-test',
    entities: [Board, User],
    autoLoadEntities: true,
    synchronize: true,
    logging: true
}

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Board } from '../../board/board.entity';
import { User } from '../../user/user.entity';
import * as config from 'config';

const dbConfig = config.get('db');

export const typeORMConfig: TypeOrmModuleOptions = {
    type: dbConfig.type,
    host: process.env.RDS_HOSTNAME || dbConfig.host,
    port: process.env.RDS_PORT || dbConfig.port,
    username: process.env.RDS_USERNAME || dbConfig.username,
    password: process.env.RDS_PASSWORD || dbConfig.password,
    database: process.env.RDS_DB_NAME || dbConfig.database,
    entities: [Board, User],
    synchronize: dbConfig.synchronize
}

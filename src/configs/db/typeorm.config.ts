import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '0000',
    database: 'nest-js-board-test',
    //entities: ['${rootDir}/models/*.entity.{js.ts}'],
    autoLoadEntities: true,
    synchronize: true,
    logging: true
}

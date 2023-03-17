import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/db/typeorm.config';
import { BoardModule } from './board/board.module';
import { UserModule } from './user/user.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(typeORMConfig),
        UserModule,
        BoardModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}

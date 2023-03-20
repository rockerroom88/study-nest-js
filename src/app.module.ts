import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './_config/db/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BoardModule } from './board/board.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(typeORMConfig),
        AuthModule,
        UserModule,
        BoardModule,
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}

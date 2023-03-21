import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { typeORMConfig } from './_config/db/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BoardModule } from './board/board.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';


@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot(typeORMConfig),
        AuthModule,
        UserModule,
        BoardModule,
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}

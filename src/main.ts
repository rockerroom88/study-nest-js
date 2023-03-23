import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import helmet from 'helmet';

async function bootstrap() {
    const logger = new Logger();
    const app = await NestFactory.create(AppModule);
    app.use(helmet());
    app.enableCors();
    await app.listen(3000);
    logger.log(`Application running on port ${3000}`);
}

(async () => {
    await bootstrap();
})();

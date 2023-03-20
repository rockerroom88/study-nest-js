import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as config from 'config';

declare const module: any;

async function bootstrap() {
    const logger = new Logger();
    const app = await NestFactory.create(AppModule);

    const config$ = new DocumentBuilder()
        .setTitle('Sleact API')
        .setDescription('Dev Sleact Docs')
        .setVersion('1.0')
        .addCookieAuth('connect.sid')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    const serverConfig = config.get('server');
    const port = serverConfig.port;

    await app.listen(port);
    logger.log(`Application running on port ${port}`);

    if (module.hot) {
        module.hot.accept();
        module.host.dispose(() => app.close());
    }
}

(async () => {
    await bootstrap();
})();

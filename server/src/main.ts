import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import SWAGGER_TAGS from './constant/swagger/tags';
import { ConfigService } from '@nestjs/config';
import { AppHttpException } from './filter/httpException.filter';

async function initSwagger(app: NestExpressApplication, appConfig: ConfigService) {
    const documentBuilder = new DocumentBuilder()
        .setTitle(appConfig.get<string>('swagger.title'))
        .setVersion(appConfig.get<string>('swagger.version'));

    const tagValues = Object.values(SWAGGER_TAGS);
    tagValues.forEach((tag) => documentBuilder.addTag(tag));

    const config = documentBuilder.build();
    const document = SwaggerModule.createDocument(app, config);
    const path = appConfig.get<string>('swagger.path');

    SwaggerModule.setup(path, app, document, {
        explorer: true,
        jsonDocumentUrl: `${path}/json`,
    });
}


async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    const appConfig = app.get(ConfigService);

    const port = appConfig.get<number>('port');
    const globalApiPrefix = appConfig.get<string>('globalApiPrefix');

    app.setGlobalPrefix(globalApiPrefix);

    app.useGlobalFilters(new AppHttpException());
    
    initSwagger(app, appConfig);
    await app.listen(port, '0.0.0.0', async () => {
        const url = await app.getUrl();
        console.log(`app running in ${url}${globalApiPrefix}`);
        const swaggerPath = appConfig.get<string>('swagger.path');
        console.log(`swagger address is ${url}${swaggerPath}`);
    });
  

}
bootstrap();

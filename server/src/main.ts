import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import swaggerTags from './constant/swagger/tags';

function initSwagger(app: NestExpressApplication) {
    const documentBuilder = new DocumentBuilder()
        .setTitle('小说网')
        .setVersion('0.1')

    const tagValues = Object.values(swaggerTags);
    tagValues.forEach((tag) => documentBuilder.addTag(tag));

    const config = documentBuilder.build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-doc', app, document);
}


async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    initSwagger(app);
    await app.listen(3000);

}
bootstrap();

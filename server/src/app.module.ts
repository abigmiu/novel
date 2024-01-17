import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app';
import typeOrmConfig from './config/typeorm';
import { ClsModule, ClsService } from 'nestjs-cls';
import { WinstonModule } from 'nest-winston';
import { v4 as uuidV4 } from 'uuid';
import { AppLoggerService } from './logger/appLogger.service';
import * as winston from 'winston';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseLogger } from './logger/database.logger';
import { UserEntity } from './entities/user.entity';
import { ResponseTransformInterceptor } from './interceptor/responseTransform.interceptor';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import modules from './modules';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [appConfig],
        }),
        ClsModule.forRoot({
            global: true,
            middleware: {
                mount: true,
                generateId: true,
                idGenerator() {
                    return uuidV4();
                },
            },
        }),
        WinstonModule.forRoot({
            level: 'debug',
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({
                    dirname: 'log', filename: 'test.log',
                }),
            ],
        }),
        TypeOrmModule.forRootAsync({
            imports: [ClsModule],
            inject: [ClsService],
            useFactory(clsService: ClsService) {
                return {
                    ...typeOrmConfig,
                    logger: new DatabaseLogger(clsService),
                }
            }
        }),
        TypeOrmModule.forFeature([UserEntity]),
        ...modules
    ],
    controllers: [AppController],
    providers: [
        AppService,
        AppLoggerService,
        {
            provide: APP_INTERCEPTOR,
            useClass: ResponseTransformInterceptor,
        },
    ],
})
export class AppModule { }

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app';
import typeOrmConfig from './config/typeorm';
import { ClsModule } from 'nestjs-cls';
import { WinstonModule } from 'nest-winston';
import { v4 as uuidV4 } from 'uuid';
import { AppLoggerService } from './logger/appLogger.service';
import * as winston from 'winston';
import { TypeOrmModule } from '@nestjs/typeorm';

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
        TypeOrmModule.forRoot(typeOrmConfig),
    ],
    controllers: [AppController],
    providers: [AppService, AppLoggerService],
})
export class AppModule { }

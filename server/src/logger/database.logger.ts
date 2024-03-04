import { ClsService } from 'nestjs-cls';
import { Logger, QueryRunner } from 'typeorm';
import { Logger as WinstonLogger } from 'winston';
import * as winston from 'winston';

export class DatabaseLogger implements Logger {
    private readonly logger: WinstonLogger;

    private readonly cls: ClsService;

    constructor(cls: ClsService) {
        this.logger = winston.createLogger({
            level: 'debug',
            transports: [
                new winston.transports.DailyRotateFile({
                    dirname: 'logs/dataBase',
                    filename: '%DATE%.log',
                    datePattern: 'YYYY-MM-DD',
                    maxSize: '20m',
                    format: winston.format.combine(
                        winston.format.timestamp({
                            format: 'YYYY-MM-DD hh:mm:ss:sssZ',
                        }),
                        winston.format.json(),
                    )
                })
            ],
        });
        this.cls = cls;
    }

    log() {
        console.log('typeorm log');
    }
    logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
        this.logger.debug({
            level: 'debug',
            message: {
                requestId: this.cls.getId(),
                content: {
                    query,
                    parameters,
                },
            },
        });
    }
    logMigration(message: string, queryRunner?: QueryRunner) {
        console.log('logMigration');
    }
    logQueryError(error: string | Error, query: string, parameters?: any[], queryRunner?: QueryRunner) {
        console.log('logQueryError');
    }
    logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner) {
        console.log('logQuerySlow');
    }
    logSchemaBuild(message: string, queryRunner?: QueryRunner) {
        console.log('logSchemaBuild');
    }
}
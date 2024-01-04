import { ClsService } from "nestjs-cls";
import { Logger, QueryRunner } from "typeorm";
import { Logger as WinstonLogger } from 'winston';
import * as winston from 'winston';

export class DatabaseLogger implements Logger {
    private readonly logger: WinstonLogger;

    private readonly cls: ClsService;

    constructor(cls: ClsService) {
        this.logger = winston.createLogger({
            level: 'debug',
            transports: [
                new winston.transports.File({
                    dirname: 'log', filename: 'database.log',
                }),
            ]
        })
        this.cls = cls;
    }

    log() {
        console.log('typeorm log')
    }
    logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
        console.log('logQuery')
        this.logger.debug({
            level: 'debug',
            message: {
                requestId: this.cls.getId(),
                content: {
                    query,
                    parameters,
                }
            }
        })
    }
    logMigration(message: string, queryRunner?: QueryRunner) {
        console.log('logMigration')
    }
    logQueryError(error: string | Error, query: string, parameters?: any[], queryRunner?: QueryRunner) {
        console.log('logQueryError')
    }
    logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner) {
        console.log('logQuerySlow')
    }
    logSchemaBuild(message: string, queryRunner?: QueryRunner) {
        console.log('logSchemaBuild')
    }
}
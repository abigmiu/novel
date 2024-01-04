import { Inject, Injectable } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { ClsService } from "nestjs-cls";
import { Logger, QueryRunner } from "typeorm";
import { Logger as WinstonLogger } from 'winston';
import { AppLoggerService } from "./appLogger.service";

export class DatabaseLogger implements Logger {
    private readonly logger: WinstonLogger;

    private readonly cls: ClsService;

    constructor(logger: WinstonLogger, cls: ClsService) {
        this.logger = this.logger;
        this.cls = cls;
    }

    log() {
        console.log('typeorm log')
    }
    logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
        console.log(this.cls);
        console.log(this.logger);
        console.log('logQuery')
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
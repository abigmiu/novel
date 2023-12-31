import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { AppLoggerService } from './logger/appLogger.service';

@Controller()
export class AppController {
    @Inject()
    private readonly appLogger: AppLoggerService;

    constructor(private readonly appService: AppService) { }

    @Get('test')
    getHello(): string {
        this.appLogger.debug('getHello Controller');
        return this.appService.getHello();
    }
}

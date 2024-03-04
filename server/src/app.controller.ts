import { Controller, Get, Inject, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { AppLoggerService } from './logger/appLogger.service';
import { PublicApi } from './decorator/public.decorator';

@Controller()
export class AppController {
    @Inject()
    private readonly appLogger: AppLoggerService;

    constructor(private readonly appService: AppService) { }

    /**
     * 测试1
     * @summary 测试3
     * @description 测试2
     * @returns 
     */
    @PublicApi()
    @Get('test')
    getHello(): string {
        this.appLogger.debug('getHello Controller');
        return this.appService.getHello();
    }

    @Post('testPost')
    postTest(): string {
        return '13';
    }
}

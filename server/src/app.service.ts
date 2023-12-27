import { Inject, Injectable } from '@nestjs/common';
import { AppLoggerService } from './logger/appLogger.service';


@Injectable()
export class AppService {
    @Inject()
    private readonly appLogger: AppLoggerService;


    getHello(): string {
        this.appLogger.debug('getHello Service');
        return 'Hello World!';
    }
}

import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { ClsService } from 'nestjs-cls';
import { Logger } from 'winston';

@Injectable()
export class AppLoggerService {
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger;

    @Inject()
    private readonly cls: ClsService;

    debug(message: any) {
        this.logger.debug({
            requestId: this.cls.getId(),
            message,
        });
    }
}
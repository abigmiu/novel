import { Inject, Injectable } from '@nestjs/common';
import { AppLoggerService } from './logger/appLogger.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';


@Injectable()
export class AppService {
    @Inject()
    private readonly appLogger: AppLoggerService;

    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>;

    getHello(): string {
        this.appLogger.debug('getHello Service');
        this.userRepo.find();
        return 'Hello World!';
    }
}

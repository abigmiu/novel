import { CallHandler, ExecutionContext, HttpStatus, Inject, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, map } from "rxjs";
import { AppLoggerService } from "src/logger/appLogger.service";
import { IResponse } from "src/types/appBase";
import { Request, Response } from 'express';

@Injectable()
export class ResponseTransformInterceptor implements NestInterceptor {
    @Inject()
    private readonly appLogger: AppLoggerService;
    
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const httpCtx = context.switchToHttp();
        const request = httpCtx.getRequest<Request>();
        const response = httpCtx.getResponse<Response>();
        
        if (request.method.toUpperCase() === 'GET') {
            response.statusCode = HttpStatus.OK;
            response.setHeader('Cache-Control', 'no-cache');
        }

        if (request.method.toUpperCase() === 'POST') {
            response.statusCode = HttpStatus.OK;
        }

        return next
            .handle()
            .pipe(
                map(data => {
                    const response: IResponse = {
                        data,
                        code: 0,
                        message: 'success'
                    }
                    this.appLogger.debug(response)
                    return response;
                }
            ))
    }
}
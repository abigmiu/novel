import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Response } from "express";
import { IResponse } from "src/types/appBase";

@Catch(HttpException)
export class AppHttpException implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        const statusCode = exception.getStatus();
        const exceptionMessages = (exception.getResponse() as { message: string[] }).message;
        let message: string | string[] = exception.message || '接口错误';
        if (exceptionMessages?.length) {
            message = exceptionMessages;
        }

        
        const responseBody: IResponse = {
            code: statusCode || 400,
            message: message,
            data: null,
        }

        response
            .status(200)
            .json(responseBody);
    }
}
import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Response } from "express";
import { IResponse } from "src/types/appBase";

@Catch(HttpException)
export class AppHttpException implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        let message = exception.message;

        
        const responseBody: IResponse = {
            code: 400,
            message: message,
            data: null,
        }

        response
            .status(200)
            .json(responseBody);
    }
}
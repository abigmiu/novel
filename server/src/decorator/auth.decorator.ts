import { ExecutionContext, ForbiddenException, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';
import { EXCEPTION_USER_ID_NOT_PAYLOAD } from 'src/constant/exception/user';
import { IAccessTokenParams } from 'src/types/auth';
import { IUserIdDecorator } from 'src/types/decorator';

export const UserId = createParamDecorator(
    ({ throwError } : IUserIdDecorator = {throwError: true}, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest<Request>();
        console.log(request.user)
        const userId = (request.user as IAccessTokenParams)?.userId;
        if (!userId && throwError) {
            throw new ForbiddenException(EXCEPTION_USER_ID_NOT_PAYLOAD);
        }
        return userId;
    }
);
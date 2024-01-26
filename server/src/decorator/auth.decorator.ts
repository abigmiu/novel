import { ExecutionContext, ForbiddenException, createParamDecorator } from "@nestjs/common";
import { Request } from 'express';
import { EXCEPTION_USER_ID_NOT_PAYLOAD } from "src/constant/exception/user";
import { IUserIdDecorator } from "src/types/decorator";

export const UserId = createParamDecorator(
    ({ throwError = true }: IUserIdDecorator, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest<Request>();

        const userId = request.user?.id;
        if (!userId && throwError) {
            throw new ForbiddenException(EXCEPTION_USER_ID_NOT_PAYLOAD);
        }
        return userId;
    }
)
import type { ExecutionContext } from '@nestjs/common';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { PUBLIC_API_DECORATOR_KEY } from 'src/constant/decorator.ts/decorator';
import { AUTH_ERROR, AUTH_EXPIRED, AUTH_UN_LOGIN } from 'src/constant/exception/auth';

@Injectable()
export class AppAuthGuard extends AuthGuard('jwt') {
    constructor(
        private reflector: Reflector,
    ) {
        super();
    }
    canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride<boolean>(PUBLIC_API_DECORATOR_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) return true;
        
        return super.canActivate(context);
    }

    handleRequest(err: any, user: any, info: any) {
        if (err || !user) {
            throw new UnauthorizedException(AUTH_UN_LOGIN);
        }
        if (info?.name === 'JsonWebTokenError') {
            throw new UnauthorizedException(AUTH_ERROR);
        }
        if (info?.name === 'TokenExpiredError') {
            throw new UnauthorizedException(AUTH_EXPIRED);
        }

        return user;
    }
}

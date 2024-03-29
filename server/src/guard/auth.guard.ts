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
        
        if (isPublic) {
            // 让user挂在到request上
            super.canActivate(context);
            return true;
        }
        
        return super.canActivate(context);
    }


    handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride<boolean>(PUBLIC_API_DECORATOR_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        
        if (isPublic) {
            
            if (user) {
                return user;
            } else {
                // token 过期的时候会返回false
                return;
            }
        }
        if (info?.name === 'JsonWebTokenError') {
            throw new UnauthorizedException(AUTH_ERROR);
        }
        if (info?.name === 'TokenExpiredError') {
            throw new UnauthorizedException(AUTH_EXPIRED);
        }
        if (err || !user) {
            throw new UnauthorizedException(AUTH_UN_LOGIN);
        }
        
        return user;
    }
}

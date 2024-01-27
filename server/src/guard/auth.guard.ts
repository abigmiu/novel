import type { ExecutionContext } from '@nestjs/common';

import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { PUBLIC_API_DECORATOR_KEY } from 'src/constant/decorator.ts/decorator';

@Injectable()
export class AppAuthGuard extends AuthGuard('jwt') {
    constructor(
        private reflector: Reflector,
    ) {
        super();
        console.log('AppAuthGuard');
    }
    canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride<boolean>(PUBLIC_API_DECORATOR_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) return true;
        console.log('canActivate');
        return super.canActivate(context);
    }
}

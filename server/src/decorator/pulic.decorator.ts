import { SetMetadata } from '@nestjs/common';
import { PUBLIC_API_DECORATOR_KEY } from 'src/constant/decorator.ts/decorator';
export const PublicApi = () => SetMetadata(PUBLIC_API_DECORATOR_KEY, true);


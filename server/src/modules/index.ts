import { AuthModule } from './auth/auth.module';
import { NovelModule } from './novel/novel.module';
import { UserModule } from './user/user.module';

const modules = [
    AuthModule,
    UserModule,
    NovelModule,
];

export default modules;
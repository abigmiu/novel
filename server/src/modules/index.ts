import { AuthModule } from './auth/auth.module';
import { ChapterModule } from './chapter/chapter.module';
import { NovelModule } from './novel/novel.module';
import { UserModule } from './user/user.module';

const modules = [
    AuthModule,
    UserModule,
    NovelModule,
    ChapterModule,
];

export default modules;
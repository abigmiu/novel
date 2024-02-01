import { ChapterEntity } from 'src/entities/chapter.entity';
import { NovelEntity } from 'src/entities/novel.entity';
import { UserEntity } from 'src/entities/user.entity';
import { DataSourceOptions } from 'typeorm';

const config: DataSourceOptions = {
    type: 'mysql',
    port: 3306,
    host: '0.0.0.0',
    synchronize: true,
    username: 'root',
    password: '123456',
    database: 'novel',
    entities: [UserEntity, ChapterEntity, NovelEntity],
    logging: true,
    // logger: new DatabaseLogger(),
};

export default config;
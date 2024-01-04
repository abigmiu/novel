import { UserEntity } from "src/entities/user.entity";
import { DataSourceOptions } from "typeorm";

const config: DataSourceOptions = {
    type: 'mysql',
    port: 3306,
    host: '0.0.0.0',
    synchronize: true,
    username: 'root',
    password: '123456',
    database: 'novel',
    entities: [UserEntity],
    logging: true,
    // logger: new DatabaseLogger(),
};

export default config;
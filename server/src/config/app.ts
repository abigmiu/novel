import { IAppConfig } from 'src/types/appConfig';

const appConfig: IAppConfig = {
    port: 3000,
    globalApiPrefix: '/api',
    swagger: {
        path: '/api-doc',
        title: '小说网',
        version: '0.0.1',
    },
    jwt: {
        signOptions: {
            expiresIn: '30m',
        },
        accessTokenSecret: '123456',
        refreshTokenSecret: '123456789',
        accessTokenExpiresIn: '30m',
        refreshTokenExpiresIn: '7d',
    },
    passwordSlat: 10,
};

const beLoadConfig = () => appConfig;
export default beLoadConfig;
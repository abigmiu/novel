import { IAppConfig } from 'src/types/appConfig';

const appConfig: IAppConfig = {
    port: 3000,
    globalApiPrefix: '/api',
    swagger: {
        path: '/api-doc',
        title: '小说网',
        version: '0.0.1',
    },
};

const beLoadConfig = () => appConfig;
export default beLoadConfig;
export interface IAppConfig {
    /** 端口号 */
    port: number;
    /** 全局Api 路径前缀 */
    globalApiPrefix: string;

    
    swagger: {
        /** swagger 文档路径 */
        path: string;
        /** swagger 标题 */
        title: string;
        /** swagger 版本 */
        version: string;
    }
}
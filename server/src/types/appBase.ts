export interface IResponse<T = any> {
    data: T,
    code: number,
    message: string | string[];
}
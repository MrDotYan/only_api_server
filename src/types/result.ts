/**
 * 返回结果
 */
export interface ResultInterface {
    code?: string | number;
    message?: string | number | { [x: string]: any };
    success?:boolean,
    data?:any,
}
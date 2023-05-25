import { ResultInterface } from '../types/result';

/**
 *
 */
export class Result {
  /**
   * 404
   * @param arg
   * @returns
   */
  public static notFound(arg?: ResultInterface) {
    return {
      success: arg?.success ?? false,
      message: arg?.message ?? '找不到相关资源！请联系开发者或管理员！',
      code: arg?.code ?? 404,
      data: arg?.data ?? null,
    };
  }

  /**
   * 数据库错误
   * @param arg
   * @returns
   */
  public static dbError(arg?: ResultInterface) {
    return {
      success: arg?.success ?? false,
      message: arg?.message ?? '未知错误!请联系管理员!',
      code: arg?.code ?? 500,
      data: arg?.data ?? null,
    };
  }

  /**
   * 请求失败
   * @param arg
   * @returns
   */
  public static fail(arg?: ResultInterface) {
    return {
      success: arg?.success ?? false,
      message: arg?.message ?? '数据获取失败！',
      code: arg?.code ?? 400,
      data: arg?.data ?? null,
    };
  }

  public static success(arg?: ResultInterface) {
    return {
      success: arg?.success ?? true,
      message: arg?.message ?? '数据获取成功！',
      code: arg?.code ?? 200,
      data: arg?.data ?? null,
    };
  }

  public static unauthorized(arg?: ResultInterface) {
    return {
      success: arg?.success ?? false,
      message: arg?.message ?? '登录鉴权失败！请重新登录！',
      code: arg?.code ?? 401,
      data: arg?.data ?? null,
    };
  }
}

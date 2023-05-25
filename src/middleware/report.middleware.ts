import { Middleware, IMiddleware } from '@midwayjs/core';
import { NextFunction, Context } from '@midwayjs/koa';
import { getIP, getUA } from '../utils/reqUtils';

@Middleware()
export class ReportMiddleware implements IMiddleware<Context, NextFunction> {
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      const result = await next();
      const ua = getUA(ctx.header);
      const ip = getIP(ctx.request);
      ctx.logger.info('USER-AGENT:%s',ua);
      ctx.logger.info('IP:%s',ip);
      return result;
    };
  }

  static getName(): string {
    return 'report';
  }
}

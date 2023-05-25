import { Catch, httpError,MidwayHttpError } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { Result } from '../utils/resUtils';

@Catch(httpError.NotFoundError)
export class NotFoundFilter {
  async catch(_err: MidwayHttpError, _ctx: Context) {
    _ctx.logger.error('NotFoundError: %s',_err);
    return Result.notFound()
  }
}

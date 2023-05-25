import { Catch, httpError, MidwayHttpError } from '@midwayjs/core';
import { Context } from 'koa';
import { Result } from '../utils/resUtils';

// unauthorized
@Catch(httpError.UnauthorizedError)
export class UnauthorizedErrorFilter {
  async catch(_err: MidwayHttpError, _ctx: Context) {
    _ctx.logger.error('UnauthorizedError: %s', _err);
    return Result.unauthorized();
  }
}

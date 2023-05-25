import { Catch, Context } from '@midwayjs/core';
import { Result } from '../utils/resUtils';
import sqlError from '../utils/sqlErrorUtils';
import { isNotEmpty } from '../utils/toolUtils';

@Catch()
export class DefaultErrorFilter {
  async catch(err: any, _ctx:Context) {
    if (isNotEmpty(err?.errno)) {
      _ctx.logger.error('dbError: %s', err);
      return Result.dbError({ code: err?.errno ?? 500, message: sqlError[err?.errno] })
    } else {
      _ctx.logger.error('anthorError: %s', err);
      return Result.fail({
        code: err?.code,
        success: false,
        message: err.message,
      })

    }
  }
}

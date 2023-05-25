// src/middleware/jwt.middleware.ts

import { Config, Middleware } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { PassportMiddleware, AuthenticateOptions } from '@midwayjs/passport';
import { JwtStrategy } from '../strategy/jwt.strategy';

@Middleware()
export class JwtPassportMiddleware extends PassportMiddleware(JwtStrategy) {
  @Config('ignoreRouter')
  ignoreRouters:Array<string>;

  getAuthenticateOptions(): Promise<AuthenticateOptions> | AuthenticateOptions {
    return {};
  }
  ignore(ctx: Context): boolean {
    return this.ignoreRouters.includes(ctx.path);
  }
}
import { Configuration, App } from '@midwayjs/core';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import { join } from 'path';
import * as jwt from '@midwayjs/jwt';
import * as passport from '@midwayjs/passport';

import { DefaultErrorFilter } from './filter/default.filter';
import { NotFoundFilter } from './filter/notfound.filter';
import { ReportMiddleware } from './middleware/report.middleware';
import { checkExistsAndMkdir } from './utils/fileUtils';
import { JwtPassportMiddleware } from './middleware/jwt.middleware';
import { UnauthorizedErrorFilter } from './filter/unauthorized.filter';

@Configuration({
  imports: [
    koa,
    validate,
    jwt,
    passport,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
  ],
  importConfigs: [join(__dirname, './config')],
})
export class ContainerLifeCycle {
  /**
   * koa app实例
   */
  @App()
  app: koa.Application;

  /**
   * 创建项目运行所需文件夹
   */
  async createDir() {
    /**
     * 导出
     */
    const exportPath: string = await this.app.getConfig('dir.export');
    await checkExistsAndMkdir(exportPath);

    /**
     * 上传
     */
    const uploadPath: string = await this.app.getConfig('dir.upload');
    await checkExistsAndMkdir(uploadPath);

    /**
     * 静态资源
     */
    const staticPath: string = await this.app.getConfig('dir.static');
    await checkExistsAndMkdir(staticPath);
  }

  /**
   * 运用已经准备
   */
  async onReady() {
    // 添加中间件
    this.app.useMiddleware([ReportMiddleware, JwtPassportMiddleware]);
    // 添加Filter
    this.app.useFilter([
      NotFoundFilter,
      DefaultErrorFilter,
      UnauthorizedErrorFilter,
    ]);
  }

  /**
   * 服务已经启动
   */
  async onServerReady() {
    // 当前运行环境
    this.app.getLogger().warn('当期服务环境运行配置 => %s', this.app.getEnv());
    // 创建所需文件夹
    this.createDir();
  }
}

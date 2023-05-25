import { MidwayConfig } from '@midwayjs/core';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1684987184021_8658_default',
  koa: {
    port: 7001,
  },
  dir: {
    export: './public/export',
    upload: './public/upload',
    static: './public/static',
  },
  jwt: {
    secret: 'only_api_services', // fs.readFileSync('xxxxx.key')
    expiresIn: '2d', // https://github.com/vercel/ms
  },
  ignoreRouter: ['/'],
} as MidwayConfig;

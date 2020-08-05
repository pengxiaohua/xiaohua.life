import { Middleware, WebMiddleware, provide, config } from 'midway';

@provide()
export class ApiMiddleware implements WebMiddleware {

  @config('peng')
  pengConfig; // 重定义对应的config配置

  resolve(): Middleware {
    return async (ctx, next) => {
      console.log('peng:', this.pengConfig);
      ctx.api = '666' + this.pengConfig;
      await next();
    };
  }
}

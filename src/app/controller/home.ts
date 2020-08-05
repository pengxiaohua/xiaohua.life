import { Context, inject, controller, get, provide } from 'midway';

@provide()
@controller('/')
export class HomeController {

  @inject()
  ctx: Context;

  @inject()
  appDir;

  @get('/')
  async index() {
    console.log('appDir: ', this.appDir);
    this.ctx.body = `Welcome to midwayjs!`;
  }
}

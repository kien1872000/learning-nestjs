import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local.authguard';
import * as admin from 'firebase-admin';
import { NotificationsService } from './notifications/notifications.service';
import { Cron, CronExpression } from '@nestjs/schedule';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
    private notificationsService: NotificationsService
    ) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {


    return this.authService.login(req.user);
  }

  @Cron(CronExpression.EVERY_5_SECONDS)
  @Post('notification')
  async notification() {
      const token = "12342323123";
      const payload = {notification: {
        title: "Hello",
        body: "Hello 11111"
      }};
      const result = this.notificationsService.sendNotification(token, payload);
      console.log(await result);
      
      return this.notificationsService.sendNotification(token, payload);
  }
}

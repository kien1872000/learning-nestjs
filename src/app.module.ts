import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigsModule } from './configs/configs.module';
import { ConfigsService } from './configs/configs.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { NotificationsModule } from './notifications/notifications.modulte';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigsModule,
    MongooseModule.forRootAsync({
      imports: [ConfigsModule],
      useFactory: async (configService: ConfigsService) => {
        return configService.getMongoOption();
      },
      inject: [ConfigsService],
    }),
    UsersModule,
    AuthModule,
    NotificationsModule,
    ScheduleModule.forRoot()
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

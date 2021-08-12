import { Module } from '@nestjs/common'
import { MailService } from './mail.service'
import { MailProcessor } from './mail.processor'
import { MailerModule } from '@nestjs-modules/mailer'
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
import { BullModule } from '@nestjs/bull'
import { ConfigsModule } from 'src/configs/configs.module'
import { ConfigsService } from 'src/configs/configs.service'

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigsModule],
      inject: [ConfigsService],
      useFactory: (configService: ConfigsService) => ({
        transport: {
          host: configService.get('MAIL_HOST'),
          port: configService.get('MAIL_PORT'),
          //secure: config.get<boolean>('mail.secure'),
          tls: { ciphers: 'SSLv3' }, // gmail
          auth: {
            user: configService.get('MAIL_USERNAME'),
            pass: configService.get('MAIL_PASSWORD'),
          },
        },
        defaults: {
          from: "My app",
        },
        template: {
          dir: __dirname + '/templates',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
    BullModule.registerQueueAsync({
      imports: [ConfigsModule],
      inject: [ConfigsService],
      name: new ConfigsService().get('QUEUE_NAME'),
      useFactory: (configService: ConfigsService) => ({
        redis: {
          host: configService.get('REDIS_HOST'),
          port: Number(configService.get('REDIS_PORT')),
        },
      }),
    }),
  ],
  controllers: [],
  providers: [MailService, MailProcessor],
  exports: [MailService],
})
export class MailModule {}
import { MailerService } from '@nestjs-modules/mailer'
import { OnQueueActive, OnQueueCompleted, OnQueueFailed, Process, Processor } from '@nestjs/bull'
import { Logger } from '@nestjs/common'
import { Job } from 'bull'
import { plainToClass } from 'class-transformer'
import { UserDocument } from 'src/entities/user.entity'

@Processor('mail')
export class MailProcessor {
  private readonly logger = new Logger(this.constructor.name)

  constructor(private readonly mailerService: MailerService) {}

  @OnQueueActive()
  onActive(job: Job) {
    this.logger.debug(
      `Processing job ${job.id} of type ${job.name}. Data: ${JSON.stringify(
        job.data,
      )}`,
    );
  }

  @OnQueueCompleted()
  onComplete(job: Job, result: any) {
    this.logger.debug(
      `Completed job ${job.id} of type ${job.name}. Result: ${JSON.stringify(
        result,
      )}`,
    );
  }

  @OnQueueFailed()
  onError(job: Job<any>, error: any) {
    this.logger.error(
      `Failed job ${job.id} of type ${job.name}: ${error.message}`,
      error.stack,
    );
  }

  @Process('confirmation')
  async sendWelcomeEmail(
    job: Job<{ email: string; code: string }>,
  ): Promise<any> {
    this.logger.log(`Sending confirmation email to '${job.data.email}'`)

    const url = `http://localhost:8080/mail/${job.data.code}/confirm`

    // if (config.get<boolean>('mail.live')) {
    //   return 'SENT MOCK CONFIRMATION EMAIL'
    // }

    try {
      const result = await this.mailerService.sendMail({
        template: './confirmation',
        context: {
          firstName: 'Kiên',
          url: url,
        },
        subject: `Welcome to My app! Please Confirm Your Email Address`,
        to: job.data.email,
      })
      return result

    } catch (error) {
      this.logger.error(
        `Failed to send confirmation email to '${job.data.email}'`,
        error.stack,
      );
      throw error;
    }
  }
}
import { InjectQueue } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";
import { Queue } from "bull";

@Injectable()
export class MailService {
  constructor(@InjectQueue('mail') private mailQueue: Queue) {}


  async sendConfirmationEmail(email: string, code: string): Promise<boolean> {
    try {
      await this.mailQueue.add('confirmation', {
        email,
        code,
      })
      return true;
    } catch (error) {
      // this.logger.error(`Error queueing confirmation email to user ${user.email}`)
      return false;
    }
  }
}
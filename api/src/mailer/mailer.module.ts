import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service';

/**
 * Represents the module responsible for handling email functionality.
 */
@Module({
  providers: [MailerService],
  exports: [MailerService],
})
export class MailerModule {}

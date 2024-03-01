import { registerAs } from '@nestjs/config';
import { IMailerConfig } from './interfaces/mailer.interface';
import { MailerEnvironmentVariables } from './validations/mailer.validation';
import { validateUtil } from '../utils/validation/validate-util';
import 'dotenv/config';

/**
 * Registers the mailer configuration as a NestJS configuration provider.
 * @returns {IMailerConfig} The mailer configuration object.
 */
export default registerAs('mailer', (): IMailerConfig => {
  validateUtil(process.env, MailerEnvironmentVariables);

  return {
    url: process.env.EMAIL_URL_MESSAGE,
    from: process.env.EMAIL_FROM,
    transporter: {
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    },
  };
});

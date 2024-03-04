import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transporter } from 'nodemailer';
import nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter: Transporter;
  private url: string;
  private from: string;

  constructor(private configService: ConfigService) {
    this.url = this.configService.get('mailer.url');
    this.from = this.configService.get('mailer.from');
    const config = this.configService.get('mailer.transporter');
    this.transporter = nodemailer.createTransport(config);
  }

  /**
   * Sends a verification email to the specified email address.
   *
   * @param direction - The email address to send the verification email to.
   * @param token - The verification token to include in the email.
   * @returns A promise that resolves to a string indicating the success of the email sending.
   * @throws {InternalServerErrorException} If an error occurs while sending the email.
   */
  async SendVerificationMail(
    direction: string,
    token: string,
  ): Promise<string> {
    try {
      this.transporter.sendMail({
        from: this.from,
        to: direction,
        subject: 'Hello ✔',
        text: 'Hello world?',
        html: this.CreateVerificationMail(token),
      });
      return 'Mail enviado correctamente';
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Algo salio mal al enviar el mail.',
      );
    }
  }

  /**
   * Creates a verification email with a token.
   *
   * @param token - The verification token.
   * @returns The verification email HTML content.
   */
  CreateVerificationMail(token: string): string {
    return `<p>Si te llego este mail es para verificar tu cuenta, entrá acá <a href="${this.url}/verificar/${token}" blehh </p>`;
  }
}

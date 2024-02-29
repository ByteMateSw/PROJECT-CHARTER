import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transporter } from 'nodemailer';
import nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter: Transporter;
  private url: string;
  private from;

  constructor(private configService: ConfigService) {
    this.url = this.configService.get('mailer.url');
    this.from = this.configService.get('mailer.from');
    const config = this.configService.get('mailer.transporter');
    this.transporter = nodemailer.createTransport(config);
  }

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

  CreateVerificationMail(token: string): string {
    return `<p>Si te llego este mail es para verificar tu cuenta, entrá acá <a href="${this.url}/verificar/${token}" blehh </p>`;
  }
}

export interface MailerConfigFactory {
  createMailerOptions(): IMailerConfig;
}

export interface IMailerConfig {
  url: string;
  from: string;
  transporter: {
    host: string;
    port: number;
    secure: boolean;
    auth: {
      user: string;
      pass: string;
    };
  };
}

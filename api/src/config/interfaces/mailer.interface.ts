/**
 * Represents a factory for creating mailer configuration options.
 */
export interface MailerConfigFactory {
  /**
   * Creates mailer options.
   * @returns The mailer configuration options.
   */
  createMailerOptions(): IMailerConfig;
}

/**
 * Represents the configuration for the mailer.
 */
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

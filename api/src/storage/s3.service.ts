import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {
  private S3Client: S3Client;
  private bucketName: string;

  constructor(private configService: ConfigService) {
    const clientId = configService.get<string>('s3.client_id');
    const accessKeyId = configService.get<string>('s3.access_key_id');
    const secretAccessKey = configService.get<string>('s3.secret_access_key');

    this.S3Client = new S3Client({
      region: 'auto',
      endpoint: `https://${clientId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
  }

  async uploadFile(
    filename: string,
    path: string,
    mimetype: string,
    data: Buffer,
  ) {
    const response = await this.S3Client.send(
      new PutObjectCommand({
        Bucket: this.bucketName,
        Key: `${path}/${filename}`,
        Body: data,
        ContentType: mimetype,
      }),
    );
  }

  async getFile(filename: string, path: string) {
    const response = await this.S3Client.send(
      new GetObjectCommand({
        Bucket: this.bucketName,
        Key: `${path}/${filename}`,
      }),
    );
  }
}

import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {
  private S3Client: S3Client;
  private bucketName: string = this.configService.get<string>('s3.bucket_name');
  private publicDomain: string = this.configService.get<string>('s3.domain');

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
  ): Promise<string> {
    const objectName = `${path}/${filename}`;
    const response = await this.S3Client.send(
      new PutObjectCommand({
        Bucket: this.bucketName,
        Key: objectName,
        Body: data,
        ContentType: mimetype,
      }),
    );
    if (response.$metadata.httpStatusCode != 200)
      throw new InternalServerErrorException(
        `Hubo un error al subir el archivo ${filename}`,
      );
    return objectName;
  }

  async getFile(filename: string, path: string): Promise<Uint8Array> {
    const response = await this.S3Client.send(
      new GetObjectCommand({
        Bucket: this.bucketName,
        Key: `${path}/${filename}`,
      }),
    );
    if (response.$metadata.httpStatusCode != 200)
      throw new InternalServerErrorException(
        `Hubo un error al obtener el archivo ${filename}`,
      );
    return response.Body.transformToByteArray();
  }

  async removeFile(filename: string, path: string): Promise<void> {
    const response = await this.S3Client.send(
      new DeleteObjectCommand({
        Bucket: this.bucketName,
        Key: `${path}/${filename}`,
      }),
    );
    if (response.$metadata.httpStatusCode != 204)
      throw new InternalServerErrorException(
        `Hubo un error al borrar el archivo ${filename}`,
      );
  }

  getURLFile(pathFile: string) {
    return `${this.publicDomain}/${pathFile}`;
  }
}

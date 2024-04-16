import { Controller, Get } from '@nestjs/common';

@Controller('/')
export class AppController {
  @Get()
  running() {
    return 'API is up and running';
  }
}

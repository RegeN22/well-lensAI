import { Controller, Param, Post, Res, UploadedFile } from '@nestjs/common';
import { ScanService } from './scan.service';

@Controller('/api/v1/scan')
export class ScanController {
  constructor(private readonly scanServerice: ScanService) {}

  @Post()
  async scan(@Res() response, @UploadedFile() file: Express.Multer.File) {
    // return await this.scanServerice.scan(file);
  }

  @Post('user/:userId')
  async scanAsUser(
    @Res() response,
    @UploadedFile() file: Express.Multer.File,
    @Param('userId') userId: number,
  ) {
    // return await this.scanServerice.scanAsUser(userId, file);
  }
}

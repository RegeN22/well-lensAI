import {
  Controller,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { IRateProductResponse } from '../utils/gen-ai/types/gen-ai.interfaces';
import { ScanService } from './scan.service';

@Controller('/api/v1/scans')
export class ScanController {
  constructor(private readonly scanServerice: ScanService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async scan(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<IRateProductResponse> {
    return await this.scanServerice.scanProduct(file);
  }

  @Post('user/:userId')
  @UseInterceptors(FileInterceptor('file'))
  async scanAsUser(
    @UploadedFile() file: Express.Multer.File,
    @Param('userId') userId: number,
  ): Promise<IRateProductResponse> {
    return await this.scanServerice.scanProductForUser(userId, file);
  }
}

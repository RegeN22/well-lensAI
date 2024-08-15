import {
  Controller,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { IRateProductResponse } from '../utils/gen-ai/types/gen-ai.interfaces';
import { ScanService } from './scan.service';
import { AccessTokenGuard } from 'src/auth/guards/accessToken.guard';

@Controller('/scan')
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

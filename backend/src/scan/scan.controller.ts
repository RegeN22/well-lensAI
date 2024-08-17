import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AccessTokenGuard } from 'src/auth/guards/accessToken.guard';
import { History } from '../history/history.schema';
import { HistoryService } from '../history/history.service';
import { IRateProductResponse } from '../utils/gen-ai/types/gen-ai.interfaces';
import { ScanService } from './scan.service';

@Controller('/scans')
@UseGuards(AccessTokenGuard)
export class ScanController {
  constructor(
    private readonly scanServerice: ScanService,
    private readonly historyService: HistoryService,
  ) {}

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
    @Param('userId') userId: string,
  ): Promise<IRateProductResponse> {
    return await this.scanServerice.scanProductForUser(userId, file);
  }

  @Get()
  async findAllScans(): Promise<History[]> {
    return await this.historyService.findAll();
  }

  @Get('user/:userId')
  async findUserScans(@Param('userId') userId: string): Promise<History[]> {
    return await this.historyService.findByUser(userId);
  }

  @Get('user/:userId/:id')
  async findOne(
    @Param('userId') userId: string,
    @Param('id') id: string,
  ): Promise<History> {
    return await this.historyService.findOne(userId, id);
  }

  @Delete('user/:userId/:id')
  async remove(@Param('userId') userId: string, @Param('id') id: string) {
    return await this.historyService.remove(userId, id);
  }
}

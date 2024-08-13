import {
  Body,
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
import { IRateProductResponse } from '../utils/gen-ai/types/gen-ai.interfaces';
import { History } from './history.schema';
import { HistoryService } from './history.service';

type PostHistory = {
  userId: string;
  jsonData: string;
};

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: PostHistory,
  ) {
    const data: History = {
      image: file,
      userId: body.userId,
      jsonData: JSON.parse(body.jsonData) as IRateProductResponse,
      createdAt: new Date(),
    };
    return await this.historyService.create(data);
  }

  @Get()
  async findAll(): Promise<History[]> {
    return await this.historyService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.historyService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.historyService.remove(id);
  }
}

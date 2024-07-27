import {
    Controller,
    Param,
    Get,
    Body,
    Post,
    Delete,
    UseInterceptors,
    UploadedFile,
  } from '@nestjs/common';
import { HistoryService } from './history.service';
import { History } from './history.schema';
import { FileInterceptor } from '@nestjs/platform-express';

  type PostHistory = {
    userId: string,
    jsonData: string
  }


  @Controller('/api/v1/history')
  export class HistoryController {
    constructor(private readonly historyService: HistoryService) {}
    
    @Post() 
    @UseInterceptors(FileInterceptor('file'))
    async create(@UploadedFile() file: Express.Multer.File,
    @Body() body:PostHistory) {
      let data : History = {image:file,userId:body.userId,jsonData:JSON.parse(body.jsonData),createdAt:new Date()}
      return await this.historyService.create(data);
    }
  
    @Get()
    async findAll() : Promise<History[]> {
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
  
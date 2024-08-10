import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { History, HistoryDocument } from './history.schema';

@Injectable()
export class HistoryService {
  constructor(@InjectModel(History.name) private historyModel: Model<HistoryDocument>) {}

  async create(historyData: History) {
    const createdHistory = new this.historyModel(historyData);
    return createdHistory.save();
  }

  async findAll(): Promise<History[]> {
    return this.historyModel.find();
    // return this.historyModel.find({ userId }).sort({ createdAt: -1 });
  }

  async findOne(id: string): Promise<History>{
    return this.historyModel.findById(id);
  }

  async remove(id: string) {
    return this.historyModel.findByIdAndDelete(id);
  }
}

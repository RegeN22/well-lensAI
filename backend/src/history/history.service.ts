import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { History, HistoryDocument } from './history.schema';

@Injectable()
export class HistoryService {
  constructor(
    @InjectModel(History.name) private historyModel: Model<HistoryDocument>,
  ) {}

  async create(historyData: History): Promise<History> {
    const createdHistory = new this.historyModel({
      ...historyData,
      createAt: Date.now(),
    });

    return createdHistory.save();
  }

  async findAll(): Promise<History[]> {
    return this.historyModel.find();
  }

  async findByUser(userId: string): Promise<History[]> {
    return this.historyModel.find({ userId });
  }

  async findOne(userId: string, id: string): Promise<History> {
    return this.historyModel.findOne({ userId, id });
  }

  async remove(userId: string, id: string) {
    return this.historyModel.findOneAndDelete({ userId, id });
  }
}

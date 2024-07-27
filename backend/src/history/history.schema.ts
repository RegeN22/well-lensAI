import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {  IRateProductResponse } from 'src/utils/gen-ai/types/gen-ai.interfaces';

export type HistoryDocument = History & Document;

@Schema()
export class History {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true, type:Object })
  image: Express.Multer.File;

  @Prop({ required: true, type:Object })
  jsonData: IRateProductResponse;

  @Prop({default: Date.now() })
  createdAt: Date;
}

export const HistorySchema = SchemaFactory.createForClass(History);

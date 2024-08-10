import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IPersonalInfo } from './types/user.interfaces';
export type UserDocument = User & Document;

@Schema()
export class User implements IPersonalInfo {
  @Prop(String)
  firstName: string;

  @Prop(String)
  lastName: string;

  @Prop(String)
  email: string;

  @Prop(String)
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [String], required: false })
  refreshTokens: string[];

  @Prop({ type: [String], required: false })
  allergies: string[];

  @Prop({ type: [String], required: false })
  deceases: string[];

  @Prop(String)
  age?: number;

  @Prop(String)
  gender?: string;

  @Prop(String)
  imgUrl?: string;

  @Prop(String)
  weight?: number;

  @Prop(String)
  height?: number;
}

export const UserSchema = SchemaFactory.createForClass(User);

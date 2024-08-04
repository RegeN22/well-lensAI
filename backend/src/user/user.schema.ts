import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type UserDocument = User & Document;

@Schema()
export class User {
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
}

export const UserSchema = SchemaFactory.createForClass(User);

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, private jwtService: JwtService, private configService: ConfigService) { }
  async findOne(email: string, username: string) {
    return this.userModel.findOne({ $or: [{ email }, { username }] }).exec()
  }

  async create(user: { firstname: string, lastName: string, password: string, email: string, username: string }) {
    const user1 = await this.userModel.create(user);
    const tokens = await this.generateTokens(user1);
    const { email, firstName, lastName, username, _id } = user1;
    return { email, firstName, lastName, username, _id, ...tokens };
  }

  async generateTokens(user: UserDocument) {
    const accessToken = this.jwtService.sign({ _id: user._id }, {
      secret: this.configService.get("JWT_SECRET"),
      expiresIn: this.configService.get("JWT_EXPIRATION"),
    });
    const refreshToken = this.jwtService.sign(
      { _id: user._id },
      {
        secret: this.configService.get("JWT_REFRESH_SECRET")
      });

    if (user.refreshTokens == null) {
      user.refreshTokens = [refreshToken];
    } else {
      user.refreshTokens.push(refreshToken);
    }

    await user.save();

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  };
}

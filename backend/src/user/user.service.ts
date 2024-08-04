import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './types/createUserDTO.type';
import { User, UserDocument } from './user.schema';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, private jwtService: JwtService, private configService: ConfigService) { }

  findById(_id: string) {
    return this.userModel.findById(_id).exec();
  }
  async findByUsernameOrEmail(username: string) {
    return this.userModel.findOne({ $or: [{ username }, { email: username }] }).exec();
  }

  async create(user: CreateUserDto) {
    if (Object.values(user).filter(e => !!e).length !== Object.keys(user).length) {
      throw new BadRequestException("One required argument missing");
    }
    const rs = await this.userModel.find({ $or: [{ email: user.email }, { username: user.username }] });
    if (rs != null) {
      return new BadRequestException("Email or username already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(user.password, salt);
    user.password = encryptedPassword;
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
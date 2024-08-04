import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { CreateUserDto } from './types/createUserDTO.type';
import bcrypt from "bcrypt";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, private jwtService: JwtService, private configService: ConfigService) { }

  async findOne(email: string, username: string) {
    return this.userModel.findOne({ $or: [{ email }, { username }] }).exec()
  }

  async create(user: CreateUserDto) {
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

  async login(username: string, password: string) {
    if (!username || !password) {
      throw new UnauthorizedException("Missing username or password");
    }
    try {
      const user = await this.userModel.findOne({ username });
      if (user == null) {
        throw new UnauthorizedException("Username or password incorrect");
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        throw new UnauthorizedException("Username or password incorrect");
      }
      return await this.generateTokens(user);
    } catch (err) {
      throw new UnauthorizedException("Error missing email or password");
    }
  }


  async logout(authHeader: string) {
    const refreshToken = authHeader && authHeader.split(" ")[1]; // Bearer <token>

    if (refreshToken == null) throw new UnauthorizedException();
    try {
      const user: { _id: string } = this.jwtService.verify(refreshToken, { secret: process.env.JWT_REFRESH_SECRET });

      const userDb = await this.userModel.findOne({ _id: user._id });

      if (!userDb.refreshTokens || !userDb.refreshTokens.includes(refreshToken)) {
        userDb.refreshTokens = [];
        await userDb.save();
        throw new UnauthorizedException();
      } else {
        userDb.refreshTokens = userDb.refreshTokens.filter((t) => t !== refreshToken);
        await userDb.save();
        return "Logout succeeded";
      }
    } catch (error) {
      throw new UnauthorizedException();
    }

  }

  async refresh(authHeader: string) {
    const refreshToken = authHeader && authHeader.split(" ")[1]; // Bearer <token>
    if (refreshToken == null) throw new UnauthorizedException(401);

    try {
      const user = this.jwtService.verify(refreshToken, { secret: process.env.JWT_REFRESH_SECRET });

      const userDb = await this.userModel.findOne({ _id: user._id });

      if (
        !userDb.refreshTokens ||
        !userDb.refreshTokens.includes(refreshToken)
      ) {
        userDb.refreshTokens = [];
        await userDb.save();
        throw new UnauthorizedException("Refresh token invalid");
      }
      const accessToken = this.jwtService.sign(
        { _id: user._id },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: process.env.JWT_EXPIRATION
        }
      );
      const newRefreshToken = this.jwtService.sign(
        { _id: user._id },
        { secret: process.env.JWT_REFRESH_SECRET }
      );
      userDb.refreshTokens = userDb.refreshTokens.filter(
        (t) => t !== refreshToken
      );
      userDb.refreshTokens.push(newRefreshToken);
      await userDb.save();
      return {
        accessToken: accessToken,
        refreshToken: newRefreshToken,
      };

    } catch (err) {
      throw new UnauthorizedException(err.message);
    }
  }
}
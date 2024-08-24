import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { isUndefined } from '../utils/general.util';
import { CreateUserDto } from './types/createUserDTO.type';
import { User, UserDocument } from './user.schema';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) { }

  async findOne(filter) {
    return this.userModel.findOne(filter).exec();
  }

  findById(_id: string) {
    return this.userModel.findById(_id).exec();
  }

  async findByUsernameOrEmail(username: string) {
    return this.userModel
      .findOne({ $or: [{ username }, { email: username }] })
      .lean();
  }

  async update(
    userId: string,
    updateUser: Partial<CreateUserDto>,
  ): Promise<UserDocument> {
    let checkConflict: UserDocument = null;

    const user: UserDocument = await this.userModel.findById(userId);

    if (updateUser.username || updateUser.email) {
      checkConflict = await this.userModel.findOne({
        $or: [{ email: updateUser.email }, { username: updateUser.username }],
        $and: [{ _id: { $ne: userId } }],
      });
    }

    if (checkConflict) {
      throw new ConflictException('Email or username already in use');
    }

    if (updateUser.password && updateUser.password !== user.password) {
      const salt = await bcrypt.genSalt(10);
      updateUser.password = await bcrypt.hash(updateUser.password, salt);
    } else {
      delete updateUser.password;
    }

    const updateFields = {
      ...(!isUndefined(updateUser.firstName) && {
        firstName: updateUser.firstName,
      }),
      ...(!isUndefined(updateUser.lastName) && {
        lastName: updateUser.lastName,
      }),
      ...(!isUndefined(updateUser.username) && {
        username: updateUser.username,
      }),
      ...(!isUndefined(updateUser.password) && {
        password: updateUser.password,
      }),
      ...(!isUndefined(updateUser.allergies) && {
        allergies: updateUser.allergies,
      }),
      ...(!isUndefined(updateUser.diseases) && {
        diseases: updateUser.diseases,
      }),
      ...(!isUndefined(updateUser.age) && { age: updateUser.age }),
      ...(!isUndefined(updateUser.gender) && { gender: updateUser.gender }),
      ...(!isUndefined(updateUser.weight) && { weight: updateUser.weight }),
      ...(!isUndefined(updateUser.height) && { height: updateUser.height }),
      ...(!isUndefined(updateUser.imgUrl) && { imgUrl: updateUser.imgUrl }),
    };

    try {
      const updatedObj = await this.userModel.findByIdAndUpdate(
        userId,
        updateFields,
        {
          new: true,
        },
      );

      if (!updatedObj) {
        throw new NotFoundException('Not found, update failed');
      }

      return updatedObj;
    } catch (err) {
      throw err;
    }
  }

  async create(user: CreateUserDto) {
    if (
      !user.email ||
      !user.password ||
      !user.username ||
      !user.firstName ||
      !user.lastName
    ) {
      throw new BadRequestException('One required argument missing');
    }
    const rs = await this.userModel.findOne({
      $or: [{ email: user.email }, { username: user.username }],
    });
    if (rs != null) {
      throw new BadRequestException('Email or username already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(user.password, salt);
    user.password = encryptedPassword;
    const user1 = await this.userModel.create(user);
    const tokens = await this.generateTokens(user1);
    const { email, firstName, lastName, username, _id, imgUrl } = user1;
    return { email, firstName, lastName, username, _id, imgUrl, ...tokens };
  }

  async generateTokens(user: UserDocument) {
    const accessToken = this.jwtService.sign(
      { _id: user._id },
      {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: this.configService.get('JWT_EXPIRATION'),
      },
    );
    const refreshToken = this.jwtService.sign(
      { _id: user._id },
      {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      },
    );

    if (user.refreshTokens == null) {
      user.refreshTokens = [refreshToken];
    } else {
      user.refreshTokens.push(refreshToken);
    }

    await this.userModel.updateOne(
      { _id: user._id },
      { refreshTokens: user.refreshTokens },
    );

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }
}

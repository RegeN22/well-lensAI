import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import { AccessTokenGuard } from 'src/auth/guards/accessToken.guard';
import { User } from 'src/auth/guards/user.decorator';
import { CreateUserDto } from './types/createUserDTO.type';
import { UserService } from './user.service';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/');
  },
  filename: function (req, file, cb) {
    const ext = file.originalname
      .split('.')
      .filter(Boolean) // removes empty extensions (e.g. `filename...txt`)
      .slice(1)
      .join('.');
    cb(null, Date.now() + '.' + ext);
  },
});

@Controller('users')
@UseGuards(AccessTokenGuard)
export class UserController {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
  ) {}

  @Get('me')
  async findOne(@User() userAuth) {
    return await this.userService.findById(userAuth._id);
  }

  @Put('update')
  update(@User() userAuth, @Body('user') user: CreateUserDto) {
    return this.userService.update(userAuth._id, user);
  }

  @Post('file')
  @UseInterceptors(
    FileInterceptor('file', {
      storage,
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.configService.get('URL') + file.path;
  }
}

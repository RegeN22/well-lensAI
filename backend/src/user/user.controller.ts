import { Body, Controller, Post, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AccessTokenGuard } from 'src/auth/guards/accessToken.guard';
import { CreateUserDto } from './types/createUserDTO.type';
import { UserService } from './user.service';
import { User } from 'src/auth/guards/user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/')
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split('.')
      .filter(Boolean) // removes empty extensions (e.g. `filename...txt`)
      .slice(1)
      .join('.')
    cb(null, Date.now() + "." + ext)
  }
})
@UseGuards(AccessTokenGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService, private configService: ConfigService
  ) { }


  update(@User() userAuth, @Body("user") user: CreateUserDto) {
    return this.userService.update(userAuth._id, user);
  }

  @Post('file')
  @UseInterceptors(FileInterceptor('file', {
    storage
  }))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.configService.get("URL") + file.path;
  }
}

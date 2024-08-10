import { Body, Controller, Query, UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from 'src/auth/guards/accessToken.guard';
import { CreateUserDto } from './types/createUserDTO.type';
import { UserService } from './user.service';
import { User } from 'src/auth/guards/user.decorator';

@UseGuards(AccessTokenGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService
  ) { }


  update(@User() userAuth, @Body("user") user: CreateUserDto) {
    return this.userService.update(userAuth._id, user);
  }
}

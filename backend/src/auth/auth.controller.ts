import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/user/types/createUserDTO.type';
import { AuthService } from './auth.service';
import { RefreshTokenGuard } from './guards/refreshToken.guard';
import { User } from './guards/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  signin(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    return this.authService.login(username, password);
  }

  @Post('google')
  signInWithGoogle(@Body('credential') credential: string) {
    return this.authService.signInWithGoogle(credential);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('logout')
  logout(@User() user) {
    return this.authService.logout(user._id, user.refreshToken);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@User() user) {
    return this.authService.refresh(user._id, user.refreshToken);
  }
}

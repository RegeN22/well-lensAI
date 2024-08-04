import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/user/types/createUserDTO.type';
import { AccessTokenGuard } from './accessToken.guard';
import { AuthService } from './auth.service';
import { RefreshTokenGuard } from './refreshToken.guard';
import { User } from './user.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    async signup(@Body() createUserDto: CreateUserDto) {
        return this.authService.register(createUserDto);
    }

    @Post('login')
    signin(@Body("username") username: string, @Body("password") password: string) {
        return this.authService.login(username, password);
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
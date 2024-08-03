import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AccessTokenGuard } from './accessToken.guard';
import { RefreshTokenGuard } from './refreshToken.guard';
import { AuthService } from './auth.service';
import { AuthDto, CreateUserDto } from 'src/user/types/createUserDTO.type';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('signup')
    async signup(@Body() createUserDto: CreateUserDto) {
        return this.authService.signUp(createUserDto);
    }

    @Post('signin')
    signin(@Body() data: AuthDto) {
        return this.authService.signIn(data);
    }

    @UseGuards(AccessTokenGuard)
    @Get('logout')
    logout(@Req() req: Request) {
        this.authService.logout(req?.["user"]['sub']);
    }

    @UseGuards(RefreshTokenGuard)
    @Get('refresh')
    refreshTokens(@Req() req: Request) {
        const userId = req?.["user"]['sub'];
        const refreshToken = req?.["user"]['refreshToken'];
        return this.authService.refreshTokens(userId, refreshToken);
    }
}
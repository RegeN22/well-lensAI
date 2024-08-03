import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AccessTokenGuard } from './accessToken.guard';
import { RefreshTokenGuard } from './refreshToken.guard';
import { AuthService } from './auth.service';
export interface AuthDto {
    username: string;
    password: string;
}
export interface CreateUserDto {
    name: string;
    username: string;
    password: string;
    refreshToken?: string;
}
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('signup')
    signup(@Body() createUserDto: CreateUserDto) {
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
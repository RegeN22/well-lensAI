import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenStrategy } from './accessToken.strategy';
import { RefreshTokenStrategy } from './refreshToken.strategy';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [JwtModule.register({}), UserModule],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
  exports: []
})
export class AuthModule { }

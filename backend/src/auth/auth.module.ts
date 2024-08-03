import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenStrategy } from './accessToken.strategy';
import { RefreshTokenStrategy } from './refreshToken.strategy';

@Module({
  imports: [JwtModule.registerAsync({
    useFactory: (configService: ConfigService) => ({
      secret: configService.get("JWT_SECRET"),
      global: true,
      signOptions: {
        expiresIn: configService.get("JWT_EXPIRATION")
      }
    }),
    inject: [ConfigService]
  })],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
  exports: []
})
export class AuthModule { }

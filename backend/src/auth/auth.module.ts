import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from './auth.guard';
import { APP_GUARD } from '@nestjs/core';

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
  providers: [AuthService, {
    provide: APP_GUARD,
    useClass: AuthGuard,
  },],
  exports: []
})
export class AuthModule { }

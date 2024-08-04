import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HistoryModule } from './history/history.module';
import { History, HistorySchema } from './history/history.schema';
import { ScanModule } from './scan/scan.module';
import { UserModule } from './user/user.module';
import { User, UserSchema } from './user/user.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRootAsync({ inject: [ConfigService], useFactory: (configService: ConfigService) => ({uri:configService.get("DB_URL")}) }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRATION },
    }),
    ConfigModule.forRoot({ isGlobal: true, load: [], envFilePath: '.env' }),
    UserModule,
    ScanModule,
    HistoryModule
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService],
})
export class AppModule { }
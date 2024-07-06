import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScanController } from './controller/scan.controller';
import { UserController } from './controller/user.controller';
import { User, UserSchema } from './model/user.schema';
import { ScanService } from './service/scan.service';
import { UserService } from './service/user.service';
import { secret } from './utils/constants';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/Stream'),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret,
      signOptions: { expiresIn: '2h' },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
  controllers: [AppController, UserController, ScanController],
  providers: [AppService, UserService, ScanService],
  exports: [AppService, UserService, ScanService],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(isAuthenticated)
  //     .exclude(
  //       { path: 'api/v1/video/:id', method: RequestMethod.GET }
  //     )
  //     .forRoutes(UserController); // change to a different controller that needs auth
  // }
}

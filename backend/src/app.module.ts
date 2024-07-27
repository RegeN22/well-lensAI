import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScanController } from './scan/scan.controller';
import { ScanService } from './scan/scan.service';
import { UserController } from './user/user.controller';
import { User, UserSchema } from './user/user.schema';
import { UserService } from './user/user.service';
import { HistoryController } from './history/history.controller';
import { HistoryService } from './history/history.service';
import { History, HistorySchema } from './history/history.schema';

require('dotenv').config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URL),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: History.name, schema: HistorySchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRATION },
    }),
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'public'),
    // }),
  ],
  controllers: [AppController, UserController, ScanController, HistoryController],
  providers: [AppService, UserService, ScanService, HistoryService],
  exports: [AppService, UserService, ScanService, HistoryService],
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

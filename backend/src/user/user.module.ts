import { Module } from "@nestjs/common";


@Module({
  imports: [
    // MongooseModule.forRoot(process.env.DB_URL),
    // MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    // MongooseModule.forFeature([{ name: History.name, schema: HistorySchema }]),
    // JwtModule.register({
    //   secret: process.env.JWT_SECRET,
    //   signOptions: { expiresIn: process.env.JWT_EXPIRATION },
    // }),
    // // ServeStaticModule.forRoot({
    // //   rootPath: join(__dirname, '..', 'public'),
    // // }),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class UserModule {

}

import { Module } from "@nestjs/common";
import { ScanController } from "./scan.controller";
import { ScanService } from "./scan.service";
import { UserModule } from "src/user/user.module";


@Module({
  imports: [UserModule],
  controllers: [ScanController],
  providers: [ScanService],
  exports: [ScanService],
})
export class ScanModule {

}

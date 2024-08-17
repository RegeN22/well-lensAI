import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { HistoryModule } from '../history/history.module';
import { ScanController } from './scan.controller';
import { ScanService } from './scan.service';

@Module({
  imports: [UserModule, HistoryModule],
  controllers: [ScanController],
  providers: [ScanService],
  exports: [ScanService],
})
export class ScanModule {}

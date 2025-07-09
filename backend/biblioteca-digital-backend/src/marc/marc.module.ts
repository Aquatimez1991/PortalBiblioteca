import { Module } from '@nestjs/common';
import { MarcController } from './marc.controller';
import { MarcService } from './marc.service';

@Module({
  controllers: [MarcController],
  providers: [MarcService],
  exports: [MarcService],
})
export class MarcModule {} 
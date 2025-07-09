import { Module } from '@nestjs/common';
import { RecommendedController } from './recommended.controller';
import { RecommendedService } from './recommended.service';

@Module({
  controllers: [RecommendedController],
  providers: [RecommendedService],
  exports: [RecommendedService],
})
export class RecommendedModule {} 
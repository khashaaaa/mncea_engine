import { Module } from '@nestjs/common';
import { PartnershipService } from './partnership.service';
import { PartnershipController } from './partnership.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Partnership } from './entities/partnership.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Partnership])
  ],
  controllers: [PartnershipController],
  providers: [PartnershipService],
})
export class PartnershipModule {}

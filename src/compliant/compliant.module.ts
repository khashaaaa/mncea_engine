import { Module } from '@nestjs/common'
import { CompliantService } from './compliant.service'
import { CompliantController } from './compliant.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Compliant } from './entities/compliant.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Compliant])
  ],
  controllers: [CompliantController],
  providers: [CompliantService],
})
export class CompliantModule { }

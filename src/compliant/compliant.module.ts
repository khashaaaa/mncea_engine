import { Module } from '@nestjs/common'
import { CompliantService } from './compliant.service'
import { CompliantController } from './compliant.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Compliant } from './entities/compliant.entity'
import { JwtService } from '@nestjs/jwt'

@Module({
  imports: [
    TypeOrmModule.forFeature([Compliant])
  ],
  controllers: [CompliantController],
  providers: [CompliantService, JwtService],
})
export class CompliantModule { }

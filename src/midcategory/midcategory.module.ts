import { Module } from '@nestjs/common'
import { MidcategoryService } from './midcategory.service'
import { MidcategoryController } from './midcategory.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Midcategory } from './entities/midcategory.entity'
import { JwtService } from '@nestjs/jwt'

@Module({
  imports: [
    TypeOrmModule.forFeature([Midcategory])
  ],
  controllers: [MidcategoryController],
  providers: [MidcategoryService, JwtService],
})
export class MidcategoryModule { }

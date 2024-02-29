import { Module } from '@nestjs/common'
import { HeadcategoryService } from './headcategory.service'
import { HeadcategoryController } from './headcategory.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Headcategory } from './entities/headcategory.entity'
import { JwtService } from '@nestjs/jwt'

@Module({
  imports: [
    TypeOrmModule.forFeature([Headcategory])
  ],
  controllers: [HeadcategoryController],
  providers: [HeadcategoryService, JwtService],
})
export class HeadcategoryModule { }

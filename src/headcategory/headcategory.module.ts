import { Module } from '@nestjs/common'
import { HeadcategoryService } from './headcategory.service'
import { HeadcategoryController } from './headcategory.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Headcategory } from './entities/headcategory.entity'
import { JwtService } from '@nestjs/jwt'
import { Page } from 'src/page/entities/page.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Headcategory]),
    TypeOrmModule.forFeature([Page])
  ],
  controllers: [HeadcategoryController],
  providers: [HeadcategoryService, JwtService],
})
export class HeadcategoryModule { }

import { Module } from '@nestjs/common'
import { MidcategoryService } from './midcategory.service'
import { MidcategoryController } from './midcategory.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Midcategory } from './entities/midcategory.entity'
import { JwtService } from '@nestjs/jwt'
import { Subcategory } from 'src/subcategory/entities/subcategory.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Midcategory]),
    TypeOrmModule.forFeature([Subcategory])
  ],
  controllers: [MidcategoryController],
  providers: [MidcategoryService, JwtService],
})
export class MidcategoryModule { }

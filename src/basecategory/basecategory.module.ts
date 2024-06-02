import { Module } from '@nestjs/common'
import { BasecategoryService } from './basecategory.service'
import { BasecategoryController } from './basecategory.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Basecategory } from './entities/basecategory.entity'
import { JwtService } from '@nestjs/jwt'
import { Midcategory } from 'src/midcategory/entities/midcategory.entity'
import { Subcategory } from 'src/subcategory/entities/subcategory.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Basecategory]),
    TypeOrmModule.forFeature([Midcategory]),
    TypeOrmModule.forFeature([Subcategory])
  ],
  controllers: [BasecategoryController],
  providers: [BasecategoryService, JwtService],
})
export class BasecategoryModule { }

import { Module } from '@nestjs/common'
import { SubcategoryService } from './subcategory.service'
import { SubcategoryController } from './subcategory.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Subcategory } from './entities/subcategory.entity'
import { JwtService } from '@nestjs/jwt'

@Module({
  imports: [
    TypeOrmModule.forFeature([Subcategory])
  ],
  controllers: [SubcategoryController],
  providers: [SubcategoryService, JwtService],
})
export class SubcategoryModule { }

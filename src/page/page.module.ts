import { Module } from '@nestjs/common'
import { PageService } from './page.service'
import { PageController } from './page.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Page } from './entities/page.entity'
import { JwtService } from '@nestjs/jwt'
import { Headcategory } from 'src/headcategory/entities/headcategory.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Page]),
    TypeOrmModule.forFeature([Headcategory])
  ],
  controllers: [PageController],
  providers: [PageService, JwtService],
})
export class PageModule { }

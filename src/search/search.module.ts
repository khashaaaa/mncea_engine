import { Module } from '@nestjs/common'
import { SearchController } from './search.controller'
import { SearchService } from './search.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Post } from 'src/post/entities/post.entity'

@Module({
    imports: [
        TypeOrmModule.forFeature([Post])
    ],
    controllers: [SearchController],
    providers: [SearchService],
})
export class SearchModule { }

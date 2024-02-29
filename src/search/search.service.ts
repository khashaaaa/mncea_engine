import { Injectable } from "@nestjs/common"
import { Repository, Like } from "typeorm"
import { InjectRepository } from "@nestjs/typeorm"
import { Post } from '../post/entities/post.entity'

@Injectable()
export class SearchService {

    constructor(@InjectRepository(Post) private PostRepo: Repository<Post>) { }

    async search(body: any) {
        try {
            const { keyword } = body
            const result = await this.PostRepo
                .createQueryBuilder('post')
                .where('post.title LIKE :title', { title: `%${keyword}%` })
                .getMany()

            return {
                ok: true,
                data: result
            }
        } catch (error) {
            return {
                ok: false,
                message: error.message
            }
        }
    }
}
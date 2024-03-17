import { Injectable } from "@nestjs/common"
import { Repository, ILike } from "typeorm"
import { InjectRepository } from "@nestjs/typeorm"
import { Post } from '../post/entities/post.entity'
import { Page } from "src/page/entities/page.entity"

@Injectable()
export class SearchService {

    constructor(
        @InjectRepository(Post) private postRepo: Repository<Post>,
        @InjectRepository(Page) private pageRepo: Repository<Page>
    ) { }

    async search(keyword: string) {
        try {
            const [post, page] = await Promise.all([
                this.postRepo.find({
                    where: { title: ILike(`%${keyword}%`) }
                }),
                this.pageRepo.find({
                    where: { title: ILike(`%${keyword}%`) }
                })
            ])

            return {
                ok: true,
                data: {
                    post,
                    page,
                }
            }
        } catch (error) {
            console.error(error.message)
        }
    }
}
import { Injectable } from '@nestjs/common'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Post } from './entities/post.entity'
import { Not, Repository } from 'typeorm'
import { Language } from '../enum/language'
import { Priority } from 'src/enum/priority'

@Injectable()
export class PostService {

  constructor(@InjectRepository(Post) private repo: Repository<Post>) { }

  async create(createPostDto: CreatePostDto) {

    try {
      const data = await this.repo.save(createPostDto)

      return {
        ok: true,
        data,
        message: 'Нийтлэгдлээ'
      }
    }
    catch (error) {
      return {
        ok: false,
        message: error.message
      }
    }
  }

  async findByPriority(body: any) {
    const { priority } = body
    const records = await this.repo.find({ where: { priority } })
    return {
      ok: true,
      data: records
    }
  }

  async findAll(language: Language) {
    return await this.repo.find({ where: { language } })
  }

  async findAllRegular(language: Language) {
    return await this.repo.find({ where: { language, priority: Not(Priority.FEATURED) } })
  }

  async findBase(mark: number) {
    return await this.repo.find({ where: { base_category: mark } })
  }

  async findMid(mark: number) {
    return await this.repo.find({ where: { mid_category: mark } })
  }

  async findSub(mark: number) {
    return await this.repo.find({ where: { sub_category: mark } })
  }

  async findOne(mark: string) {

    try {
      const exist = await this.repo.findOne({ where: { mark } })

      if (!exist) {
        return {
          ok: false,
          message: 'Мэдээлэл олдсонгүй'
        }
      }

      return {
        ok: true,
        data: exist
      }
    }
    catch (error) {
      return {
        ok: false,
        message: error.message
      }
    }
  }

  async update(mark: string, updatePostDto: UpdatePostDto) {

    try {
      const exist = await this.repo.findOne({ where: { mark } })

      if (!exist) {
        return {
          ok: false,
          message: 'Мэдээлэл олдсонгүй'
        }
      }

      const updated = await this.repo.save({
        ...exist,
        ...updatePostDto
      })

      return {
        ok: true,
        data: updated,
        message: 'Мэдээлэл шинэчлэгдлээ'
      }
    }
    catch (error) {
      return {
        ok: false,
        message: error.message
      }
    }
  }

  async remove(mark: string) {
    const delItem = await this.repo.delete(mark)
    if (delItem.affected === 0) {
      return {
        ok: false,
        message: 'Мэдээлэл олдсонгүй'
      }
    }
    return {
      ok: true,
      data: delItem,
      message: 'Мэдээлэл устгагдлаа'
    }
  }
}

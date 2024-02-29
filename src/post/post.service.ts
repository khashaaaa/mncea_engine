import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Post } from './entities/post.entity'
import { Repository } from 'typeorm'
import { Language } from '../enum/language'

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
      throw new InternalServerErrorException('Алдааны мэдээлэл: ' + error.message)
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

  async findMid(mark: number) {
    return await this.repo.find({ where: { mid_category: mark } })
  }

  async findSub(mark: number) {
    return await this.repo.find({ where: { sub_category: mark } })
  }

  async findOne(mark: string) {

    try {
      const exist = await this.repo.findOneOrFail({ where: { mark } })

      if (!exist) {
        throw new NotFoundException('Олдсонгүй')
      }

      return {
        ok: true,
        data: exist
      }
    }
    catch (error) {
      throw new InternalServerErrorException('Алдааны мэдээлэл: ' + error.message)
    }
  }

  async update(mark: string, updatePostDto: UpdatePostDto) {

    try {
      const exist = await this.repo.findOneOrFail({ where: { mark } })

      if (!exist) {
        throw new NotFoundException('Олдсонгүй')
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
      throw new InternalServerErrorException('Алдааны мэдээлэл: ' + error.message)
    }
  }

  async remove(mark: string) {
    const delItem = await this.repo.delete(mark)
    if (delItem.affected === 0) {
      throw new NotFoundException('Олдсонгүй')
    }
    return {
      ok: true,
      data: delItem,
      message: 'Мэдээлэл устгагдлаа'
    }
  }
}

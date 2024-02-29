import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreatePageDto } from './dto/create-page.dto'
import { UpdatePageDto } from './dto/update-page.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Page } from './entities/page.entity'
import { Repository } from 'typeorm'
import { Language } from 'src/enum/language'

@Injectable()
export class PageService {

  constructor(@InjectRepository(Page) private repo: Repository<Page>) { }

  async create(createPageDto: CreatePageDto) {
    try {
      const data = await this.repo.save(createPageDto)

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

  async findAll(language: Language) {
    try {
      const records = await this.repo.find({ where: { language } })
      return {
        ok: true,
        data: records
      }
    } catch (error) {
      throw new NotFoundException('Мэдээлэл олдсонгүй: ' + error.message)
    }
  }

  async findByName(body: { language: Language, page: string }) {
    const exist = await this.repo.findOne({ where: { language: body.language, page: body.page } })

    if (!exist) {
      throw new NotFoundException('Олдсонгүй')
    }

    return {
      ok: true,
      data: exist
    }
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

  async update(mark: string, updatePageDto: UpdatePageDto) {
    try {
      const exist = await this.repo.findOneOrFail({ where: { mark } })

      if (!exist) {
        throw new NotFoundException('Олдсонгүй')
      }

      const updated = await this.repo.save({
        ...exist,
        ...updatePageDto
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

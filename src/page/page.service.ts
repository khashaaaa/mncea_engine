import { Injectable } from '@nestjs/common'
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
      const existingPage = await this.repo.findOne({ where: { page: createPageDto.page } })
      if (existingPage) {
        return {
          ok: false,
          message: 'Хуудас давхцаж байна'
        }
      }

      const record = await this.repo.save(createPageDto)

      return {
        ok: true,
        data: record,
        message: 'Хуудас нийтлэгдлээ'
      }
    } catch (error) {
      return {
        ok: false,
        message: error.message
      }
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
      return {
        ok: false,
        message: 'Мэдээлэл олдсонгүй'
      }
    }
  }

  async findByName(body: { language: Language, mark: string, subpage?: string }) {
    const exist = await this.repo.findOne({ where: { language: body.language, mark: body.mark, subpage: body.subpage ? body.subpage : '' } })

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

  async findOne(mark: string) {
    try {
      const exist = await this.repo.findOneOrFail({ where: { mark } })

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

  async update(mark: string, updatePageDto: UpdatePageDto) {
    try {
      const exist = await this.repo.findOneOrFail({ where: { mark } })

      if (!exist) {
        return {
          ok: false,
          message: 'Мэдээлэл олдсонгүй'
        }
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

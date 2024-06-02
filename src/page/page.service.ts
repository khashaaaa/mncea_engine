import { Injectable, Logger } from '@nestjs/common'
import { CreatePageDto } from './dto/create-page.dto'
import { UpdatePageDto } from './dto/update-page.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Page } from './entities/page.entity'
import { In, Repository } from 'typeorm'
import { Language } from 'src/enum/language'
import { Headcategory } from 'src/headcategory/entities/headcategory.entity'

@Injectable()
export class PageService {

  constructor(
    @InjectRepository(Page) private repo: Repository<Page>,
    @InjectRepository(Headcategory) private headRepo: Repository<Headcategory>
  ) { }

  private logger = new Logger(PageService.name)

  async create(createPageDto: CreatePageDto) {
    try {
      const record = await this.repo.save(createPageDto)

      return {
        ok: true,
        data: record,
        message: 'Хуудас нийтлэгдлээ'
      }
    } catch (error) {
      this.logger.error(error.message)
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
      this.logger.error(error.message)
      return {
        ok: false,
        message: 'Мэдээлэл олдсонгүй'
      }
    }
  }

  async findByName(body: { language: Language, mark: string, page?: string, subpage?: string, perPage: number, currentPage: number }) {

    try {
      const whereClause: any = {
        language: body.language
      }

      if (body.page && !body.subpage) {
        whereClause.slug = body.page
      } else if (body.subpage && !body.page) {
        whereClause.slug = body.subpage
      } else if (body.page && body.subpage) {
        whereClause.slug = In([body.page, body.subpage])
      }

      const menu = await this.headRepo.findOne({ where: whereClause })

      if (body.perPage && body.currentPage) {
        const record = await this.repo.find({
          where: { language: body.language, mark: body.mark, page: body.page ? body.page : '', subpage: body.subpage ? body.subpage : '' },
          take: body.perPage,
          skip: (body.currentPage - 1) * body.perPage
        })

        return {
          ok: true,
          data: record,
          grid: menu?.grid
        }
      } else {
        const record = await this.repo.find({
          where: { language: body.language, mark: body.mark, page: body.page ? body.page : '', subpage: body.subpage ? body.subpage : '' }
        })

        return {
          ok: true,
          data: record,
          grid: menu?.grid
        }
      }
    }
    catch (error) {
      this.logger.error(error.message)
      return {
        ok: false,
        message: error.message
      }
    }
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
      this.logger.error(error.message)
      return {
        ok: false,
        message: error.message
      }
    }
  }

  async update(mark: string, updatePageDto: UpdatePageDto) {
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
        ...updatePageDto
      })

      return {
        ok: true,
        data: updated,
        message: 'Мэдээлэл шинэчлэгдлээ'
      }
    }
    catch (error) {
      this.logger.error(error.message)
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

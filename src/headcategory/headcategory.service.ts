import { Injectable } from '@nestjs/common'
import { CreateHeadcategoryDto } from './dto/create-headcategory.dto'
import { UpdateHeadcategoryDto } from './dto/update-headcategory.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Headcategory } from './entities/headcategory.entity'
import { Repository } from 'typeorm'
import { Language } from 'src/enum/language'
import { Page } from 'src/page/entities/page.entity'

@Injectable()
export class HeadcategoryService {

  constructor(
    @InjectRepository(Headcategory) private repo: Repository<Headcategory>,
    @InjectRepository(Page) private pageRepo: Repository<Page>
  ) { }

  async create(createHeadcategoryDto: CreateHeadcategoryDto) {

    try {
      const record = await this.repo.save(createHeadcategoryDto)
      return {
        ok: true,
        data: record,
        message: 'Мэдээлэл нэмэгдлээ'
      }
    }
    catch (error) {
      return {
        ok: false,
        message: error.message
      }
    }
  }

  async findAll(language: Language) {
    const records = await this.repo.find({ where: { language }, order: { order: 'ASC' } })
    return {
      ok: true,
      data: records
    }
  }

  async findOne(mark: number) {
    try {
      const record = await this.repo.findOne({ where: { mark } })
      if (!record) {
        return {
          ok: false,
          message: 'Мэдээлэл олдсонгүй'
        }
      }

      return {
        ok: true,
        data: record
      }
    }
    catch (error) {
      return {
        ok: false,
        message: error.message
      }
    }
  }

  async update(mark: number, updateHeadcategoryDto: UpdateHeadcategoryDto) {

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
        ...updateHeadcategoryDto
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

  async remove(mark: any) {
    const headCategory = await this.repo.findOne({ where: { mark } })

    if (!headCategory) {
      return {
        ok: false,
        message: 'Мэдээлэл олдсонгүй'
      }
    }

    const delPages = await this.pageRepo.delete({ page: headCategory.name })

    await this.repo.remove(headCategory)

    return {
      ok: true,
      data: [headCategory, delPages],
      message: 'Мэдээлэл устгагдлаа'
    }
  }
}

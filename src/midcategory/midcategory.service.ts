import { Injectable } from '@nestjs/common'
import { CreateMidcategoryDto } from './dto/create-midcategory.dto'
import { UpdateMidcategoryDto } from './dto/update-midcategory.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Midcategory } from './entities/midcategory.entity'
import { Repository } from 'typeorm'
import { Language } from 'src/enum/language'

@Injectable()
export class MidcategoryService {

  constructor(@InjectRepository(Midcategory) private repo: Repository<Midcategory>) { }

  async create(createMidcategoryDto: CreateMidcategoryDto) {

    try {
      const lastRecord = await this.repo.find({
        order: { order: 'DESC' },
        take: 1
      })

      let nextIncrementValue = 1
      if (lastRecord.length > 0) {
        nextIncrementValue = lastRecord[0].order + 1
      }

      createMidcategoryDto.order = nextIncrementValue

      const data = await this.repo.save(createMidcategoryDto)

      return {
        ok: true,
        data,
        message: 'Цэс нэмэгдлээ'
      }
    } catch (error) {
      return {
        ok: false,
        message: error.message
      }
    }
  }

  async findAll(language: Language) {
    return await this.repo.find({ where: { language }, order: { order: 'ASC' } })
  }

  async findOne(mark: number) {

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

  async update(mark: number, updateMidcategoryDto: UpdateMidcategoryDto) {

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
        ...updateMidcategoryDto
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

  async remove(mark: number) {
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

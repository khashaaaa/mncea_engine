import { Injectable, Logger } from '@nestjs/common'
import { CreateSubcategoryDto } from './dto/create-subcategory.dto'
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Subcategory } from './entities/subcategory.entity'
import { Repository } from 'typeorm'
import { Language } from 'src/enum/language'

@Injectable()
export class SubcategoryService {

  constructor(@InjectRepository(Subcategory) private repo: Repository<Subcategory>) { }

  private logger = new Logger(SubcategoryService.name)

  async create(createSubcategoryDto: CreateSubcategoryDto) {

    try {
      const lastRecord = await this.repo.find({
        order: { order: 'DESC' },
        take: 1
      })

      let nextIncrementValue = 1
      if (lastRecord.length > 0) {
        nextIncrementValue = lastRecord[0].order + 1
      }

      createSubcategoryDto.order = nextIncrementValue

      const data = await this.repo.save(createSubcategoryDto)

      return {
        ok: true,
        data,
        message: 'Цэс нэмэгдлээ'
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
      this.logger.error(error.message)
      return {
        ok: false,
        message: error.message
      }
    }
  }

  async update(mark: number, updateSubcategoryDto: UpdateSubcategoryDto) {

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
        ...updateSubcategoryDto
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

import { Injectable, Logger } from '@nestjs/common'
import { CreateMidcategoryDto } from './dto/create-midcategory.dto'
import { UpdateMidcategoryDto } from './dto/update-midcategory.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Midcategory } from './entities/midcategory.entity'
import { Repository } from 'typeorm'
import { Language } from 'src/enum/language'
import { Subcategory } from 'src/subcategory/entities/subcategory.entity'

@Injectable()
export class MidcategoryService {

  constructor(
    @InjectRepository(Midcategory) private midCategoryRepo: Repository<Midcategory>,
    @InjectRepository(Subcategory) private subCategoryRepo: Repository<Subcategory>
  ) { }

  private logger = new Logger(MidcategoryService.name)

  async create(createMidcategoryDto: CreateMidcategoryDto) {

    try {
      const lastRecord = await this.midCategoryRepo.find({
        order: { order: 'DESC' },
        take: 1
      })

      let nextIncrementValue = 1
      if (lastRecord.length > 0) {
        nextIncrementValue = lastRecord[0].order + 1
      }

      createMidcategoryDto.order = nextIncrementValue

      const data = await this.midCategoryRepo.save(createMidcategoryDto)

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
    return await this.midCategoryRepo.find({ where: { language }, order: { order: 'ASC' } })
  }

  async findOne(mark: number) {

    try {
      const exist = await this.midCategoryRepo.findOne({ where: { mark } })

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

  async update(mark: number, updateMidcategoryDto: UpdateMidcategoryDto) {

    try {
      const exist = await this.midCategoryRepo.findOne({ where: { mark } })

      if (!exist) {
        return {
          ok: false,
          message: 'Мэдээлэл олдсонгүй'
        }
      }

      const updated = await this.midCategoryRepo.save({
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
      this.logger.error(error.message)
      return {
        ok: false,
        message: error.message
      }
    }
  }

  async remove(mark: number) {
    await this.subCategoryRepo.delete({ parent: mark })
    const delItem = await this.midCategoryRepo.delete(mark)

    if (delItem.affected === 0) {
      return {
        ok: false,
        message: 'Мэдээлэл олдсонгүй'
      }
    }

    return {
      ok: true,
      message: 'Мэдээлэл устгагдлаа'
    }
  }
}

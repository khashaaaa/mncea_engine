import { Injectable, Logger } from '@nestjs/common'
import { CreateBasecategoryDto } from './dto/create-basecategory.dto'
import { UpdateBasecategoryDto } from './dto/update-basecategory.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Basecategory } from './entities/basecategory.entity'
import { In, Repository } from 'typeorm'
import { Language } from 'src/enum/language'
import { Midcategory } from 'src/midcategory/entities/midcategory.entity'
import { Subcategory } from 'src/subcategory/entities/subcategory.entity'

@Injectable()
export class BasecategoryService {

  constructor(
    @InjectRepository(Basecategory) private baseCategoryRepo: Repository<Basecategory>,
    @InjectRepository(Midcategory) private midCategoryRepo: Repository<Midcategory>,
    @InjectRepository(Subcategory) private subCategoryRepo: Repository<Subcategory>
  ) { }

  private logger = new Logger(BasecategoryService.name)

  async create(createBasecategoryDto: CreateBasecategoryDto) {
    try {
      const lastRecord = await this.baseCategoryRepo.find({
        order: { order: 'DESC' },
        take: 1
      })

      let nextIncrementValue = 1

      if (lastRecord.length > 0) {
        nextIncrementValue = lastRecord[0].order + 1
      }

      createBasecategoryDto.order = nextIncrementValue

      const data = await this.baseCategoryRepo.save(createBasecategoryDto)

      return {
        ok: true,
        data,
        message: 'Үндсэн цэс нэмэгдлээ'
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
    return await this.baseCategoryRepo.find({ where: { language }, order: { order: 'ASC' } })
  }

  async findOne(mark: number) {

    try {
      const exist = await this.baseCategoryRepo.findOne({ where: { mark } })
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

  async update(mark: number, updateBasecategoryDto: UpdateBasecategoryDto) {

    try {
      const exist = await this.baseCategoryRepo.findOne({ where: { mark } })

      if (!exist) {
        return {
          ok: false,
          message: 'Мэдээлэл олдсонгүй'
        }
      }

      const updated = await this.baseCategoryRepo.save({
        ...exist,
        ...updateBasecategoryDto
      })

      return {
        ok: true,
        data: updated,
        message: 'Мэдээлэл шинэчлэлгдлээ'
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
    const midcategories = await this.midCategoryRepo.find({ where: { parent: mark } })
    const midcategoryIds = midcategories.map(mid => mid.mark)

    await this.subCategoryRepo.delete({ parent: In(midcategoryIds) })

    await this.midCategoryRepo.delete({ parent: mark })

    const delItem = await this.baseCategoryRepo.delete(mark)

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

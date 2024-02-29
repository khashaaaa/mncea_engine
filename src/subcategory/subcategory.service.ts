import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreateSubcategoryDto } from './dto/create-subcategory.dto'
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Subcategory } from './entities/subcategory.entity'
import { Repository } from 'typeorm'
import { Language } from 'src/enum/language'

@Injectable()
export class SubcategoryService {

  constructor(@InjectRepository(Subcategory) private repo: Repository<Subcategory>) { }

  async create(createSubcategoryDto: CreateSubcategoryDto) {

    try {
      const data = await this.repo.save(createSubcategoryDto)

      return {
        ok: true,
        data,
        message: 'Дэд цэс нэмэгдлээ'
      }
    }
    catch (error) {
      throw new InternalServerErrorException('Алдааны мэдээлэл', error.message)
    }
  }

  async findAll(language: Language) {
    return await this.repo.find({ where: { language } })
  }

  async findOne(mark: number) {

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
      throw new InternalServerErrorException('Алдааны мэдээлэл: ', error.message)
    }
  }

  async update(mark: number, updateSubcategoryDto: UpdateSubcategoryDto) {

    try {
      const exist = await this.repo.findOneOrFail({ where: { mark } })

      if (!exist) {
        throw new NotFoundException('Олдсонгүй')
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
      throw new InternalServerErrorException('Алдааны мэдээлэл: ' + error.message)
    }
  }

  async remove(mark: number) {
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

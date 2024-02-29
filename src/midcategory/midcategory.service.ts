import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
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
      const data = await this.repo.save(createMidcategoryDto)
      return {
        ok: true,
        data,
        message: 'Цэс нэмэгдлээ'
      }
    }
    catch (error) {
      throw new InternalServerErrorException('Алдааны мэдээлэл: ' + error.message)
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
      throw new InternalServerErrorException('' + error.message)
    }
  }

  async update(mark: number, updateMidcategoryDto: UpdateMidcategoryDto) {

    try {
      const exist = await this.repo.findOneOrFail({ where: { mark } })

      if (!exist) {
        throw new NotFoundException('Олдсонгүй')
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
      throw new InternalServerErrorException('' + error.message)
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

import { Injectable } from '@nestjs/common'
import { CreateBasecategoryDto } from './dto/create-basecategory.dto'
import { UpdateBasecategoryDto } from './dto/update-basecategory.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Basecategory } from './entities/basecategory.entity'
import { Repository } from 'typeorm'
import { Language } from 'src/enum/language'

@Injectable()
export class BasecategoryService {

  constructor(@InjectRepository(Basecategory) private repo: Repository<Basecategory>) { }

  async create(createBasecategoryDto: CreateBasecategoryDto) {

    try {
      const data = await this.repo.save(createBasecategoryDto)
      return {
        ok: true,
        data,
        message: 'Үндсэн цэс нэмэгдлээ'
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
    return await this.repo.find({ where: { language } })
  }

  async findOne(mark: number) {

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

  async update(mark: number, updateBasecategoryDto: UpdateBasecategoryDto) {

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
        ...updateBasecategoryDto
      })

      return {
        ok: true,
        data: updated,
        message: 'Мэдээлэл шинэчлэлгдлээ'
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

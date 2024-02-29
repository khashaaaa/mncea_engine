import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreateHeadcategoryDto } from './dto/create-headcategory.dto'
import { UpdateHeadcategoryDto } from './dto/update-headcategory.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Headcategory } from './entities/headcategory.entity'
import { Repository } from 'typeorm'

@Injectable()
export class HeadcategoryService {

  constructor(@InjectRepository(Headcategory) private repo: Repository<Headcategory>) { }

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
      throw new InternalServerErrorException(error.message)
    }
  }

  async findAll() {
    const records = await this.repo.find()
    return {
      ok: true,
      data: records
    }
  }

  async findOne(mark: number) {
    try {
      const record = await this.repo.findOneOrFail({ where: { mark } })
      if (!record) {
        throw new NotFoundException('Илэрц байхгүй байна')
      }

      return {
        ok: true,
        data: record
      }
    }
    catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  async update(mark: number, updateHeadcategoryDto: UpdateHeadcategoryDto) {

    try {

      const exist = await this.repo.findOneOrFail({ where: { mark } })

      if (!exist) {
        throw new NotFoundException('Мэдээлэл олдсонгүй')
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

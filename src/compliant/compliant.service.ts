import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreateCompliantDto } from './dto/create-compliant.dto'
import { UpdateCompliantDto } from './dto/update-compliant.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Compliant } from './entities/compliant.entity'
import { Repository } from 'typeorm'

@Injectable()
export class CompliantService {

  constructor(@InjectRepository(Compliant) private repo: Repository<Compliant>) { }

  async create(createCompliantDto: CreateCompliantDto) {
    const record = await this.repo.save(createCompliantDto)
    return {
      ok: true,
      data: record,
      message: 'Таны хүсэлт амжилттай илгээгдлээ'
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
    const record = await this.findOne(mark)
    return {
      ok: true,
      data: record
    }
  }

  async update(mark: number, updateCompliantDto: UpdateCompliantDto) {
    try {
      const exist = await this.repo.findOneOrFail({ where: { mark } })

      if (!exist) {
        throw new NotFoundException('Олдсонгүй')
      }

      const updated = await this.repo.save({
        ...exist,
        ...updateCompliantDto
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

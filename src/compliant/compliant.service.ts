import { Injectable } from '@nestjs/common'
import { CreateCompliantDto } from './dto/create-compliant.dto'
import { UpdateCompliantDto } from './dto/update-compliant.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Compliant } from './entities/compliant.entity'
import { Repository } from 'typeorm'

@Injectable()
export class CompliantService {

  constructor(@InjectRepository(Compliant) private repo: Repository<Compliant>) { }

  async create(createCompliantDto: CreateCompliantDto) {

    try {
      const record = await this.repo.save(createCompliantDto)
      return {
        ok: true,
        data: record,
        message: 'Таны хүсэлт амжилттай илгээгдлээ'
      }
    }
    catch (error) {
      return {
        ok: false,
        message: error.message
      }
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
      const exist = await this.repo.findOne({ where: { mark } })

      if (!exist) {
        return {
          ok: false,
          message: 'Мэдээлэл олдсонгүй'
        }
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

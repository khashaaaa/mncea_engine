import { Injectable } from '@nestjs/common'
import { CreatePartnershipDto } from './dto/create-partnership.dto'
import { UpdatePartnershipDto } from './dto/update-partnership.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Partnership } from './entities/partnership.entity'
import { Repository } from 'typeorm'

@Injectable()
export class PartnershipService {

  constructor(@InjectRepository(Partnership) private repo: Repository<Partnership>) { }

  async create(createPartnershipDto: CreatePartnershipDto) {

    try {
      const record = await this.repo.save(createPartnershipDto)
      return {
        ok: true,
        data: record,
        message: 'Хамтрагч байгууллага нэмэгдлээ'
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

    try {
      const records = await this.repo.find()
      return {
        ok: true,
        data: records
      }
    }
    catch (error) {
      return {
        ok: false,
        message: error.message
      }
    }
  }

  async findOne(mark: string) {

    try {
      const record = await this.repo.findOne({ where: { mark } })

      if (!record) {
        return {
          ok: false,
          message: 'Мэдээлэл олдсонгүй'
        }
      }
      return {
        ok: true,
        data: record
      }
    }
    catch (error) {
      return {
        ok: false,
        message: error.message
      }
    }
  }

  async update(mark: string, updatePartnershipDto: UpdatePartnershipDto) {

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
        ...updatePartnershipDto
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

  async remove(mark: string) {
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

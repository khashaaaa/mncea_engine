import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
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
      throw new InternalServerErrorException('Алдааны мэдээлэл: ' + error.message)
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
      throw new InternalServerErrorException('Алдааны мэдээлэл: ' + error.message)
    }
  }

  async findOne(mark: string) {

    try {
      const record = await this.repo.findOneOrFail({ where: { mark } })

      if (!record) {
        throw new NotFoundException('Мэдээлэл олдсонгүй')
      }
      return {
        ok: true,
        data: record
      }
    }
    catch (error) {
      throw new InternalServerErrorException('Алдааны мэдээлэл: ' + error.message)
    }
  }

  async update(mark: string, updatePartnershipDto: UpdatePartnershipDto) {

    try {

      const exist = await this.repo.findOneOrFail({ where: { mark } })

      if (!exist) {
        throw new NotFoundException('Мэдээлэл олдсонгүй')
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
      throw new InternalServerErrorException('Алдааны мэдээлэл: ' + error.message)
    }
  }

  async remove(mark: string) {
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

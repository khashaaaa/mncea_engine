import { Injectable, Logger } from '@nestjs/common'
import { CreateDatatableDto } from './dto/create-datatable.dto'
import { UpdateDatatableDto } from './dto/update-datatable.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Datatable } from './entities/datatable.entity'
import { Repository } from 'typeorm'
import { Language } from 'src/enum/language'

@Injectable()
export class DatatableService {

  constructor(@InjectRepository(Datatable) private repo: Repository<Datatable>) { }

  private logger = new Logger(DatatableService.name)

  async create(createDatatableDto: CreateDatatableDto) {

    try {
      const record = await this.repo.save(createDatatableDto)

      return {
        ok: true,
        data: record,
        message: 'Амжилттай нэмэгдлээ'
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

  async findAll(language: Language) {
    const records = await this.repo.find({ where: { language } })

    return {
      ok: true,
      data: records
    }
  }

  async findOne(mark: number) {

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
      this.logger.error(error.message)
      return {
        ok: false,
        message: error.message
      }
    }
  }

  async update(mark: number, updateDatatableDto: UpdateDatatableDto) {

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
        ...updateDatatableDto
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

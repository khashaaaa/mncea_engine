import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreateSocialDto } from './dto/create-social.dto'
import { UpdateSocialDto } from './dto/update-social.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Social } from './entities/social.entity'
import { Repository } from 'typeorm'

@Injectable()
export class SocialService {

  constructor(@InjectRepository(Social) private repo: Repository<Social>) { }

  async create(createSocialDto: CreateSocialDto) {
    try {
      const record = await this.repo.save(createSocialDto)

      return {
        ok: true,
        data: record,
        message: 'Сошл хаяг нэмэгдлээ'
      }
    }
    catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  async findAll() {
    const record = await this.repo.find()
    return {
      ok: true,
      data: record
    }
  }

  async findOne(mark: number) {

    try {
      const exist = await this.repo.findOneOrFail({ where: { mark } })

      if (!exist) {
        throw new NotFoundException('Мэдээлэл олдсонгүй')
      }

      return {
        ok: true,
        data: exist
      }
    }
    catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  async update(mark: number, updateSocialDto: UpdateSocialDto) {

    try {
      const exist = await this.repo.findOneOrFail({ where: { mark } })

      if (!exist) {
        throw new NotFoundException('Мэдээлэл олдсонгүй')
      }

      const updated = await this.repo.save({
        ...exist,
        ...updateSocialDto
      })

      return {
        ok: true,
        data: updated,
        message: 'Мэдээлэл шинэчлэгдлээ'
      }
    }
    catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  async remove(mark: number) {
    const delItem = await this.repo.delete(mark)
    if (delItem.affected === 0) {
      throw new NotFoundException('Мэдээлэл олдсонгүй')
    }
    return {
      ok: true,
      data: delItem,
      message: 'Мэдээлэл устгагдлаа'
    }
  }
}

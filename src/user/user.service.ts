import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { Repository } from 'typeorm'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>, private jwts: JwtService) { }

  async login(createUserDto: CreateUserDto) {
    const user = await this.repo.findOne({
      where: { username: createUserDto.username, password: createUserDto.password },
    })

    if (!user) {
      return {
        ok: false,
        message: 'Хэрэглэгч олдсонгүй'
      }
    }

    const access_token = await this.jwts.signAsync(
      { username: createUserDto.username, password: createUserDto.password },
      { secret: process.env.JWT_SECRET }
    )

    return {
      ok: true,
      data: user,
      access_token,
      message: 'Амжилттай нэвтэрлээ',
    }
  }

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.repo.findOne({
      where: [
        { username: createUserDto.username },
        { mobile: createUserDto.mobile },
      ],
    })

    if (existingUser) {
      return {
        ok: false,
        message: 'Хэрэглэгч бүртгэгдсэн байна'
      }
    }

    try {
      const user = await this.repo.save(createUserDto)
      return {
        ok: true,
        data: user,
        message: 'Хэрэглэгч үүслээ',
      }
    } catch (error) {
      return {
        ok: false,
        message: error.message
      }
    }
  }

  async findAll() {
    return await this.repo.find()
  }

  async findOne(mark: string) {
    try {
      const user = await this.repo.findOneOrFail({ where: { mark } })

      return {
        ok: true,
        data: user,
      }
    } catch (error) {
      return {
        ok: false,
        message: error.message
      }
    }
  }

  async update(mark: string, updateUserDto: UpdateUserDto) {
    try {
      const exist = await this.repo.findOneOrFail({ where: { mark } })

      if (!exist) {
        return {
          ok: false,
          message: 'Хэрэглэгч олдсонгүй'
        }
      }

      const updated = await this.repo.save({
        ...exist,
        ...updateUserDto,
      })

      return {
        ok: true,
        data: updated,
        message: 'Хэрэглэгчийн мэдээлэл шинэчлэгдлээ',
      }
    } catch (error) {
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
        message: 'Хэрэглэгч олдсонгүй'
      }
    }
    return {
      ok: true,
      data: delItem,
      message: 'Хэрэглэгч устгагдлаа',
    }
  }
}


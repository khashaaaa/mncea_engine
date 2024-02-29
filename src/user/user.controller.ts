import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipe, FileTypeValidator, BadRequestException, Res, UseGuards, NotFoundException, InternalServerErrorException } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { JwtAuthGuard } from 'src/auth/auth.guard'
import * as sharp from 'sharp'
import * as fs from 'fs/promises'
import * as path from 'path'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('login')
  async login(@Body() createUserDto: CreateUserDto) {
    return await this.userService.login(createUserDto)
  }

  @Post('avatar')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'public/avatar',
        filename: (req, file, cb) => {
          cb(null, file.originalname)
        },
      }),
    }),
  )
  async upload(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: /\.(jpg|jpeg|png|webp)$/ })]
      })
    ) file: Express.Multer.File) {
    try {
      const webpBuffer = await sharp(file.buffer).webp().toBuffer()

      return {
        ok: true,
        data: webpBuffer,
        message: 'Зураг амжилттай хуулагдлаа',
      }
    } catch (error) {
      throw new BadRequestException('Алдааны мэдээлэл: ' + error.message)
    }
  }

  @Get('avatar/:avatar')
  async serveImage(@Param('avatar') filename: string, @Res() res: any) {

    try {

      const imagePath = path.join(__dirname, '../../../public/avatar', filename)
      await fs.access(imagePath)
      return await res.sendFile(imagePath)

    }
    catch (error) {
      if (error.code === 'ENOENT') {
        throw new NotFoundException('Зураг олдсонгүй')
      } else {
        throw new InternalServerErrorException('Алдааны мэдээлэл: ' + error.message)
      }
    }
  }

  @Post('sweep')
  async sweepImage(@Body() data: any) {
    const { avatar } = data

    try {
      const imgPath = path.join(__dirname, '../../../public/avatar', avatar)
      await fs.unlink(imgPath)
      return {
        ok: true,
        message: 'Зураг устгагдлаа'
      }
    } catch (error) {
      throw new InternalServerErrorException('Зураг утсгах явцад алдаа гарлаа: ' + error.message)
    }
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto)
  }

  @Get()
  async findAll() {
    return await this.userService.findAll()
  }

  @Get(':mark')
  async findOne(@Param('mark') mark: string) {
    return await this.userService.findOne(mark)
  }

  @Patch(':mark')
  @UseGuards(JwtAuthGuard)
  async update(@Param('mark') mark: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(mark, updateUserDto)
  }

  @Delete(':mark')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('mark') mark: string) {
    return await this.userService.remove(mark)
  }
}


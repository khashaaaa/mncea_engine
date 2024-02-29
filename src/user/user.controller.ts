import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipe, FileTypeValidator, BadRequestException, Res } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
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
        validators: [new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' })],
      }),
    ) file: Express.Multer.File,
  ) {
    try {
      return {
        ok: true,
        file,
        message: 'Зураг амжилттай хуулагдлаа',
      }
    } catch (error) {
      throw new BadRequestException('Алдааны мэдээлэл: ' + error.message)
    }
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto)
  }

  @Get('avatar/:avatar')
  serveImage(@Param('avatar') filename: string, @Res() res: any) {
    const imagePath = path.join(__dirname, '../../../public/avatar', filename)
    return res.sendFile(imagePath)
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
  async update(@Param('mark') mark: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(mark, updateUserDto)
  }

  @Delete(':mark')
  async remove(@Param('mark') mark: string) {
    return await this.userService.remove(mark)
  }
}


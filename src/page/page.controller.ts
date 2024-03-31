import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, UseInterceptors, UploadedFile, Res } from '@nestjs/common'
import { PageService } from './page.service'
import { CreatePageDto } from './dto/create-page.dto'
import { UpdatePageDto } from './dto/update-page.dto'
import { Language } from 'src/enum/language'
import { JwtAuthGuard } from 'src/auth/auth.guard'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import * as path from 'path'
import * as fs from 'fs'

@Controller('page')
export class PageController {
  constructor(private readonly pageService: PageService) { }

  @Post('thumbnail')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: 'public/page',
      filename: (req, file, cb) => {
        cb(null, file.originalname)
      },
    }),
  }))
  async upload(@UploadedFile() file: Express.Multer.File) {

    if (file) {
      return {
        ok: true,
        data: file.originalname,
        message: 'Зураг амжилттай хуулагдлаа'
      }
    }
    else {
      return {
        ok: false,
        message: 'Зураг хоосон байна'
      }
    }
  }

  @Get('thumbnail/:thumbnail')
  async serveImage(@Param('thumbnail') filename: string, @Res() res: any) {

    try {

      const imagePath = path.join(__dirname, '../../../public/page', filename)

      fs.accessSync(imagePath)

      return res.sendFile(imagePath)

    } catch (error) {

      if (error.code === 'ENOENT') {

        return {
          ok: false,
          message: 'Зураг олдсонгүй'
        }

      } else {

        return {
          ok: false,
          message: error.message
        }
      }
    }
  }

  @Post('sweep')
  async sweepImage(@Body() data: any) {
    const { thumbnail } = data

    try {
      const imgPath = path.join(__dirname, '../../../public/page', thumbnail)

      if (fs.existsSync(imgPath)) {
        fs.unlinkSync(imgPath)
        return {
          ok: true,
          message: 'Зураг устгагдлаа'
        }
      }
      else {
        return {
          ok: true,
          message: 'Зураг хэдийн устгагдсан байна'
        }
      }

    } catch (error) {

      return {
        ok: false,
        message: `Зураг устгах үед алдаа гарлаа: ${error.message}`
      }
    }
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createPageDto: CreatePageDto) {
    return await this.pageService.create(createPageDto)
  }

  @Get()
  async findAll(@Query('language') language: Language) {
    return await this.pageService.findAll(language)
  }

  @Post('name')
  async findByName(@Body() body: any) {
    return await this.pageService.findByName(body)
  }

  @Get(':mark')
  async findOne(@Param('mark') mark: string) {
    return await this.pageService.findOne(mark)
  }

  @Patch(':mark')
  @UseGuards(JwtAuthGuard)
  async update(@Param('mark') mark: string, @Body() updatePageDto: UpdatePageDto) {
    return await this.pageService.update(mark, updatePageDto)
  }

  @Delete(':mark')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('mark') mark: string) {
    return await this.pageService.remove(mark)
  }
}

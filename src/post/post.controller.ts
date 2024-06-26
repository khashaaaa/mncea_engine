import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, Res, Query, UseGuards } from '@nestjs/common'
import { PostService } from './post.service'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { Language } from '../enum/language'
import { JwtAuthGuard } from 'src/auth/auth.guard'
import * as path from 'path'
import * as fs from 'fs'

@Controller('post')
export class PostController {

  constructor(private readonly postService: PostService) { }

  @Post('thumbnail')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: 'public/post',
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

      const imagePath = path.join(__dirname, '../../../public/post', filename)

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
      const imgPath = path.join(__dirname, '../../../public/post', thumbnail)

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
  async create(@Body() createPostDto: CreatePostDto) {
    return await this.postService.create(createPostDto)
  }

  @Post('priority')
  async findByPriority(@Body() body: any) {
    return await this.postService.findByPriority(body)
  }

  @Get()
  async findAll(@Query('language') language: Language) {
    return await this.postService.findAll(language)
  }

  @Get('regular')
  async findAllRegular(@Query('language') language: Language) {
    return await this.postService.findAllRegular(language)
  }

  @Post('base')
  async findBase(@Body() body: any) {
    return await this.postService.findBase(body)
  }

  @Post('mid')
  async findMid(@Body() body: any) {
    return await this.postService.findMid(body)
  }

  @Post('sub')
  async findSub(@Body() body: any) {
    return await this.postService.findSub(body)
  }

  @Post('single')
  async findOne(@Body() body: any) {
    return await this.postService.findOne(body)
  }

  @Patch(':mark/edit')
  @UseGuards(JwtAuthGuard)
  async update(@Param('mark') mark: string, @Body() updatePostDto: UpdatePostDto) {
    return await this.postService.update(mark, updatePostDto)
  }

  @Delete(':mark/delete')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('mark') mark: string) {
    return await this.postService.remove(mark)
  }
}

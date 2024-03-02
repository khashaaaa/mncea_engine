import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipe, FileTypeValidator, BadRequestException, Res, NotFoundException, InternalServerErrorException } from '@nestjs/common'
import { PartnershipService } from './partnership.service'
import { CreatePartnershipDto } from './dto/create-partnership.dto'
import { UpdatePartnershipDto } from './dto/update-partnership.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import * as path from 'path'
import * as fs from 'fs/promises'

@Controller('partnership')
export class PartnershipController {

  constructor(private readonly partnershipService: PartnershipService) { }

  @Post('logo')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: 'public/partnership',
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

  @Get('/logo/:logo')
  serveImage(@Param('logo') logo: string, @Res() res: any) {
    try {
      const imagePath = path.join(__dirname, '../../../public/partnership', logo)
      return res.sendFile(imagePath)
    } catch (error) {
      throw new NotFoundException('Зураг олдсонгүй')
    }
  }

  @Post('sweep')
  async sweepImage(@Body() data: any) {
    const { logo } = data

    try {
      const imgPath = path.join(__dirname, '../../../public/partnership', logo)
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
  async create(@Body() createPartnershipDto: CreatePartnershipDto) {
    return await this.partnershipService.create(createPartnershipDto)
  }

  @Get()
  async findAll() {
    return await this.partnershipService.findAll()
  }

  @Get(':mark')
  async findOne(@Param('mark') mark: string) {
    return await this.partnershipService.findOne(mark)
  }

  @Patch(':mark')
  async update(@Param('mark') mark: string, @Body() updatePartnershipDto: UpdatePartnershipDto) {
    return await this.partnershipService.update(mark, updatePartnershipDto)
  }

  @Delete(':mark/delete')
  async remove(@Param('mark') mark: string) {
    return await this.partnershipService.remove(mark)
  }
}

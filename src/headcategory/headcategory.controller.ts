import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common'
import { HeadcategoryService } from './headcategory.service'
import { CreateHeadcategoryDto } from './dto/create-headcategory.dto'
import { UpdateHeadcategoryDto } from './dto/update-headcategory.dto'
import { JwtAuthGuard } from 'src/auth/auth.guard'
import { Language } from 'src/enum/language'

@Controller('headcategory')
export class HeadcategoryController {
  constructor(private readonly headcategoryService: HeadcategoryService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createHeadcategoryDto: CreateHeadcategoryDto) {
    return await this.headcategoryService.create(createHeadcategoryDto)
  }

  @Get()
  async findAll(@Query('language') language: Language) {
    return await this.headcategoryService.findAll(language)
  }

  @Get(':mark')
  async findOne(@Param('mark') mark: number) {
    return await this.headcategoryService.findOne(mark)
  }

  @Patch(':mark')
  @UseGuards(JwtAuthGuard)
  async update(@Param('mark') mark: number, @Body() updateHeadcategoryDto: UpdateHeadcategoryDto) {
    return await this.headcategoryService.update(mark, updateHeadcategoryDto)
  }

  @Delete(':mark')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('mark') mark: number) {
    return await this.headcategoryService.remove(mark)
  }
}

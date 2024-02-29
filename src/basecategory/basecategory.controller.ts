import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common'
import { BasecategoryService } from './basecategory.service'
import { CreateBasecategoryDto } from './dto/create-basecategory.dto'
import { UpdateBasecategoryDto } from './dto/update-basecategory.dto'
import { JwtAuthGuard } from 'src/auth/auth.guard'
import { Language } from 'src/enum/language'

@Controller('basecategory')
export class BasecategoryController {
  constructor(private readonly basecategoryService: BasecategoryService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createBasecategoryDto: CreateBasecategoryDto) {
    return await this.basecategoryService.create(createBasecategoryDto)
  }

  @Get()
  async findAll(@Query('language') language: Language) {
    return await this.basecategoryService.findAll(language)
  }

  @Get(':mark')
  async findOne(@Param('mark') mark: number) {
    return await this.basecategoryService.findOne(mark)
  }

  @Patch(':mark')
  @UseGuards(JwtAuthGuard)
  async update(@Param('mark') mark: number, @Body() updateBasecategoryDto: UpdateBasecategoryDto) {
    return await this.basecategoryService.update(mark, updateBasecategoryDto)
  }

  @Delete(':mark')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('mark') mark: number) {
    return await this.basecategoryService.remove(mark)
  }
}

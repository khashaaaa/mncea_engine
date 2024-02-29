import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common'
import { SubcategoryService } from './subcategory.service'
import { CreateSubcategoryDto } from './dto/create-subcategory.dto'
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto'
import { JwtAuthGuard } from 'src/auth/auth.guard'
import { Language } from 'src/enum/language'

@Controller('subcategory')
export class SubcategoryController {
  constructor(private readonly subcategoryService: SubcategoryService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createSubcategoryDto: CreateSubcategoryDto) {
    return await this.subcategoryService.create(createSubcategoryDto)
  }

  @Get()
  async findAll(@Query('language') language: Language) {
    return await this.subcategoryService.findAll(language)
  }

  @Get(':mark')
  async findOne(@Param('mark') mark: number) {
    return await this.subcategoryService.findOne(mark)
  }

  @Patch(':mark')
  @UseGuards(JwtAuthGuard)
  async update(@Param('mark') mark: number, @Body() updateSubcategoryDto: UpdateSubcategoryDto) {
    return this.subcategoryService.update(mark, updateSubcategoryDto)
  }

  @Delete(':mark')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('mark') mark: number) {
    return await this.subcategoryService.remove(mark)
  }
}

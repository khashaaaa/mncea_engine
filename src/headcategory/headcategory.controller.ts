import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { HeadcategoryService } from './headcategory.service'
import { CreateHeadcategoryDto } from './dto/create-headcategory.dto'
import { UpdateHeadcategoryDto } from './dto/update-headcategory.dto'

@Controller('headcategory')
export class HeadcategoryController {
  constructor(private readonly headcategoryService: HeadcategoryService) { }

  @Post()
  async create(@Body() createHeadcategoryDto: CreateHeadcategoryDto) {
    return await this.headcategoryService.create(createHeadcategoryDto)
  }

  @Get()
  async findAll() {
    return await this.headcategoryService.findAll()
  }

  @Get(':mark')
  async findOne(@Param('mark') mark: number) {
    return await this.headcategoryService.findOne(mark)
  }

  @Patch(':mark')
  async update(@Param('mark') mark: number, @Body() updateHeadcategoryDto: UpdateHeadcategoryDto) {
    return await this.headcategoryService.update(mark, updateHeadcategoryDto)
  }

  @Delete(':mark')
  async remove(@Param('mark') mark: number) {
    return await this.headcategoryService.remove(mark)
  }
}

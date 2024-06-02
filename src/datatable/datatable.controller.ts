import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common'
import { DatatableService } from './datatable.service'
import { CreateDatatableDto } from './dto/create-datatable.dto'
import { UpdateDatatableDto } from './dto/update-datatable.dto'
import { Language } from 'src/enum/language'

@Controller('datatable')
export class DatatableController {
  constructor(private readonly datatableService: DatatableService) { }

  @Post()
  async create(@Body() createDatatableDto: CreateDatatableDto) {
    return await this.datatableService.create(createDatatableDto)
  }

  @Get()
  async findAll(@Query('language') language: Language) {
    return await this.datatableService.findAll(language)
  }

  @Get(':mark')
  async findOne(@Param('mark') mark: number) {
    return await this.datatableService.findOne(mark)
  }

  @Patch(':mark')
  async update(@Param('mark') mark: number, @Body() updateDatatableDto: UpdateDatatableDto) {
    return await this.datatableService.update(mark, updateDatatableDto)
  }

  @Delete(':mark')
  async remove(@Param('mark') mark: number) {
    return await this.datatableService.remove(mark)
  }
}

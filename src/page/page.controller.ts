import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common'
import { PageService } from './page.service'
import { CreatePageDto } from './dto/create-page.dto'
import { UpdatePageDto } from './dto/update-page.dto'
import { Language } from 'src/enum/language'
import { JwtAuthGuard } from 'src/auth/auth.guard'

@Controller('page')
export class PageController {
  constructor(private readonly pageService: PageService) { }

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

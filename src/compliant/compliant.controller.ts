import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { CompliantService } from './compliant.service'
import { CreateCompliantDto } from './dto/create-compliant.dto'
import { UpdateCompliantDto } from './dto/update-compliant.dto'

@Controller('compliant')
export class CompliantController {
  constructor(private readonly compliantService: CompliantService) { }

  @Post()
  async create(@Body() createCompliantDto: CreateCompliantDto) {
    return await this.compliantService.create(createCompliantDto)
  }

  @Get()
  async findAll() {
    return await this.compliantService.findAll()
  }

  @Get(':mark')
  async findOne(@Param('mark') mark: number) {
    return await this.compliantService.findOne(mark)
  }

  @Patch(':mark')
  async update(@Param('mark') mark: number, @Body() updateCompliantDto: UpdateCompliantDto) {
    return await this.compliantService.update(mark, updateCompliantDto)
  }

  @Delete(':mark')
  async remove(@Param('mark') mark: number) {
    return await this.compliantService.remove(mark)
  }
}

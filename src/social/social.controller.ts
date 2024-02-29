import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { SocialService } from './social.service'
import { CreateSocialDto } from './dto/create-social.dto'
import { UpdateSocialDto } from './dto/update-social.dto'

@Controller('social')
export class SocialController {

  constructor(private readonly socialService: SocialService) { }

  @Post()
  async create(@Body() createSocialDto: CreateSocialDto) {
    return await this.socialService.create(createSocialDto)
  }

  @Get()
  async findAll() {
    return await this.socialService.findAll()
  }

  @Get(':mark')
  async findOne(@Param('mark') mark: number) {
    return await this.socialService.findOne(mark)
  }

  @Patch(':mark')
  async update(@Param('mark') mark: number, @Body() updateSocialDto: UpdateSocialDto) {
    return await this.socialService.update(mark, updateSocialDto)
  }

  @Delete(':mark')
  async remove(@Param('mark') mark: number) {
    return await this.socialService.remove(mark)
  }
}

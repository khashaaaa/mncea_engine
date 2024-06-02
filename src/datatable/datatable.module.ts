import { Module } from '@nestjs/common'
import { DatatableService } from './datatable.service'
import { DatatableController } from './datatable.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Datatable } from './entities/datatable.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Datatable])
  ],
  controllers: [DatatableController],
  providers: [DatatableService],
})
export class DatatableModule { }

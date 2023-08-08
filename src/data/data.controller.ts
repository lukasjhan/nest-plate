import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { DataService } from './data.service';
import { CreateDataDTO } from './dto/create-data.dto';
import { UpdateDataDTO } from './dto/update-data.dto';
import { Data } from './entities/data.entity';
import { TimeoutHandler } from 'src/intercepters/timeout-handle.decorator';

@Controller('data')
export class DataController {
  constructor(readonly service: DataService) {}

  @TimeoutHandler(2000)
  @Get()
  getAll(): Data[] {
    return this.service.getAll();
  }

  @Get('search')
  search(@Query('value') value: string): Data[] {
    return this.service.search(value);
  }

  @Get('/:id')
  getOne(@Param('id') id: string): Data {
    return this.service.getOne(id);
  }

  @Post()
  create(@Body() body: CreateDataDTO) {
    console.log(body);
    return this.service.create(body);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.service.deleteOne(id);
  }

  @Put('/:id')
  put(@Param('id') id: string, @Body() body: UpdateDataDTO) {
    this.service.updateOne(id, body);
  }
}

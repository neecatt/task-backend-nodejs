import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FormEntriesService } from './form-entries.service';
import { CreateFormEntryDto } from './dto/create-form-entry.dto';
import { UpdateFormEntryDto } from './dto/update-form-entry.dto';

@Controller('form-entries')
export class FormEntriesController {
  constructor(private readonly formEntriesService: FormEntriesService) {}

  @Post()
  async create(@Body() createFormEntryDto: CreateFormEntryDto) {
    return await this.formEntriesService.create(createFormEntryDto);
  }

  @Get()
  async findAll() {
    return await this.formEntriesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.formEntriesService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateFormEntryDto: UpdateFormEntryDto,
  ) {
    return await this.formEntriesService.update(+id, updateFormEntryDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.formEntriesService.remove(+id);
  }
}

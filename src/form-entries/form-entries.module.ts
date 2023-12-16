import { Module } from '@nestjs/common';
import { FormEntriesService } from './form-entries.service';
import { FormEntriesController } from './form-entries.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [FormEntriesController],
  providers: [FormEntriesService, PrismaService],
})
export class FormEntriesModule {}

import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { FormEntriesModule } from './form-entries/form-entries.module';
import { SectorsModule } from './sectors/sectors.module';

@Module({
  imports: [PrismaModule, FormEntriesModule, SectorsModule],
  controllers: [],
  providers: [],
  exports: [PrismaModule],
})
export class AppModule {}

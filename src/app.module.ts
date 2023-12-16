import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { FormEntriesModule } from './form-entries/form-entries.module';

@Module({
  imports: [PrismaModule, FormEntriesModule],
  controllers: [],
  providers: [],
  exports: [PrismaModule],
})
export class AppModule {}

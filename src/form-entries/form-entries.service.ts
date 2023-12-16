import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateFormEntryDto } from './dto/create-form-entry.dto';
import { UpdateFormEntryDto } from './dto/update-form-entry.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FormEntriesService {
  constructor(private prisma: PrismaService) {}

  async create(createFormEntryDto: CreateFormEntryDto) {
    const { name, agreeTerms, sectors } = createFormEntryDto;

    try {
      const data = {
        name,
        agreeTerms,
        sectors: {
          connect: sectors.map((sectorId) => ({ id: sectorId })),
        },
      };

      const createdFormEntry = await this.prisma.formEntry.create({ data });
      return createdFormEntry;
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  async findAll() {
    try {
      const formEntries = this.prisma.formEntry.findMany({
        include: {
          sectors: true,
        },
      });
      return formEntries;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findOne(id: number) {
    try {
      const formEntry = await this.prisma.formEntry.findUnique({
        where: { id },
        include: {
          sectors: true,
        },
      });
      return formEntry;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async update(id: number, updateFormEntryDto: UpdateFormEntryDto) {
    const { name, agreeTerms, sectors } = updateFormEntryDto;

    try {
      const data = {
        name,
        agreeTerms,
        sectors: {
          connect: sectors.map((sectorId) => ({ id: sectorId })),
        },
      };

      const updatedFormEntry = await this.prisma.formEntry.update({
        where: { id },
        data,
      });
      return updatedFormEntry;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async remove(id: number) {
    try {
      const deletedFormEntry = await this.prisma.formEntry.delete({
        where: { id },
      });
      return deletedFormEntry;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}

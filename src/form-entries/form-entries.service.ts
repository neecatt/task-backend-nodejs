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

  /**
   * Creates a new form entry.
   * @param createFormEntryDto
   * @returns {Promise<FormEntry>} A promise that resolves to the created form entry.
   * @throws {ConflictException} If an error occurs while creating the form entry.
   */
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

  /**
   * Retrieves all form entries.
   * @throws {NotFoundException} If an error occurs while retrieving the form entries.
   * @returns {Promise<FormEntry[]>} A promise that resolves to an array of form entries.
   */
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

  /**
   * Retrieves a form entry by its ID.
   * @throws {NotFoundException} If an error occurs while retrieving the form entry.
   * @param  {number} id
   * @returns {Promise<FormEntry>} A promise that resolves to the retrieved form entry.
   */
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

  /**
   * Updates a form entry by its ID.
   * @throws {NotFoundException} If the form entry with the specified ID is not found.
   * @param  {number} id
   * @param  {UpdateFormEntryDto} updateFormEntryDto
   * @returns {Promise<FormEntry>} A promise that resolves to the updated form entry.
   */
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

  /**
   * Removes a form entry by its ID.
   * @throws {NotFoundException} If the form entry with the specified ID is not found.
   * @param  {number} id
   * @returns {Promise<FormEntry>} A promise that resolves to the removed form entry.
   */
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

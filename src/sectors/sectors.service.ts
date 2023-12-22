import { Injectable, NotFoundException } from '@nestjs/common';
import { Sector } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SectorsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Retrieves all sectors.
   * @returns {Promise<Sector[]>} A promise that resolves to an array of sectors.
   * @throws {NotFoundException} If an error occurs while retrieving the sectors.
   */
  async findAll(): Promise<Sector[]> {
    try {
      console.log('run');
      return await this.prisma.sector.findMany();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  /**
   * Retrieves a sector by its ID.
   * @param {number} id - The ID of the sector to retrieve.
   * @returns {Promise<Sector | null>} A promise that resolves to the retrieved sector, or null if not found.
   * @throws {NotFoundException} If an error occurs while retrieving the sector.
   */
  async findOne(id: number): Promise<Sector | null> {
    try {
      return await this.prisma.sector.findUnique({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  /**
   * Removes a sector by its ID.
   * @param {number} id - The ID of the sector to remove.
   * @returns {Promise<Sector>} A promise that resolves to the removed sector.
   * @throws {NotFoundException} If the sector with the specified ID is not found.
   */
  async remove(id: number): Promise<Sector> {
    const sector = await this.prisma.sector.findUnique({
      where: { id },
    });
    if (!sector) {
      throw new NotFoundException('Sector not found');
    }
    return await this.prisma.sector.delete({
      where: { id },
    });
  }
}

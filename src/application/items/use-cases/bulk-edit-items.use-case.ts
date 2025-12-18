import { Injectable, Inject } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsOptional } from 'class-validator';
import type { IItemRepository } from '../../../domain/items/repositories/item.repository.interface';
import { Item } from '../../../domain/items/entities/item.entity';

export class BulkEditItemsRequestDto {
  @ApiProperty({
    type: [Number],
    example: [1, 2, 3],
    description: 'Array of item IDs to update',
  })
  @IsArray()
  itemIds: number[];

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  location?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  shipFrom?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  notes?: string;
}

@Injectable()
export class BulkEditItemsUseCase {
  constructor(
    @Inject('IItemRepository')
    private readonly itemRepository: IItemRepository,
  ) {}

  async execute(dto: BulkEditItemsRequestDto): Promise<{ updated: number }> {
    // For bulk operations, we'll update directly in the repository
    // In a more complex scenario, we might want to load each item and update it
    const updates: any = {};

    if (dto.location !== undefined) {
      updates.location = dto.location;
    }
    if (dto.category !== undefined) {
      updates.category = dto.category;
    }
    if (dto.notes !== undefined) {
      updates.notes = dto.notes;
    }
    if (dto.shipFrom !== undefined) {
      updates.shipFrom = dto.shipFrom;
    }

    const updated = await this.itemRepository.bulkUpdate(dto.itemIds, updates);

    return { updated };
  }
}


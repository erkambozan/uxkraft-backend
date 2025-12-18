import { Injectable, Inject } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsOptional, IsDateString } from 'class-validator';
import type { IItemRepository } from '../../../domain/items/repositories/item.repository.interface';
import { Item } from '../../../domain/items/entities/item.entity';

export class UpdateTrackingRequestDto {
  @ApiProperty({
    type: [Number],
    example: [1, 2, 3],
    description: 'Array of item IDs to update',
  })
  @IsArray()
  itemIds: number[];

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  poApprovalDate?: string;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  hotelNeedByDate?: string;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  expectedDelivery?: string;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  cfaShopsSend?: string;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  cfaShopsApproved?: string;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  cfaShopsDelivered?: string;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  orderedDate?: string;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  shippedDate?: string;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  deliveredDate?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  shippingNotes?: string;
}

@Injectable()
export class UpdateTrackingUseCase {
  constructor(
    @Inject('IItemRepository')
    private readonly itemRepository: IItemRepository,
  ) {}

  async execute(
    dto: UpdateTrackingRequestDto,
  ): Promise<{ updated: number }> {
    const updates: any = {};

    if (dto.poApprovalDate !== undefined) {
      updates.poApprovalDate = new Date(dto.poApprovalDate);
    }
    if (dto.hotelNeedByDate !== undefined) {
      updates.hotelNeedByDate = new Date(dto.hotelNeedByDate);
    }
    if (dto.expectedDelivery !== undefined) {
      updates.expectedDelivery = new Date(dto.expectedDelivery);
    }
    if (dto.cfaShopsSend !== undefined) {
      updates.cfaShopsSend = new Date(dto.cfaShopsSend);
    }
    if (dto.cfaShopsApproved !== undefined) {
      updates.cfaShopsApproved = new Date(dto.cfaShopsApproved);
    }
    if (dto.cfaShopsDelivered !== undefined) {
      updates.cfaShopsDelivered = new Date(dto.cfaShopsDelivered);
    }
    if (dto.orderedDate !== undefined) {
      updates.orderedDate = new Date(dto.orderedDate);
    }
    if (dto.shippedDate !== undefined) {
      updates.shippedDate = new Date(dto.shippedDate);
    }
    if (dto.deliveredDate !== undefined) {
      updates.deliveredDate = new Date(dto.deliveredDate);
    }
    if (dto.shippingNotes !== undefined) {
      updates.shipNotes = dto.shippingNotes;
    }

    const updated = await this.itemRepository.bulkUpdate(
      dto.itemIds,
      updates,
    );

    return { updated };
  }
}


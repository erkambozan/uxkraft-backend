import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsOptional,
  Min,
  IsDateString,
} from 'class-validator';
import type { IItemRepository } from '../../../domain/items/repositories/item.repository.interface';
import { Item } from '../../../domain/items/entities/item.entity';
import { ItemResponseDto } from '../dtos/item-response.dto';
import { ItemMapper } from '../mappers/item.mapper';

export class UpdateItemRequestDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  specNumber?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  itemName?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  vendor?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  shipTo?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  shipToAddress?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  shipFrom?: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @Min(0)
  @IsOptional()
  qty?: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  phase?: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @Min(0)
  @IsOptional()
  price?: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  shipNotes?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  notes?: string;

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
  uploadFile?: string;

  // Tracking date fields
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
}

@Injectable()
export class UpdateItemUseCase {
  constructor(
    @Inject('IItemRepository')
    private readonly itemRepository: IItemRepository,
  ) {}

  async execute(
    id: number,
    dto: UpdateItemRequestDto,
  ): Promise<ItemResponseDto> {
    const item = await this.itemRepository.findById(id);

    if (!item) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }

    // Check if any tracking dates are being updated
    const hasTrackingDateUpdates =
      dto.poApprovalDate !== undefined ||
      dto.hotelNeedByDate !== undefined ||
      dto.expectedDelivery !== undefined ||
      dto.cfaShopsSend !== undefined ||
      dto.cfaShopsApproved !== undefined ||
      dto.cfaShopsDelivered !== undefined ||
      dto.orderedDate !== undefined ||
      dto.shippedDate !== undefined ||
      dto.deliveredDate !== undefined;

    // Get existing tracking dates
    const existingTrackingDates = item.getTrackingDates();

    // Update tracking dates if provided, otherwise preserve existing
    let updatedTrackingDates = existingTrackingDates;
    if (hasTrackingDateUpdates) {
      updatedTrackingDates = existingTrackingDates.updateDates({
        poApprovalDate: dto.poApprovalDate
          ? new Date(dto.poApprovalDate)
          : undefined,
        hotelNeedByDate: dto.hotelNeedByDate
          ? new Date(dto.hotelNeedByDate)
          : undefined,
        expectedDelivery: dto.expectedDelivery
          ? new Date(dto.expectedDelivery)
          : undefined,
        cfaShopsSend: dto.cfaShopsSend
          ? new Date(dto.cfaShopsSend)
          : undefined,
        cfaShopsApproved: dto.cfaShopsApproved
          ? new Date(dto.cfaShopsApproved)
          : undefined,
        cfaShopsDelivered: dto.cfaShopsDelivered
          ? new Date(dto.cfaShopsDelivered)
          : undefined,
        orderedDate: dto.orderedDate ? new Date(dto.orderedDate) : undefined,
        shippedDate: dto.shippedDate ? new Date(dto.shippedDate) : undefined,
        deliveredDate: dto.deliveredDate
          ? new Date(dto.deliveredDate)
          : undefined,
      });
    }

    // Create updated item entity
    // Use fromDatabase if no tracking date updates (preserve invalid dates)
    // Use create if tracking dates are updated (validate new dates)
    const itemProps = {
      id: item.getId()!,
      itemNumber: item.getItemNumber().getValue(),
      specNumber: dto.specNumber ?? item.getSpecNumber(),
      itemName: dto.itemName ?? item.getItemName(),
      vendor: dto.vendor ?? item.getVendor(),
      shipTo: dto.shipTo ?? item.getShippingAddress().getShipTo(),
      shipToAddress:
        dto.shipToAddress ?? item.getShippingAddress().getShipToAddress(),
      shipFrom:
        dto.shipFrom ?? item.getShippingAddress().getShipFrom(),
      qty: dto.qty ?? item.getQuantity().getValue(),
      phase: dto.phase ?? item.getPhase(),
      price: dto.price ?? item.getPrice().getValue(),
      shipNotes: dto.shipNotes ?? item.getShipNotes(),
      notes: dto.notes ?? item.getNotes(),
      location: dto.location ?? item.getLocation(),
      category: dto.category ?? item.getCategory(),
      uploadFile: dto.uploadFile ?? item.getUploadFile(),
      trackingDates: {
        poApprovalDate: updatedTrackingDates.getPoApprovalDate(),
        hotelNeedByDate: updatedTrackingDates.getHotelNeedByDate(),
        expectedDelivery: updatedTrackingDates.getExpectedDelivery(),
        cfaShopsSend: updatedTrackingDates.getCfaShopsSend(),
        cfaShopsApproved: updatedTrackingDates.getCfaShopsApproved(),
        cfaShopsDelivered: updatedTrackingDates.getCfaShopsDelivered(),
        orderedDate: updatedTrackingDates.getOrderedDate(),
        shippedDate: updatedTrackingDates.getShippedDate(),
        deliveredDate: updatedTrackingDates.getDeliveredDate(),
      },
      createdAt: item.getCreatedAt(),
      updatedAt: new Date(),
    };

    const updatedItem = hasTrackingDateUpdates
      ? Item.create(itemProps) // Validate when updating tracking dates
      : Item.fromDatabase(itemProps); // Preserve existing dates when not updating them

    const savedItem = await this.itemRepository.update(updatedItem);

    return ItemMapper.toResponseDto(savedItem);
  }
}


import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, Min } from 'class-validator';
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

    // Create updated item entity
    const updatedItem = Item.create({
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
        poApprovalDate: item.getTrackingDates().getPoApprovalDate(),
        hotelNeedByDate: item.getTrackingDates().getHotelNeedByDate(),
        expectedDelivery: item.getTrackingDates().getExpectedDelivery(),
        cfaShopsSend: item.getTrackingDates().getCfaShopsSend(),
        cfaShopsApproved: item.getTrackingDates().getCfaShopsApproved(),
        cfaShopsDelivered: item.getTrackingDates().getCfaShopsDelivered(),
        orderedDate: item.getTrackingDates().getOrderedDate(),
        shippedDate: item.getTrackingDates().getShippedDate(),
        deliveredDate: item.getTrackingDates().getDeliveredDate(),
      },
      createdAt: item.getCreatedAt(),
      updatedAt: new Date(),
    });

    const savedItem = await this.itemRepository.update(updatedItem);

    return ItemMapper.toResponseDto(savedItem);
  }
}


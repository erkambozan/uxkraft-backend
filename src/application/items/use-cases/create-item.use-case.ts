import { Injectable, ConflictException, Inject } from '@nestjs/common';
import type { IItemRepository } from '../../../domain/items/repositories/item.repository.interface';
import { Item } from '../../../domain/items/entities/item.entity';
import { CreateItemRequestDto } from '../dtos/create-item-request.dto';
import { ItemResponseDto } from '../dtos/item-response.dto';
import { ItemMapper } from '../mappers/item.mapper';

@Injectable()
export class CreateItemUseCase {
  constructor(
    @Inject('IItemRepository')
    private readonly itemRepository: IItemRepository,
  ) {}

  async execute(dto: CreateItemRequestDto): Promise<ItemResponseDto> {
    // Check if item number already exists
    const existingItem = await this.itemRepository.findByItemNumber(
      dto.itemNumber,
    );
    if (existingItem) {
      throw new ConflictException(
        `Item with number ${dto.itemNumber} already exists`,
      );
    }

    // Create domain entity
    const item = Item.create({
      itemNumber: dto.itemNumber,
      specNumber: dto.specNumber,
      itemName: dto.itemName,
      vendor: dto.vendor,
      shipTo: dto.shipTo,
      shipToAddress: dto.shipToAddress,
      shipFrom: dto.shipFrom,
      qty: dto.qty,
      phase: dto.phase,
      price: dto.price,
      shipNotes: dto.shipNotes,
      notes: dto.notes,
      location: dto.location,
      category: dto.category,
      uploadFile: dto.uploadFile,
      trackingDates: {
        poApprovalDate: dto.poApprovalDate
          ? new Date(dto.poApprovalDate)
          : undefined,
        hotelNeedByDate: dto.hotelNeedByDate
          ? new Date(dto.hotelNeedByDate)
          : undefined,
        expectedDelivery: dto.expectedDelivery
          ? new Date(dto.expectedDelivery)
          : undefined,
        cfaShopsSend: dto.cfaShopsSend ? new Date(dto.cfaShopsSend) : undefined,
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
      },
    });

    // Save to repository
    const savedItem = await this.itemRepository.save(item);

    // Map to response DTO
    return ItemMapper.toResponseDto(savedItem);
  }
}


import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import type { IItemRepository } from '../../../domain/items/repositories/item.repository.interface';
import { ItemResponseDto } from '../dtos/item-response.dto';
import { ItemMapper } from '../mappers/item.mapper';

@Injectable()
export class GetItemByIdUseCase {
  constructor(
    @Inject('IItemRepository')
    private readonly itemRepository: IItemRepository,
  ) {}

  async execute(id: number): Promise<ItemResponseDto> {
    const item = await this.itemRepository.findById(id);

    if (!item) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }

    return ItemMapper.toResponseDto(item);
  }
}


import { Injectable, Inject } from '@nestjs/common';
import type { IItemRepository } from '../../../domain/items/repositories/item.repository.interface';
import { PaginatedItemsResponseDto } from '../dtos/paginated-items-response.dto';
import { ItemMapper } from '../mappers/item.mapper';

@Injectable()
export class GetItemsUseCase {
  constructor(
    @Inject('IItemRepository')
    private readonly itemRepository: IItemRepository,
  ) {}

  async execute(options: {
    page: number;
    limit: number;
    search?: string;
    phase?: string;
    vendor?: string;
  }): Promise<PaginatedItemsResponseDto> {
    const result = await this.itemRepository.findAll(options);

    return {
      items: result.items.map((item) => ItemMapper.toResponseDto(item)),
      total: result.total,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(result.total / options.limit),
    };
  }
}


import { Injectable, Inject } from '@nestjs/common';
import type { IItemRepository } from '../../../domain/items/repositories/item.repository.interface';

@Injectable()
export class BulkDeleteItemsUseCase {
  constructor(
    @Inject('IItemRepository')
    private readonly itemRepository: IItemRepository,
  ) {}

  async execute(itemIds: number[]): Promise<{ deleted: number }> {
    const deleted = await this.itemRepository.bulkDelete(itemIds);

    return { deleted };
  }
}


import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import type { IItemRepository } from '../../../domain/items/repositories/item.repository.interface';

@Injectable()
export class DeleteItemUseCase {
  constructor(
    @Inject('IItemRepository')
    private readonly itemRepository: IItemRepository,
  ) {}

  async execute(id: number): Promise<void> {
    const item = await this.itemRepository.findById(id);

    if (!item) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }

    await this.itemRepository.delete(id);
  }
}


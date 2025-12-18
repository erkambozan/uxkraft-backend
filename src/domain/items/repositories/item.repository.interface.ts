import { Item } from '../entities/item.entity';

/**
 * Repository interface for Item aggregate
 * Defines the contract for item persistence
 */
export interface IItemRepository {
  /**
   * Save a new item
   */
  save(item: Item): Promise<Item>;

  /**
   * Find item by ID
   */
  findById(id: number): Promise<Item | null>;

  /**
   * Find item by item number
   */
  findByItemNumber(itemNumber: string): Promise<Item | null>;

  /**
   * Find all items with pagination and filters
   */
  findAll(options: {
    page: number;
    limit: number;
    search?: string;
    phase?: string;
    vendor?: string;
  }): Promise<{ items: Item[]; total: number }>;

  /**
   * Update an existing item
   */
  update(item: Item): Promise<Item>;

  /**
   * Delete an item by ID
   */
  delete(id: number): Promise<void>;

  /**
   * Bulk update items
   */
  bulkUpdate(
    itemIds: number[],
    updates: Partial<Item>,
  ): Promise<number>;

  /**
   * Bulk delete items
   */
  bulkDelete(itemIds: number[]): Promise<number>;
}




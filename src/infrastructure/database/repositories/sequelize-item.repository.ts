import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op, WhereOptions, Transaction } from 'sequelize';
import type { IItemRepository } from '../../../domain/items/repositories/item.repository.interface';
import { Item } from '../../../domain/items/entities/item.entity';
import { ItemOrmEntity } from '../sequelize/models/item.orm-entity';
import { ItemShippingOrmEntity } from '../sequelize/models/item-shipping.orm-entity';
import { ItemTrackingOrmEntity } from '../sequelize/models/item-tracking.orm-entity';
import { ItemMetadataOrmEntity } from '../sequelize/models/item-metadata.orm-entity';
import { ItemMapper as DomainMapper } from './mappers/item-orm.mapper';

@Injectable()
export class SequelizeItemRepository implements IItemRepository {
  constructor(
    @InjectModel(ItemOrmEntity)
    private readonly itemModel: typeof ItemOrmEntity,
    @InjectModel(ItemShippingOrmEntity)
    private readonly shippingModel: typeof ItemShippingOrmEntity,
    @InjectModel(ItemTrackingOrmEntity)
    private readonly trackingModel: typeof ItemTrackingOrmEntity,
    @InjectModel(ItemMetadataOrmEntity)
    private readonly metadataModel: typeof ItemMetadataOrmEntity,
  ) {}

  async save(item: Item): Promise<Item> {
    const ormEntities = DomainMapper.toOrmEntities(item);

    return await this.itemModel.sequelize!.transaction(
      async (transaction: Transaction) => {
        // Save main item
        const savedItem = await this.itemModel.create(ormEntities.item, {
          transaction,
        });

        // Save related entities
        await this.shippingModel.create(
          { ...ormEntities.shipping, itemId: savedItem.id },
          { transaction },
        );

        await this.trackingModel.create(
          { ...ormEntities.tracking, itemId: savedItem.id },
          { transaction },
        );

        await this.metadataModel.create(
          { ...ormEntities.metadata, itemId: savedItem.id },
          { transaction },
        );

        // Load with relations and return
        const loaded = await this.findById(savedItem.id);
        if (!loaded) {
          throw new Error('Failed to load saved item');
        }
        return loaded;
      },
    );
  }

  async findById(id: number): Promise<Item | null> {
    const itemOrm = await this.itemModel.findByPk(id, {
      include: [
        { model: ItemShippingOrmEntity, as: 'shipping' },
        { model: ItemTrackingOrmEntity, as: 'tracking' },
        { model: ItemMetadataOrmEntity, as: 'metadata' },
      ],
    });

    if (!itemOrm) {
      return null;
    }

    return DomainMapper.toDomainEntity(
      itemOrm,
      itemOrm.shipping,
      itemOrm.tracking,
      itemOrm.metadata,
    );
  }

  async findByItemNumber(itemNumber: string): Promise<Item | null> {
    const itemOrm = await this.itemModel.findOne({
      where: { itemNumber },
      include: [
        { model: ItemShippingOrmEntity, as: 'shipping' },
        { model: ItemTrackingOrmEntity, as: 'tracking' },
        { model: ItemMetadataOrmEntity, as: 'metadata' },
      ],
    });

    if (!itemOrm) {
      return null;
    }

    return DomainMapper.toDomainEntity(
      itemOrm,
      itemOrm.shipping,
      itemOrm.tracking,
      itemOrm.metadata,
    );
  }

  async findAll(options: {
    page: number;
    limit: number;
    search?: string;
    phase?: string;
    vendor?: string;
  }): Promise<{ items: Item[]; total: number }> {
    const offset = (options.page - 1) * options.limit;
    const where: WhereOptions<ItemOrmEntity> = {};

    if (options.search) {
      where[Op.or] = [
        { itemName: { [Op.iLike]: `%${options.search}%` } },
        { itemNumber: { [Op.iLike]: `%${options.search}%` } },
        { specNumber: { [Op.iLike]: `%${options.search}%` } },
      ];
    }

    if (options.phase && options.phase !== 'all') {
      where.phase = options.phase;
    }

    if (options.vendor && options.vendor !== 'all') {
      where.vendor = options.vendor;
    }

    const { rows, count } = await this.itemModel.findAndCountAll({
      where,
      limit: options.limit,
      offset,
      order: [['itemNumber', 'ASC']],
      include: [
        { model: ItemShippingOrmEntity, as: 'shipping' },
        { model: ItemTrackingOrmEntity, as: 'tracking' },
        { model: ItemMetadataOrmEntity, as: 'metadata' },
      ],
    });

    // Filter out invalid items (missing required fields) and map to domain entities
    const validItems: Item[] = [];
    for (const itemOrm of rows) {
      try {
        // Skip items with missing required fields
        if (
          !itemOrm.itemNumber ||
          !itemOrm.specNumber ||
          !itemOrm.itemName ||
          !itemOrm.vendor ||
          itemOrm.qty === null ||
          itemOrm.qty === undefined ||
          itemOrm.price === null ||
          itemOrm.price === undefined ||
          !itemOrm.phase
        ) {
          console.warn(
            `Skipping item with ID ${itemOrm.id} - missing required fields`,
          );
          continue;
        }

        validItems.push(
          DomainMapper.toDomainEntity(
            itemOrm,
            itemOrm.shipping,
            itemOrm.tracking,
            itemOrm.metadata,
          ),
        );
      } catch (error) {
        console.warn(
          `Skipping item with ID ${itemOrm.id} - mapping error:`,
          error.message,
        );
        continue;
      }
    }

    return {
      items: validItems,
      total: count,
    };
  }

  async update(item: Item): Promise<Item> {
    const id = item.getId();
    if (!id) {
      throw new Error('Cannot update item without ID');
    }

    const ormEntities = DomainMapper.toOrmEntities(item);

    return await this.itemModel.sequelize!.transaction(
      async (transaction: Transaction) => {
        // Update main item
        await this.itemModel.update(ormEntities.item, {
          where: { id },
          transaction,
        });

        // Update related entities
        await this.shippingModel.upsert(
          { ...ormEntities.shipping, itemId: id },
          { transaction },
        );

        await this.trackingModel.upsert(
          { ...ormEntities.tracking, itemId: id },
          { transaction },
        );

        await this.metadataModel.upsert(
          { ...ormEntities.metadata, itemId: id },
          { transaction },
        );

        const loaded = await this.findById(id);
        if (!loaded) {
          throw new Error('Failed to load updated item');
        }
        return loaded;
      },
    );
  }

  async delete(id: number): Promise<void> {
    await this.itemModel.sequelize!.transaction(
      async (transaction: Transaction) => {
        // Delete related entities first (due to foreign key constraints)
        await this.metadataModel.destroy({
          where: { itemId: id },
          transaction,
        });
        await this.trackingModel.destroy({
          where: { itemId: id },
          transaction,
        });
        await this.shippingModel.destroy({
          where: { itemId: id },
          transaction,
        });
        // Delete main item
        await this.itemModel.destroy({
          where: { id },
          transaction,
        });
      },
    );
  }

  async bulkUpdate(
    itemIds: number[],
    updates: any,
  ): Promise<number> {
    // Separate updates by table
    const itemUpdates: any = {};
    const shippingUpdates: any = {};
    const trackingUpdates: any = {};
    const metadataUpdates: any = {};

    // Map fields to their respective tables
    if (updates.itemNumber !== undefined) itemUpdates.itemNumber = updates.itemNumber;
    if (updates.specNumber !== undefined) itemUpdates.specNumber = updates.specNumber;
    if (updates.itemName !== undefined) itemUpdates.itemName = updates.itemName;
    if (updates.vendor !== undefined) itemUpdates.vendor = updates.vendor;
    if (updates.qty !== undefined) itemUpdates.qty = updates.qty;
    if (updates.price !== undefined) itemUpdates.price = updates.price;
    if (updates.phase !== undefined) itemUpdates.phase = updates.phase;

    if (updates.shipTo !== undefined) shippingUpdates.shipTo = updates.shipTo;
    if (updates.shipToAddress !== undefined) shippingUpdates.shipToAddress = updates.shipToAddress;
    if (updates.shipFrom !== undefined) shippingUpdates.shipFrom = updates.shipFrom;
    if (updates.shipNotes !== undefined) shippingUpdates.shipNotes = updates.shipNotes;

    if (updates.poApprovalDate !== undefined) trackingUpdates.poApprovalDate = updates.poApprovalDate;
    if (updates.hotelNeedByDate !== undefined) trackingUpdates.hotelNeedByDate = updates.hotelNeedByDate;
    if (updates.expectedDelivery !== undefined) trackingUpdates.expectedDelivery = updates.expectedDelivery;
    if (updates.cfaShopsSend !== undefined) trackingUpdates.cfaShopsSend = updates.cfaShopsSend;
    if (updates.cfaShopsApproved !== undefined) trackingUpdates.cfaShopsApproved = updates.cfaShopsApproved;
    if (updates.cfaShopsDelivered !== undefined) trackingUpdates.cfaShopsDelivered = updates.cfaShopsDelivered;
    if (updates.orderedDate !== undefined) trackingUpdates.orderedDate = updates.orderedDate;
    if (updates.shippedDate !== undefined) trackingUpdates.shippedDate = updates.shippedDate;
    if (updates.deliveredDate !== undefined) trackingUpdates.deliveredDate = updates.deliveredDate;

    if (updates.notes !== undefined) metadataUpdates.notes = updates.notes;
    if (updates.location !== undefined) metadataUpdates.location = updates.location;
    if (updates.category !== undefined) metadataUpdates.category = updates.category;
    if (updates.uploadFile !== undefined) metadataUpdates.uploadFile = updates.uploadFile;

    let updated = 0;

    await this.itemModel.sequelize!.transaction(
      async (transaction: Transaction) => {
        // Update main items
        if (Object.keys(itemUpdates).length > 0) {
          const [count] = await this.itemModel.update(itemUpdates, {
            where: { id: { [Op.in]: itemIds } },
            transaction,
          });
          updated = count;
        }

        // Update related entities
        if (Object.keys(shippingUpdates).length > 0) {
          await this.shippingModel.update(shippingUpdates, {
            where: { itemId: { [Op.in]: itemIds } },
            transaction,
          });
        }

        if (Object.keys(trackingUpdates).length > 0) {
          await this.trackingModel.update(trackingUpdates, {
            where: { itemId: { [Op.in]: itemIds } },
            transaction,
          });
        }

        if (Object.keys(metadataUpdates).length > 0) {
          await this.metadataModel.update(metadataUpdates, {
            where: { itemId: { [Op.in]: itemIds } },
            transaction,
          });
        }
      },
    );

    return updated;
  }

  async bulkDelete(itemIds: number[]): Promise<number> {
    return await this.itemModel.sequelize!.transaction(
      async (transaction: Transaction) => {
        // Delete related entities first
        await this.metadataModel.destroy({
          where: { itemId: { [Op.in]: itemIds } },
          transaction,
        });
        await this.trackingModel.destroy({
          where: { itemId: { [Op.in]: itemIds } },
          transaction,
        });
        await this.shippingModel.destroy({
          where: { itemId: { [Op.in]: itemIds } },
          transaction,
        });
        // Delete main items
        const deleted = await this.itemModel.destroy({
          where: { id: { [Op.in]: itemIds } },
          transaction,
        });
        return deleted;
      },
    );
  }
}

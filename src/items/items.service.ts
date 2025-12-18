import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Item } from '../models/item.model';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { BulkEditDto } from './dto/bulk-edit.dto';
import { UpdateTrackingDto } from './dto/update-tracking.dto';
import { Op, WhereOptions } from 'sequelize';

@Injectable()
export class ItemsService {
  constructor(
    @InjectModel(Item)
    private itemModel: typeof Item,
  ) {}

  async create(createItemDto: CreateItemDto): Promise<Item> {
    return await this.itemModel.create(createItemDto as any);
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    search?: string,
    phase?: string,
    vendor?: string,
  ): Promise<{ items: Item[]; total: number; page: number; limit: number }> {
    const offset = (page - 1) * limit;
    const where: WhereOptions<Item> = {};

    if (search) {
      where[Op.or] = [
        { itemName: { [Op.iLike]: `%${search}%` } },
        { itemNumber: { [Op.iLike]: `%${search}%` } },
        { specNumber: { [Op.iLike]: `%${search}%` } },
      ];
    }

    if (phase && phase !== 'all') {
      where.phase = phase;
    }

    if (vendor && vendor !== 'all') {
      where.vendor = vendor;
    }

    const { rows: items, count: total } = await this.itemModel.findAndCountAll({
      where,
      limit,
      offset,
      order: [['itemNumber', 'ASC']],
    });

    return {
      items,
      total,
      page,
      limit,
    };
  }

  async findOne(id: number): Promise<Item> {
    const item = await this.itemModel.findByPk(id);
    if (!item) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    return item;
  }

  async update(id: number, updateItemDto: UpdateItemDto): Promise<Item> {
    const item = await this.findOne(id);
    await item.update(updateItemDto as any);
    return item;
  }

  async remove(id: number): Promise<void> {
    const item = await this.findOne(id);
    await item.destroy();
  }

  async bulkEdit(bulkEditDto: BulkEditDto): Promise<{ updated: number }> {
    const { itemIds, ...updateData } = bulkEditDto;
    const [updated] = await this.itemModel.update(updateData as any, {
      where: {
        id: {
          [Op.in]: itemIds,
        },
      },
    });
    return { updated };
  }

  async updateTracking(
    updateTrackingDto: UpdateTrackingDto,
  ): Promise<{ updated: number }> {
    const { itemIds, shippingNotes, ...updateData } = updateTrackingDto;
    
    // Map shippingNotes to shipNotes (field name in model)
    const mappedData: any = { ...updateData };
    if (shippingNotes !== undefined) {
      mappedData.shipNotes = shippingNotes;
    }
    
    const [updated] = await this.itemModel.update(mappedData, {
      where: {
        id: {
          [Op.in]: itemIds,
        },
      },
    });
    return { updated };
  }

  async bulkDelete(itemIds: number[]): Promise<{ deleted: number }> {
    const deleted = await this.itemModel.destroy({
      where: {
        id: {
          [Op.in]: itemIds,
        },
      },
    });
    return { deleted };
  }
}


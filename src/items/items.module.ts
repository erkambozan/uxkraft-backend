import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ItemsController } from '../presentation/items/items.controller';
import { ItemOrmEntity } from '../infrastructure/database/sequelize/models/item.orm-entity';
import { ItemShippingOrmEntity } from '../infrastructure/database/sequelize/models/item-shipping.orm-entity';
import { ItemTrackingOrmEntity } from '../infrastructure/database/sequelize/models/item-tracking.orm-entity';
import { ItemMetadataOrmEntity } from '../infrastructure/database/sequelize/models/item-metadata.orm-entity';
import { SequelizeItemRepository } from '../infrastructure/database/repositories/sequelize-item.repository';
import { IItemRepository } from '../domain/items/repositories/item.repository.interface';
import { CreateItemUseCase } from '../application/items/use-cases/create-item.use-case';
import { GetItemsUseCase } from '../application/items/use-cases/get-items.use-case';
import { GetItemByIdUseCase } from '../application/items/use-cases/get-item-by-id.use-case';
import { UpdateItemUseCase } from '../application/items/use-cases/update-item.use-case';
import { DeleteItemUseCase } from '../application/items/use-cases/delete-item.use-case';
import { BulkEditItemsUseCase } from '../application/items/use-cases/bulk-edit-items.use-case';
import { UpdateTrackingUseCase } from '../application/items/use-cases/update-tracking.use-case';
import { BulkDeleteItemsUseCase } from '../application/items/use-cases/bulk-delete-items.use-case';

@Module({
  imports: [
    SequelizeModule.forFeature([
      ItemOrmEntity,
      ItemShippingOrmEntity,
      ItemTrackingOrmEntity,
      ItemMetadataOrmEntity,
    ]),
  ],
  controllers: [ItemsController],
  providers: [
    // Repository
    {
      provide: 'IItemRepository',
      useClass: SequelizeItemRepository,
    },
    // Use Cases
    CreateItemUseCase,
    GetItemsUseCase,
    GetItemByIdUseCase,
    UpdateItemUseCase,
    DeleteItemUseCase,
    BulkEditItemsUseCase,
    UpdateTrackingUseCase,
    BulkDeleteItemsUseCase,
  ],
  exports: ['IItemRepository'],
})
export class ItemsModule {}


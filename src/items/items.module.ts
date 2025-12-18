import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { Item } from '../models/item.model';

@Module({
  imports: [SequelizeModule.forFeature([Item])],
  controllers: [ItemsController],
  providers: [ItemsService],
  exports: [ItemsService],
})
export class ItemsModule {}


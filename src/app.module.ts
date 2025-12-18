import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsModule } from './items/items.module';
import { databaseConfig } from './config/database.config';
import { ItemOrmEntity } from './infrastructure/database/sequelize/models/item.orm-entity';
import { ItemShippingOrmEntity } from './infrastructure/database/sequelize/models/item-shipping.orm-entity';
import { ItemTrackingOrmEntity } from './infrastructure/database/sequelize/models/item-tracking.orm-entity';
import { ItemMetadataOrmEntity } from './infrastructure/database/sequelize/models/item-metadata.orm-entity';

@Module({
  imports: [
    SequelizeModule.forRoot({
      ...databaseConfig,
      models: [
        ItemOrmEntity,
        ItemShippingOrmEntity,
        ItemTrackingOrmEntity,
        ItemMetadataOrmEntity,
      ],
    }),
    ItemsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsModule } from './items/items.module';
import { databaseConfig } from './config/database.config';
import { Item } from './models/item.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      ...databaseConfig,
      models: [Item],
    }),
    ItemsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

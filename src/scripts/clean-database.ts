import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { ItemOrmEntity } from '../infrastructure/database/sequelize/models/item.orm-entity';
import { ItemShippingOrmEntity } from '../infrastructure/database/sequelize/models/item-shipping.orm-entity';
import { ItemTrackingOrmEntity } from '../infrastructure/database/sequelize/models/item-tracking.orm-entity';
import { ItemMetadataOrmEntity } from '../infrastructure/database/sequelize/models/item-metadata.orm-entity';

/**
 * Script to clean the database and remove old/invalid data
 * Run this before seeding to ensure clean state
 */
async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    console.log('🧹 Cleaning database...');

    // Delete in reverse order of dependencies (children first, then parent)
    await ItemMetadataOrmEntity.destroy({ where: {}, truncate: true, cascade: true });
    await ItemTrackingOrmEntity.destroy({ where: {}, truncate: true, cascade: true });
    await ItemShippingOrmEntity.destroy({ where: {}, truncate: true, cascade: true });
    await ItemOrmEntity.destroy({ where: {}, truncate: true, cascade: true });

    console.log('✅ Database cleaned successfully!');
    console.log('💡 You can now run: npm run seed');
  } catch (error) {
    console.error('❌ Error cleaning database:', error);
  }

  await app.close();
}

void bootstrap();


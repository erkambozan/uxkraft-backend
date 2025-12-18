import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  CreatedAt,
  UpdatedAt,
  HasOne,
} from 'sequelize-typescript';
import { ItemShippingOrmEntity } from './item-shipping.orm-entity';
import { ItemTrackingOrmEntity } from './item-tracking.orm-entity';
import { ItemMetadataOrmEntity } from './item-metadata.orm-entity';

/**
 * Main Item ORM Entity (Parent Table)
 * Contains core item identification and pricing information
 */
@Table({
  tableName: 'items',
  timestamps: true,
})
export class ItemOrmEntity extends Model<ItemOrmEntity> {
  // ============================================
  // Primary Key
  // ============================================
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare id: number;

  // ============================================
  // Core Identification Fields
  // ============================================
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare itemNumber: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare specNumber: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare itemName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare vendor: string;

  // ============================================
  // Pricing & Quantity
  // ============================================
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  declare qty: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
  })
  declare price: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare phase: string;

  // ============================================
  // Relationships (One-to-One)
  // ============================================
  @HasOne(() => ItemShippingOrmEntity, 'itemId')
  declare shipping: ItemShippingOrmEntity;

  @HasOne(() => ItemTrackingOrmEntity, 'itemId')
  declare tracking: ItemTrackingOrmEntity;

  @HasOne(() => ItemMetadataOrmEntity, 'itemId')
  declare metadata: ItemMetadataOrmEntity;

  // ============================================
  // Timestamps
  // ============================================
  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}

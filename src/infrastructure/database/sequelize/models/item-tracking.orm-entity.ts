import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  ForeignKey,
  BelongsTo,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
import { ItemOrmEntity } from './item.orm-entity';

/**
 * Item Tracking Dates ORM Entity
 * One-to-One relationship with Item (Child Table)
 * Contains all tracking dates for planning, production, and shipping
 */
@Table({
  tableName: 'item_tracking',
  timestamps: true,
})
export class ItemTrackingOrmEntity extends Model<ItemTrackingOrmEntity> {
  @PrimaryKey
  @ForeignKey(() => ItemOrmEntity)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
  })
  declare itemId: number;

  @BelongsTo(() => ItemOrmEntity)
  declare item: ItemOrmEntity;

  // ============================================
  // Planning & Requirements Dates
  // ============================================
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  declare poApprovalDate: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  declare hotelNeedByDate: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  declare expectedDelivery: Date;

  // ============================================
  // Production & Shop Dates
  // ============================================
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  declare cfaShopsSend: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  declare cfaShopsApproved: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  declare cfaShopsDelivered: Date;

  // ============================================
  // Shipping Dates
  // ============================================
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  declare orderedDate: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  declare shippedDate: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  declare deliveredDate: Date;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}


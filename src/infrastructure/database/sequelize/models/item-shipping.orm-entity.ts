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
 * Item Shipping Information ORM Entity
 * One-to-One relationship with Item (Child Table)
 */
@Table({
  tableName: 'item_shipping',
  timestamps: true,
})
export class ItemShippingOrmEntity extends Model<ItemShippingOrmEntity> {
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

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare shipTo: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare shipToAddress: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare shipFrom: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare shipNotes: string;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}


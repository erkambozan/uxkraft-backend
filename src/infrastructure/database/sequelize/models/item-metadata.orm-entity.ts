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
 * Item Metadata ORM Entity
 * One-to-One relationship with Item (Child Table)
 * Contains additional metadata and notes
 */
@Table({
  tableName: 'item_metadata',
  timestamps: true,
})
export class ItemMetadataOrmEntity extends Model<ItemMetadataOrmEntity> {
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
    type: DataType.TEXT,
    allowNull: true,
  })
  declare notes: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare location: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare category: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare uploadFile: string;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}


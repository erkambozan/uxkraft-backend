import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({
  tableName: 'items',
  timestamps: true,
})
export class Item extends Model<Item> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  itemNumber: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  specNumber: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  itemName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  vendor: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  shipTo: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  shipToAddress: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  shipFrom: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  qty: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phase: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
  })
  price: number;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  shipNotes: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  notes: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  location: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  category: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  uploadFile: string;

  // Planning & Requirements
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  poApprovalDate: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  hotelNeedByDate: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  expectedDelivery: Date;

  // Production & Shop
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  cfaShopsSend: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  cfaShopsApproved: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  cfaShopsDelivered: Date;

  // Shipping
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  orderedDate: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  shippedDate: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  deliveredDate: Date;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}



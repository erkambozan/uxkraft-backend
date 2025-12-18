import { Column, DataType } from 'sequelize-typescript';

/**
 * Tracking dates for Item ORM Entity
 * Separated into Planning, Production, and Shipping phases
 */
export class ItemTrackingDates {
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
}


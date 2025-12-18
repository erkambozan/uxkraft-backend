import { ApiProperty } from '@nestjs/swagger';

export class ItemResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  itemNumber: string;

  @ApiProperty()
  specNumber: string;

  @ApiProperty()
  itemName: string;

  @ApiProperty()
  vendor: string;

  @ApiProperty()
  shipTo: string;

  @ApiProperty({ required: false })
  shipToAddress?: string;

  @ApiProperty({ required: false })
  shipFrom?: string;

  @ApiProperty()
  qty: number;

  @ApiProperty()
  phase: string;

  @ApiProperty()
  price: number;

  @ApiProperty({ required: false })
  shipNotes?: string;

  @ApiProperty({ required: false })
  notes?: string;

  @ApiProperty({ required: false })
  location?: string;

  @ApiProperty({ required: false })
  category?: string;

  @ApiProperty({ required: false })
  uploadFile?: string;

  @ApiProperty({ required: false })
  poApprovalDate?: Date;

  @ApiProperty({ required: false })
  hotelNeedByDate?: Date;

  @ApiProperty({ required: false })
  expectedDelivery?: Date;

  @ApiProperty({ required: false })
  cfaShopsSend?: Date;

  @ApiProperty({ required: false })
  cfaShopsApproved?: Date;

  @ApiProperty({ required: false })
  cfaShopsDelivered?: Date;

  @ApiProperty({ required: false })
  orderedDate?: Date;

  @ApiProperty({ required: false })
  shippedDate?: Date;

  @ApiProperty({ required: false })
  deliveredDate?: Date;

  @ApiProperty({ required: false })
  createdAt?: Date;

  @ApiProperty({ required: false })
  updatedAt?: Date;
}

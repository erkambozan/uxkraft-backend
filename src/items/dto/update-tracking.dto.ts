import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray, IsDateString } from 'class-validator';

export class UpdateTrackingDto {
  @ApiProperty({
    type: [Number],
    example: [1, 2, 3],
    description: 'Array of item IDs to update',
  })
  @IsArray()
  itemIds: number[];

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  poApprovalDate?: string;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  hotelNeedByDate?: string;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  expectedDelivery?: string;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  cfaShopsSend?: string;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  cfaShopsApproved?: string;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  cfaShopsDelivered?: string;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  orderedDate?: string;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  shippedDate?: string;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  deliveredDate?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  shippingNotes?: string;
}


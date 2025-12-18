import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsDateString,
  Min,
} from 'class-validator';

export class CreateItemDto {
  @ApiProperty({ example: '001', description: 'Item number' })
  @IsString()
  itemNumber: string;

  @ApiProperty({ example: 'BD-200', description: 'Specification number' })
  @IsString()
  specNumber: string;

  @ApiProperty({ example: 'Drapery', description: 'Item name' })
  @IsString()
  itemName: string;

  @ApiProperty({ example: 'ABC Drapery', description: 'Vendor name' })
  @IsString()
  vendor: string;

  @ApiProperty({ example: 'Sunrise Inn', description: 'Ship to location' })
  @IsString()
  shipTo: string;

  @ApiProperty({
    example: 'Sunrise Inn, 123 Sunshine Blvd, Miami, FL',
    description: 'Full shipping address',
    required: false,
  })
  @IsString()
  @IsOptional()
  shipToAddress?: string;

  @ApiProperty({
    example: 'ABC Drapery',
    description: 'Ship from location',
    required: false,
  })
  @IsString()
  @IsOptional()
  shipFrom?: string;

  @ApiProperty({ example: 2, description: 'Quantity' })
  @IsNumber()
  @Min(0)
  qty: number;

  @ApiProperty({ example: '01', description: 'Phase' })
  @IsString()
  phase: string;

  @ApiProperty({ example: 4800.0, description: 'Price' })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({
    example: 'Delicate product',
    description: 'Shipping notes',
    required: false,
  })
  @IsString()
  @IsOptional()
  shipNotes?: string;

  @ApiProperty({
    example: 'Check fabric when modifying',
    description: 'Notes for this item',
    required: false,
  })
  @IsString()
  @IsOptional()
  notes?: string;

  @ApiProperty({
    example: 'Guest Room',
    description: 'Location',
    required: false,
  })
  @IsString()
  @IsOptional()
  location?: string;

  @ApiProperty({
    example: 'Drapery',
    description: 'Category',
    required: false,
  })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiProperty({
    example: 'BD-200 2ND FLO...',
    description: 'Upload file name',
    required: false,
  })
  @IsString()
  @IsOptional()
  uploadFile?: string;

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
}



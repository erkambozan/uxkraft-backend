import { ApiProperty } from '@nestjs/swagger';
import { ItemResponseDto } from './item-response.dto';

export class PaginatedItemsResponseDto {
  @ApiProperty({ type: [ItemResponseDto] })
  items: ItemResponseDto[];

  @ApiProperty()
  total: number;

  @ApiProperty()
  page: number;

  @ApiProperty()
  limit: number;

  @ApiProperty()
  totalPages: number;
}

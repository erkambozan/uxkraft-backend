import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
import { CreateItemUseCase } from '../../application/items/use-cases/create-item.use-case';
import { GetItemsUseCase } from '../../application/items/use-cases/get-items.use-case';
import { GetItemByIdUseCase } from '../../application/items/use-cases/get-item-by-id.use-case';
import { UpdateItemUseCase } from '../../application/items/use-cases/update-item.use-case';
import { DeleteItemUseCase } from '../../application/items/use-cases/delete-item.use-case';
import { BulkEditItemsUseCase } from '../../application/items/use-cases/bulk-edit-items.use-case';
import { UpdateTrackingUseCase } from '../../application/items/use-cases/update-tracking.use-case';
import { BulkDeleteItemsUseCase } from '../../application/items/use-cases/bulk-delete-items.use-case';
import { CreateItemRequestDto } from '../../application/items/dtos/create-item-request.dto';
import { UpdateItemRequestDto } from '../../application/items/use-cases/update-item.use-case';
import { BulkEditItemsRequestDto } from '../../application/items/use-cases/bulk-edit-items.use-case';
import { UpdateTrackingRequestDto } from '../../application/items/use-cases/update-tracking.use-case';

@ApiTags('Items')
@Controller('items')
export class ItemsController {
  constructor(
    private readonly createItemUseCase: CreateItemUseCase,
    private readonly getItemsUseCase: GetItemsUseCase,
    private readonly getItemByIdUseCase: GetItemByIdUseCase,
    private readonly updateItemUseCase: UpdateItemUseCase,
    private readonly deleteItemUseCase: DeleteItemUseCase,
    private readonly bulkEditItemsUseCase: BulkEditItemsUseCase,
    private readonly updateTrackingUseCase: UpdateTrackingUseCase,
    private readonly bulkDeleteItemsUseCase: BulkDeleteItemsUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new item' })
  @ApiResponse({ status: 201, description: 'Item created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 409, description: 'Item number already exists' })
  create(@Body() createItemDto: CreateItemRequestDto) {
    return this.createItemUseCase.execute(createItemDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all items with pagination and filters' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'phase', required: false, type: String })
  @ApiQuery({ name: 'vendor', required: false, type: String })
  @ApiResponse({ status: 200, description: 'Items retrieved successfully' })
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('search') search?: string,
    @Query('phase') phase?: string,
    @Query('vendor') vendor?: string,
  ) {
    return this.getItemsUseCase.execute({ page, limit, search, phase, vendor });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single item by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Item retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Item not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.getItemByIdUseCase.execute(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an item' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Item updated successfully' })
  @ApiResponse({ status: 404, description: 'Item not found' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateItemDto: UpdateItemRequestDto,
  ) {
    return this.updateItemUseCase.execute(id, updateItemDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete an item' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204, description: 'Item deleted successfully' })
  @ApiResponse({ status: 404, description: 'Item not found' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.deleteItemUseCase.execute(id);
  }

  @Post('bulk-edit')
  @ApiOperation({ summary: 'Bulk edit multiple items' })
  @ApiResponse({ status: 200, description: 'Items updated successfully' })
  bulkEdit(@Body() bulkEditDto: BulkEditItemsRequestDto) {
    return this.bulkEditItemsUseCase.execute(bulkEditDto);
  }

  @Post('update-tracking')
  @ApiOperation({ summary: 'Update tracking for multiple items' })
  @ApiResponse({ status: 200, description: 'Tracking updated successfully' })
  updateTracking(@Body() updateTrackingDto: UpdateTrackingRequestDto) {
    return this.updateTrackingUseCase.execute(updateTrackingDto);
  }

  @Post('bulk-delete')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete multiple items' })
  @ApiResponse({ status: 200, description: 'Items deleted successfully' })
  bulkDelete(@Body() body: { itemIds: number[] }) {
    return this.bulkDeleteItemsUseCase.execute(body.itemIds);
  }
}


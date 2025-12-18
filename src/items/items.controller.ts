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
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { BulkEditDto } from './dto/bulk-edit.dto';
import { UpdateTrackingDto } from './dto/update-tracking.dto';

@ApiTags('Items')
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new item' })
  @ApiResponse({ status: 201, description: 'Item created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemsService.create(createItemDto);
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
    return this.itemsService.findAll(page, limit, search, phase, vendor);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single item by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Item retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Item not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.itemsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an item' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Item updated successfully' })
  @ApiResponse({ status: 404, description: 'Item not found' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateItemDto: UpdateItemDto,
  ) {
    return this.itemsService.update(id, updateItemDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an item' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Item deleted successfully' })
  @ApiResponse({ status: 404, description: 'Item not found' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.itemsService.remove(id);
  }

  @Post('bulk-edit')
  @ApiOperation({ summary: 'Bulk edit multiple items' })
  @ApiResponse({ status: 200, description: 'Items updated successfully' })
  bulkEdit(@Body() bulkEditDto: BulkEditDto) {
    return this.itemsService.bulkEdit(bulkEditDto);
  }

  @Post('update-tracking')
  @ApiOperation({ summary: 'Update tracking for multiple items' })
  @ApiResponse({ status: 200, description: 'Tracking updated successfully' })
  updateTracking(@Body() updateTrackingDto: UpdateTrackingDto) {
    return this.itemsService.updateTracking(updateTrackingDto);
  }

  @Post('bulk-delete')
  @ApiOperation({ summary: 'Delete multiple items' })
  @ApiResponse({ status: 200, description: 'Items deleted successfully' })
  bulkDelete(@Body() body: { itemIds: number[] }) {
    return this.itemsService.bulkDelete(body.itemIds);
  }
}



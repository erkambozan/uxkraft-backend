import { Item } from '../../../domain/items/entities/item.entity';
import { ItemResponseDto } from '../dtos/item-response.dto';

/**
 * Mapper to convert between Domain Entities and DTOs
 */
export class ItemMapper {
  static toResponseDto(item: Item): ItemResponseDto {
    return {
      id: item.getId()!,
      itemNumber: item.getItemNumber().getValue(),
      specNumber: item.getSpecNumber(),
      itemName: item.getItemName(),
      vendor: item.getVendor(),
      shipTo: item.getShippingAddress().getShipTo(),
      shipToAddress: item.getShippingAddress().getShipToAddress(),
      shipFrom: item.getShippingAddress().getShipFrom(),
      qty: item.getQuantity().getValue(),
      phase: item.getPhase(),
      price: item.getPrice().getValue(),
      shipNotes: item.getShipNotes(),
      notes: item.getNotes(),
      location: item.getLocation(),
      category: item.getCategory(),
      uploadFile: item.getUploadFile(),
      poApprovalDate: item.getTrackingDates().getPoApprovalDate(),
      hotelNeedByDate: item.getTrackingDates().getHotelNeedByDate(),
      expectedDelivery: item.getTrackingDates().getExpectedDelivery(),
      cfaShopsSend: item.getTrackingDates().getCfaShopsSend(),
      cfaShopsApproved: item.getTrackingDates().getCfaShopsApproved(),
      cfaShopsDelivered: item.getTrackingDates().getCfaShopsDelivered(),
      orderedDate: item.getTrackingDates().getOrderedDate(),
      shippedDate: item.getTrackingDates().getShippedDate(),
      deliveredDate: item.getTrackingDates().getDeliveredDate(),
      createdAt: item.getCreatedAt(),
      updatedAt: item.getUpdatedAt(),
    };
  }
}


import { Item } from '../../../../domain/items/entities/item.entity';
import { ItemOrmEntity } from '../../sequelize/models/item.orm-entity';
import { ItemShippingOrmEntity } from '../../sequelize/models/item-shipping.orm-entity';
import { ItemTrackingOrmEntity } from '../../sequelize/models/item-tracking.orm-entity';
import { ItemMetadataOrmEntity } from '../../sequelize/models/item-metadata.orm-entity';

/**
 * Mapper between Domain Entity and ORM Entities
 */
export class ItemMapper {
  static toDomainEntity(
    itemOrm: ItemOrmEntity,
    shippingOrm?: ItemShippingOrmEntity,
    trackingOrm?: ItemTrackingOrmEntity,
    metadataOrm?: ItemMetadataOrmEntity,
  ): Item {
    // Note: Validation is done in the repository layer to avoid throwing errors
    // during mapping. Invalid items are filtered out before mapping.
    return Item.create({
      id: itemOrm.id,
      itemNumber: itemOrm.itemNumber,
      specNumber: itemOrm.specNumber || '',
      itemName: itemOrm.itemName,
      vendor: itemOrm.vendor,
      shipTo: shippingOrm?.shipTo || '',
      shipToAddress: shippingOrm?.shipToAddress,
      shipFrom: shippingOrm?.shipFrom,
      qty: itemOrm.qty,
      phase: itemOrm.phase,
      price: Number(itemOrm.price),
      shipNotes: shippingOrm?.shipNotes,
      notes: metadataOrm?.notes,
      location: metadataOrm?.location,
      category: metadataOrm?.category,
      uploadFile: metadataOrm?.uploadFile,
      trackingDates: {
        poApprovalDate: trackingOrm?.poApprovalDate,
        hotelNeedByDate: trackingOrm?.hotelNeedByDate,
        expectedDelivery: trackingOrm?.expectedDelivery,
        cfaShopsSend: trackingOrm?.cfaShopsSend,
        cfaShopsApproved: trackingOrm?.cfaShopsApproved,
        cfaShopsDelivered: trackingOrm?.cfaShopsDelivered,
        orderedDate: trackingOrm?.orderedDate,
        shippedDate: trackingOrm?.shippedDate,
        deliveredDate: trackingOrm?.deliveredDate,
      },
      createdAt: itemOrm.createdAt,
      updatedAt: itemOrm.updatedAt,
    });
  }

  static toOrmEntities(item: Item): {
    item: any;
    shipping: any;
    tracking: any;
    metadata: any;
  } {
    const trackingDates = item.getTrackingDates();

    return {
      item: {
        id: item.getId() ?? undefined,
        itemNumber: item.getItemNumber().getValue(),
        specNumber: item.getSpecNumber(),
        itemName: item.getItemName(),
        vendor: item.getVendor(),
        qty: item.getQuantity().getValue(),
        phase: item.getPhase(),
        price: item.getPrice().getValue(),
      },
      shipping: {
        itemId: item.getId() ?? undefined,
        shipTo: item.getShippingAddress().getShipTo(),
        shipToAddress: item.getShippingAddress().getShipToAddress(),
        shipFrom: item.getShippingAddress().getShipFrom(),
        shipNotes: item.getShipNotes(),
      },
      tracking: {
        itemId: item.getId() ?? undefined,
        poApprovalDate: trackingDates.getPoApprovalDate(),
        hotelNeedByDate: trackingDates.getHotelNeedByDate(),
        expectedDelivery: trackingDates.getExpectedDelivery(),
        cfaShopsSend: trackingDates.getCfaShopsSend(),
        cfaShopsApproved: trackingDates.getCfaShopsApproved(),
        cfaShopsDelivered: trackingDates.getCfaShopsDelivered(),
        orderedDate: trackingDates.getOrderedDate(),
        shippedDate: trackingDates.getShippedDate(),
        deliveredDate: trackingDates.getDeliveredDate(),
      },
      metadata: {
        itemId: item.getId() ?? undefined,
        notes: item.getNotes(),
        location: item.getLocation(),
        category: item.getCategory(),
        uploadFile: item.getUploadFile(),
      },
    };
  }
}

import { ItemNumber } from '../value-objects/item-number.vo';
import { Price } from '../value-objects/price.vo';
import { Quantity } from '../value-objects/quantity.vo';
import { ShippingAddress } from '../value-objects/shipping-address.vo';
import { TrackingDates } from '../value-objects/tracking-dates.vo';

/**
 * Domain Entity representing an Item
 * Contains business logic and invariants
 */
export class Item {
  private constructor(
    private readonly id: number | null,
    private readonly itemNumber: ItemNumber,
    private readonly specNumber: string,
    private readonly itemName: string,
    private readonly vendor: string,
    private readonly shippingAddress: ShippingAddress,
    private readonly quantity: Quantity,
    private readonly phase: string,
    private readonly price: Price,
    private readonly trackingDates: TrackingDates,
    private readonly shipNotes?: string,
    private readonly notes?: string,
    private readonly location?: string,
    private readonly category?: string,
    private readonly uploadFile?: string,
    private readonly createdAt?: Date,
    private readonly updatedAt?: Date,
  ) {
    this.validate();
  }

  static create(props: {
    id?: number;
    itemNumber: string;
    specNumber: string;
    itemName: string;
    vendor: string;
    shipTo: string;
    shipToAddress?: string;
    shipFrom?: string;
    qty: number;
    phase: string;
    price: number;
    shipNotes?: string;
    notes?: string;
    location?: string;
    category?: string;
    uploadFile?: string;
    trackingDates?: {
      poApprovalDate?: Date;
      hotelNeedByDate?: Date;
      expectedDelivery?: Date;
      cfaShopsSend?: Date;
      cfaShopsApproved?: Date;
      cfaShopsDelivered?: Date;
      orderedDate?: Date;
      shippedDate?: Date;
      deliveredDate?: Date;
    };
    createdAt?: Date;
    updatedAt?: Date;
  }): Item {
    return new Item(
      props.id ?? null,
      ItemNumber.create(props.itemNumber),
      props.specNumber,
      props.itemName,
      props.vendor,
      ShippingAddress.create(props.shipTo, props.shipToAddress, props.shipFrom),
      Quantity.create(props.qty),
      props.phase,
      Price.create(props.price),
      props.trackingDates
        ? TrackingDates.create(props.trackingDates)
        : TrackingDates.create({}),
      props.shipNotes,
      props.notes,
      props.location,
      props.category,
      props.uploadFile,
      props.createdAt,
      props.updatedAt,
    );
  }

  private validate(): void {
    if (!this.specNumber || this.specNumber.trim().length === 0) {
      throw new Error('Specification number is required');
    }
    if (!this.itemName || this.itemName.trim().length === 0) {
      throw new Error('Item name is required');
    }
    if (!this.vendor || this.vendor.trim().length === 0) {
      throw new Error('Vendor is required');
    }
    if (!this.phase || this.phase.trim().length === 0) {
      throw new Error('Phase is required');
    }
  }

  getId(): number | null {
    return this.id;
  }

  getItemNumber(): ItemNumber {
    return this.itemNumber;
  }

  getSpecNumber(): string {
    return this.specNumber;
  }

  getItemName(): string {
    return this.itemName;
  }

  getVendor(): string {
    return this.vendor;
  }

  getShippingAddress(): ShippingAddress {
    return this.shippingAddress;
  }

  getQuantity(): Quantity {
    return this.quantity;
  }

  getPhase(): string {
    return this.phase;
  }

  getPrice(): Price {
    return this.price;
  }

  getTrackingDates(): TrackingDates {
    return this.trackingDates;
  }

  getShipNotes(): string | undefined {
    return this.shipNotes;
  }

  getNotes(): string | undefined {
    return this.notes;
  }

  getLocation(): string | undefined {
    return this.location;
  }

  getCategory(): string | undefined {
    return this.category;
  }

  getUploadFile(): string | undefined {
    return this.uploadFile;
  }

  getCreatedAt(): Date | undefined {
    return this.createdAt;
  }

  getUpdatedAt(): Date | undefined {
    return this.updatedAt;
  }

  getTotalValue(): Price {
    return this.price.multiply(this.quantity.getValue());
  }

  updateTrackingDates(trackingDates: {
    poApprovalDate?: Date;
    hotelNeedByDate?: Date;
    expectedDelivery?: Date;
    cfaShopsSend?: Date;
    cfaShopsApproved?: Date;
    cfaShopsDelivered?: Date;
    orderedDate?: Date;
    shippedDate?: Date;
    deliveredDate?: Date;
  }): Item {
    const updatedDates = this.trackingDates.updateDates(trackingDates);
    return new Item(
      this.id,
      this.itemNumber,
      this.specNumber,
      this.itemName,
      this.vendor,
      this.shippingAddress,
      this.quantity,
      this.phase,
      this.price,
      updatedDates,
      this.shipNotes,
      this.notes,
      this.location,
      this.category,
      this.uploadFile,
      this.createdAt,
      new Date(),
    );
  }

  updateDetails(updates: {
    location?: string;
    category?: string;
    shipFrom?: string;
    notes?: string;
  }): Item {
    const updatedShippingAddress = updates.shipFrom
      ? ShippingAddress.create(
          this.shippingAddress.getShipTo(),
          this.shippingAddress.getShipToAddress(),
          updates.shipFrom,
        )
      : this.shippingAddress;

    return new Item(
      this.id,
      this.itemNumber,
      this.specNumber,
      this.itemName,
      this.vendor,
      updatedShippingAddress,
      this.quantity,
      this.phase,
      this.price,
      this.trackingDates,
      this.shipNotes,
      updates.notes ?? this.notes,
      updates.location ?? this.location,
      updates.category ?? this.category,
      this.uploadFile,
      this.createdAt,
      new Date(),
    );
  }

  isInPhase(phase: string): boolean {
    return this.phase === phase;
  }

  isFromVendor(vendor: string): boolean {
    return this.vendor === vendor;
  }

  matchesSearch(searchTerm: string): boolean {
    const lowerSearch = searchTerm.toLowerCase();
    return (
      this.itemName.toLowerCase().includes(lowerSearch) ||
      this.itemNumber.getValue().toLowerCase().includes(lowerSearch) ||
      this.specNumber.toLowerCase().includes(lowerSearch)
    );
  }
}


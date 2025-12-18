/**
 * Value Object representing Tracking Dates for an Item
 */
export class TrackingDates {
  private constructor(
    private readonly poApprovalDate?: Date,
    private readonly hotelNeedByDate?: Date,
    private readonly expectedDelivery?: Date,
    private readonly cfaShopsSend?: Date,
    private readonly cfaShopsApproved?: Date,
    private readonly cfaShopsDelivered?: Date,
    private readonly orderedDate?: Date,
    private readonly shippedDate?: Date,
    private readonly deliveredDate?: Date,
  ) {
    this.validateDates();
  }

  static create(dates: {
    poApprovalDate?: Date;
    hotelNeedByDate?: Date;
    expectedDelivery?: Date;
    cfaShopsSend?: Date;
    cfaShopsApproved?: Date;
    cfaShopsDelivered?: Date;
    orderedDate?: Date;
    shippedDate?: Date;
    deliveredDate?: Date;
  }): TrackingDates {
    return new TrackingDates(
      dates.poApprovalDate,
      dates.hotelNeedByDate,
      dates.expectedDelivery,
      dates.cfaShopsSend,
      dates.cfaShopsApproved,
      dates.cfaShopsDelivered,
      dates.orderedDate,
      dates.shippedDate,
      dates.deliveredDate,
    );
  }

  private validateDates(): void {
    // Validate that shipped date is after ordered date
    if (this.orderedDate && this.shippedDate) {
      if (this.shippedDate < this.orderedDate) {
        throw new Error('Shipped date cannot be before ordered date');
      }
    }

    // Validate that delivered date is after shipped date
    if (this.shippedDate && this.deliveredDate) {
      if (this.deliveredDate < this.shippedDate) {
        throw new Error('Delivered date cannot be before shipped date');
      }
    }
  }

  getPoApprovalDate(): Date | undefined {
    return this.poApprovalDate;
  }

  getHotelNeedByDate(): Date | undefined {
    return this.hotelNeedByDate;
  }

  getExpectedDelivery(): Date | undefined {
    return this.expectedDelivery;
  }

  getCfaShopsSend(): Date | undefined {
    return this.cfaShopsSend;
  }

  getCfaShopsApproved(): Date | undefined {
    return this.cfaShopsApproved;
  }

  getCfaShopsDelivered(): Date | undefined {
    return this.cfaShopsDelivered;
  }

  getOrderedDate(): Date | undefined {
    return this.orderedDate;
  }

  getShippedDate(): Date | undefined {
    return this.shippedDate;
  }

  getDeliveredDate(): Date | undefined {
    return this.deliveredDate;
  }

  updateDates(updates: {
    poApprovalDate?: Date;
    hotelNeedByDate?: Date;
    expectedDelivery?: Date;
    cfaShopsSend?: Date;
    cfaShopsApproved?: Date;
    cfaShopsDelivered?: Date;
    orderedDate?: Date;
    shippedDate?: Date;
    deliveredDate?: Date;
  }): TrackingDates {
    return TrackingDates.create({
      poApprovalDate: updates.poApprovalDate ?? this.poApprovalDate,
      hotelNeedByDate: updates.hotelNeedByDate ?? this.hotelNeedByDate,
      expectedDelivery: updates.expectedDelivery ?? this.expectedDelivery,
      cfaShopsSend: updates.cfaShopsSend ?? this.cfaShopsSend,
      cfaShopsApproved: updates.cfaShopsApproved ?? this.cfaShopsApproved,
      cfaShopsDelivered: updates.cfaShopsDelivered ?? this.cfaShopsDelivered,
      orderedDate: updates.orderedDate ?? this.orderedDate,
      shippedDate: updates.shippedDate ?? this.shippedDate,
      deliveredDate: updates.deliveredDate ?? this.deliveredDate,
    });
  }
}


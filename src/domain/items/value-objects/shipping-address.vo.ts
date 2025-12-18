/**
 * Value Object representing a Shipping Address
 */
export class ShippingAddress {
  private constructor(
    private readonly shipTo: string,
    private readonly shipToAddress?: string,
    private readonly shipFrom?: string,
  ) {
    if (!shipTo || shipTo.trim().length === 0) {
      throw new Error('Ship to location cannot be empty');
    }
  }

  static create(
    shipTo: string,
    shipToAddress?: string,
    shipFrom?: string,
  ): ShippingAddress {
    return new ShippingAddress(
      shipTo.trim(),
      shipToAddress?.trim(),
      shipFrom?.trim(),
    );
  }

  getShipTo(): string {
    return this.shipTo;
  }

  getShipToAddress(): string | undefined {
    return this.shipToAddress;
  }

  getShipFrom(): string | undefined {
    return this.shipFrom;
  }

  getFullAddress(): string {
    if (this.shipToAddress) {
      return `${this.shipTo}, ${this.shipToAddress}`;
    }
    return this.shipTo;
  }

  equals(other: ShippingAddress): boolean {
    return (
      this.shipTo === other.shipTo &&
      this.shipToAddress === other.shipToAddress &&
      this.shipFrom === other.shipFrom
    );
  }
}


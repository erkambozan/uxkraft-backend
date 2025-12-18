/**
 * Value Object representing a Quantity
 * Enforces business rules for quantities
 */
export class Quantity {
  private constructor(private readonly value: number) {
    if (value < 0) {
      throw new Error('Quantity cannot be negative');
    }
    if (!Number.isInteger(value)) {
      throw new Error('Quantity must be an integer');
    }
    if (value > 1000000) {
      throw new Error('Quantity exceeds maximum allowed value');
    }
  }

  static create(value: number): Quantity {
    return new Quantity(Math.floor(value));
  }

  getValue(): number {
    return this.value;
  }

  add(other: Quantity): Quantity {
    return new Quantity(this.value + other.value);
  }

  subtract(other: Quantity): Quantity {
    if (this.value < other.value) {
      throw new Error('Cannot subtract larger quantity');
    }
    return new Quantity(this.value - other.value);
  }

  equals(other: Quantity): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value.toString();
  }
}




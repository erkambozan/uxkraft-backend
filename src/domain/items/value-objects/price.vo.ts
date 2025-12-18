/**
 * Value Object representing a Price
 * Enforces business rules for pricing
 */
export class Price {
  private constructor(private readonly value: number) {
    if (value < 0) {
      throw new Error('Price cannot be negative');
    }
    if (value > 999999999.99) {
      throw new Error('Price exceeds maximum allowed value');
    }
  }

  static create(value: number): Price {
    return new Price(Number(value.toFixed(2)));
  }

  getValue(): number {
    return this.value;
  }

  add(other: Price): Price {
    return new Price(this.value + other.value);
  }

  multiply(factor: number): Price {
    return new Price(this.value * factor);
  }

  equals(other: Price): boolean {
    return Math.abs(this.value - other.value) < 0.01;
  }

  toString(): string {
    return this.value.toFixed(2);
  }
}


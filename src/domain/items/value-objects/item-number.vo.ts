/**
 * Value Object representing an Item Number
 * Enforces business rules for item number format
 */
export class ItemNumber {
  private constructor(private readonly value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('Item number cannot be empty');
    }
    if (value.length > 50) {
      throw new Error('Item number cannot exceed 50 characters');
    }
  }

  static create(value: string | null | undefined): ItemNumber {
    if (!value) {
      throw new Error('Item number cannot be null or undefined');
    }
    return new ItemNumber(value.trim());
  }

  getValue(): string {
    return this.value;
  }

  equals(other: ItemNumber): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}




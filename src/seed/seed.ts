import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { Item } from '../models/item.model';

// Helper function to get random element from array
const random = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// Helper function to get random date within range
const randomDate = (start: Date, end: Date): Date => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
};

// Helper function to get random number in range
const randomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  // Sample data arrays for variety
  const specNumbers = [
    'BD-200',
    'BD-201',
    'BD-202',
    'BD-300',
    'BD-301',
    'CF-100',
    'CF-101',
    'CF-200',
    'LT-500',
    'LT-501',
    'LT-600',
    'HT-100',
    'HT-200',
  ];

  const itemNames = [
    'Drapery',
    'Curtains',
    'Blinds',
    'Shades',
    'Bedding Set',
    'Pillows',
    'Towels',
    'Bath Mat',
    'Rug',
    'Carpet',
    'Lamp',
    'Chandelier',
    'Wall Art',
    'Mirror',
    'Furniture',
    'Desk Chair',
    'Coffee Table',
    'Sofa',
    'Dining Table',
    'Cabinet',
  ];

  const vendors = [
    'ABC Drapery',
    'Modern Home Solutions',
    'Luxury Interiors Inc',
    'Premium Furnishings',
    'Elite Decor Co',
    'Style & Design LLC',
    'Comfort Living',
    'Elegant Home Goods',
    'Classic Interiors',
    'Contemporary Designs',
  ];

  const hotels = [
    'Sunrise Inn',
    'Grand Hotel',
    'Oceanview Resort',
    'Mountain Lodge',
    'City Center Hotel',
    'Beachside Resort',
    'Downtown Plaza',
    'Garden Inn',
    'Riverside Hotel',
    'Paradise Resort',
  ];

  const addresses = [
    '123 Sunshine Blvd, Miami, FL 33101',
    '456 Ocean Drive, Miami Beach, FL 33139',
    '789 Main Street, Orlando, FL 32801',
    '321 Park Avenue, New York, NY 10001',
    '654 Beach Road, San Diego, CA 92101',
    '987 Hill Street, Los Angeles, CA 90001',
    '147 River Road, Chicago, IL 60601',
    '258 Lake Drive, Seattle, WA 98101',
    '369 Mountain View, Denver, CO 80201',
    '741 Valley Road, Phoenix, AZ 85001',
  ];

  const phases = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'];

  const locations = [
    'Guest Room',
    'Lobby',
    'Restaurant',
    'Conference Room',
    'Spa',
    'Gym',
    'Pool Area',
    'Business Center',
    'Suite',
    'Penthouse',
    'Hallway',
    'Elevator',
  ];

  const categories = [
    'Drapery',
    'Furniture',
    'Lighting',
    'Bedding',
    'Bath',
    'Flooring',
    'Decor',
    'Electronics',
    'Kitchen',
    'Outdoor',
  ];

  const shipNotes = [
    'Delicate product - handle with care',
    'Fragile - requires special packaging',
    'Heavy item - use freight elevator',
    'Standard shipping',
    'Express delivery required',
    'White glove delivery service',
    'Installation included',
    'Assembly required on site',
    'Weather sensitive - indoor storage only',
    'Custom packaging required',
  ];

  const notes = [
    'Check fabric when modifying',
    'Verify dimensions before installation',
    'Color match required',
    'Custom finish requested',
    'Rush order - prioritize',
    'Standard specifications',
    'Review before final approval',
    'Special handling instructions',
    'Quality check required',
    'Installation date confirmed',
  ];

  // Create diverse sample items
  const items = Array.from({ length: 50 }, (_, i) => {
    const baseDate = new Date();
    const futureDate = new Date();
    futureDate.setMonth(futureDate.getMonth() + 6);

    const itemName = random(itemNames);
    const vendor = random(vendors);
    const hotel = random(hotels);
    const address = random(addresses);

    return {
      itemNumber: `ITEM-${String(i + 1).padStart(4, '0')}`,
      specNumber: random(specNumbers),
      itemName: itemName,
      vendor: vendor,
      shipTo: hotel,
      shipToAddress: `${hotel}, ${address}`,
      shipFrom: vendor,
      qty: randomInt(1, 20),
      phase: random(phases),
      price: parseFloat((Math.random() * 10000 + 500).toFixed(2)),
      shipNotes: random(shipNotes),
      notes: random(notes),
      location: random(locations),
      category: random(categories),
      uploadFile: `${random(specNumbers)} ${random(locations).toUpperCase()}...`,
      // Planning & Requirements dates (some items have dates, some don't)
      poApprovalDate:
        Math.random() > 0.3 ? randomDate(new Date(2024, 0, 1), baseDate) : null,
      hotelNeedByDate:
        Math.random() > 0.3
          ? randomDate(baseDate, futureDate)
          : null,
      expectedDelivery:
        Math.random() > 0.4
          ? randomDate(baseDate, futureDate)
          : null,
      // Production & Shop dates
      cfaShopsSend:
        Math.random() > 0.5
          ? randomDate(new Date(2024, 0, 1), baseDate)
          : null,
      cfaShopsApproved:
        Math.random() > 0.5
          ? randomDate(new Date(2024, 0, 1), baseDate)
          : null,
      cfaShopsDelivered:
        Math.random() > 0.6
          ? randomDate(new Date(2024, 0, 1), baseDate)
          : null,
      // Shipping dates
      orderedDate:
        Math.random() > 0.4
          ? randomDate(new Date(2024, 0, 1), baseDate)
          : null,
      shippedDate:
        Math.random() > 0.5
          ? randomDate(new Date(2024, 0, 1), baseDate)
          : null,
      deliveredDate:
        Math.random() > 0.6
          ? randomDate(new Date(2024, 0, 1), baseDate)
          : null,
    };
  });

  try {
    await Item.bulkCreate(items as any, { ignoreDuplicates: true });
    console.log(`✅ Seed data created successfully! ${items.length} items added.`);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
  }

  await app.close();
}

void bootstrap();

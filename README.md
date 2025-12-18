# UXKraft Backend API

> Backend API for UXKraft Items Management System built with NestJS, Sequelize, and PostgreSQL.  
> **Architecture**: Domain-Driven Design (DDD) with Clean Code principles.

[![NestJS](https://img.shields.io/badge/NestJS-11.0.1-E0234E?logo=nestjs)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-12+-336791?logo=postgresql)](https://www.postgresql.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js)](https://nodejs.org/)
[![DDD](https://img.shields.io/badge/Architecture-DDD-blue)](https://martinfowler.com/bliki/DomainDrivenDesign.html)

## 📋 Table of Contents

- [Features](#-features)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Running the Application](#-running-the-application)
- [Database Setup](#-database-setup)
- [API Endpoints](#-api-endpoints)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Scripts](#-scripts)
- [Database Schema](#-database-schema)
- [Testing](#-testing)

## ✨ Features

- **Domain-Driven Design (DDD)** architecture with clean separation of concerns
- **Clean Code** principles with SOLID design patterns
- RESTful API for items management
- **Normalized database schema** with proper relationships
- Pagination and filtering support
- Bulk operations (edit, delete, tracking update)
- Swagger API documentation
- TypeScript for type safety
- Value Objects and Domain Entities for business logic
- Repository pattern for data access abstraction
- Input validation with class-validator
- CORS enabled for frontend integration
- Transactional data operations

## 🏗️ Architecture

This project follows **Domain-Driven Design (DDD)** principles with a layered architecture:

### Layer Structure

```
┌─────────────────────────────────────┐
│   Presentation Layer (API)          │  ← Controllers, DTOs
├─────────────────────────────────────┤
│   Application Layer (Use Cases)     │  ← Business use cases, Application DTOs
├─────────────────────────────────────┤
│   Domain Layer (Business Logic)     │  ← Entities, Value Objects, Interfaces
├─────────────────────────────────────┤
│   Infrastructure Layer (Persistence)│  ← Repositories, ORM Entities
└─────────────────────────────────────┘
```

### Key Principles

- **Domain Layer**: Contains business logic, entities, and value objects
- **Application Layer**: Orchestrates use cases and coordinates domain operations
- **Infrastructure Layer**: Implements persistence and external services
- **Presentation Layer**: Handles HTTP requests and responses
- **Dependency Inversion**: Domain layer doesn't depend on infrastructure
- **Single Responsibility**: Each class has one reason to change
- **Repository Pattern**: Abstracts data access from business logic

## 🛠 Tech Stack

- **Framework**: [NestJS](https://nestjs.com/) v11.0.1
- **Language**: TypeScript 5.7.3
- **ORM**: Sequelize 6.37.7 with sequelize-typescript
- **Database**: PostgreSQL 12+
- **Architecture**: Domain-Driven Design (DDD)
- **Documentation**: Swagger/OpenAPI
- **Validation**: class-validator, class-transformer
- **Testing**: Jest

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **PostgreSQL** (v12 or higher) - [Download](https://www.postgresql.org/download/)
- **npm** or **yarn** package manager

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd uxkraft-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create PostgreSQL database**
   ```sql
   CREATE DATABASE uxkraft_db;
   ```

## ⚙️ Configuration

1. **Create environment file**
   ```bash
   cp .env.example .env
   ```

2. **Update `.env` with your configuration**
   ```env
   # Database Configuration
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=your_password
   DB_NAME=uxkraft_db

   # Application Configuration
   PORT=3000
   NODE_ENV=development

   # Frontend Configuration
   FRONTEND_URL=http://localhost:5173
   ```

## ▶️ Running the Application

### Development Mode

```bash
npm run start:dev
```

The application will start with hot-reload enabled. Any changes to the source code will automatically restart the server.

### Production Mode

```bash
# Build the application
npm run build

# Start in production mode
npm run start:prod
```

### Debug Mode

```bash
npm run start:debug
```

The API will be available at:
- **API**: `http://localhost:3000`
- **Swagger Documentation**: `http://localhost:3000/api`

## 🗄️ Database Setup

### Initial Setup

The database uses **normalized schema** with 4 related tables. On first run, Sequelize will automatically create the tables if `synchronize: true` is enabled in development mode.

### Clean Database

If you need to clean the database (removes all data):

```bash
npm run clean:db
```

**⚠️ Warning**: This will delete all data from all tables!

### Seed Database

Populate the database with sample data:

```bash
npm run seed
```

Or clean and seed in one go:

```bash
npm run clean:db && npm run seed
```

This will create 50 diverse items with varied data including:
- Different item names, vendors, hotels, and locations
- Various phases, categories, and quantities
- Random dates for planning, production, and shipping
- Realistic pricing and notes

## 📡 API Endpoints

### Items

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/items` | Get all items (with pagination and filters) |
| `GET` | `/items/:id` | Get single item by ID |
| `POST` | `/items` | Create new item |
| `PATCH` | `/items/:id` | Update item |
| `DELETE` | `/items/:id` | Delete item |
| `POST` | `/items/bulk-edit` | Bulk edit multiple items |
| `POST` | `/items/update-tracking` | Update tracking dates for items |
| `POST` | `/items/bulk-delete` | Delete multiple items |

### Query Parameters

**GET /items** supports the following query parameters:

- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `search` - Search in itemName, itemNumber, or specNumber
- `phase` - Filter by phase (use 'all' to show all phases)
- `vendor` - Filter by vendor (use 'all' to show all vendors)

**Example:**
```bash
GET /items?page=1&limit=20&search=drapery&phase=01&vendor=ABC%20Drapery
```

## 📚 API Documentation

Once the application is running, visit the Swagger documentation at:

**http://localhost:3000/api**

The Swagger UI provides:
- Interactive API testing
- Request/response schemas
- Authentication details (if applicable)
- Try-it-out functionality

## 📁 Project Structure

```
uxkraft-backend/
├── src/
│   ├── domain/                    # Domain Layer (Business Logic)
│   │   └── items/
│   │       ├── entities/          # Domain entities with business rules
│   │       │   └── item.entity.ts
│   │       ├── value-objects/     # Immutable value objects
│   │       │   ├── item-number.vo.ts
│   │       │   ├── price.vo.ts
│   │       │   ├── quantity.vo.ts
│   │       │   ├── shipping-address.vo.ts
│   │       │   └── tracking-dates.vo.ts
│   │       └── repositories/      # Repository interfaces
│   │           └── item.repository.interface.ts
│   │
│   ├── application/               # Application Layer (Use Cases)
│   │   └── items/
│   │       ├── use-cases/         # Business use cases
│   │       │   ├── create-item.use-case.ts
│   │       │   ├── get-items.use-case.ts
│   │       │   ├── get-item-by-id.use-case.ts
│   │       │   ├── update-item.use-case.ts
│   │       │   ├── delete-item.use-case.ts
│   │       │   ├── bulk-edit-items.use-case.ts
│   │       │   ├── update-tracking.use-case.ts
│   │       │   └── bulk-delete-items.use-case.ts
│   │       ├── dtos/              # Application DTOs
│   │       │   ├── create-item-request.dto.ts
│   │       │   ├── item-response.dto.ts
│   │       │   └── paginated-items-response.dto.ts
│   │       └── mappers/           # Entity-DTO mappers
│   │           └── item.mapper.ts
│   │
│   ├── infrastructure/            # Infrastructure Layer
│   │   └── database/
│   │       ├── repositories/     # Repository implementations
│   │       │   ├── sequelize-item.repository.ts
│   │       │   └── mappers/
│   │       │       └── item-orm.mapper.ts
│   │       └── sequelize/
│   │           └── models/       # ORM entities
│   │               ├── item.orm-entity.ts
│   │               ├── item-shipping.orm-entity.ts
│   │               ├── item-tracking.orm-entity.ts
│   │               └── item-metadata.orm-entity.ts
│   │
│   ├── presentation/              # Presentation Layer (API)
│   │   └── items/
│   │       └── items.controller.ts
│   │
│   ├── items/                     # Module configuration
│   │   └── items.module.ts
│   │
│   ├── config/                    # Configuration files
│   │   └── database.config.ts
│   ├── seed/                      # Database seeding
│   │   └── seed.ts
│   ├── scripts/                   # Utility scripts
│   │   └── clean-database.ts
│   ├── app.module.ts              # Root module
│   ├── app.controller.ts
│   ├── app.service.ts
│   └── main.ts                    # Application entry point
├── test/                          # E2E tests
├── package.json
├── tsconfig.json
└── README.md
```

## 📜 Scripts

| Command | Description |
|---------|-------------|
| `npm run build` | Build the application |
| `npm run start` | Start the application |
| `npm run start:dev` | Start in development mode (watch mode) |
| `npm run start:debug` | Start in debug mode |
| `npm run start:prod` | Start in production mode |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |
| `npm run test` | Run unit tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:cov` | Run tests with coverage |
| `npm run test:e2e` | Run end-to-end tests |
| `npm run seed` | Seed the database with sample data |
| `npm run clean:db` | Clean all data from database |

## 🗄️ Database Schema

The database uses a **normalized schema** with 4 related tables:

### 1. `items` (Parent Table)

Core item information:

- `id` - Primary key (auto-increment)
- `itemNumber` - Unique item identifier
- `specNumber` - Specification number
- `itemName` - Item name
- `vendor` - Vendor name
- `qty` - Quantity
- `phase` - Project phase
- `price` - Item price
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

### 2. `item_shipping` (Child Table - One-to-One)

Shipping information:

- `itemId` - Foreign key (references `items.id`)
- `shipTo` - Shipping destination
- `shipToAddress` - Shipping address
- `shipFrom` - Shipping origin
- `shipNotes` - Shipping notes
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

### 3. `item_tracking` (Child Table - One-to-One)

Tracking dates:

- `itemId` - Foreign key (references `items.id`)
- **Planning & Requirements:**
  - `poApprovalDate` - PO approval date
  - `hotelNeedByDate` - Hotel need-by date
  - `expectedDelivery` - Expected delivery date
- **Production & Shop:**
  - `cfaShopsSend` - CFA shops send date
  - `cfaShopsApproved` - CFA shops approval date
  - `cfaShopsDelivered` - CFA shops delivery date
- **Shipping:**
  - `orderedDate` - Order date
  - `shippedDate` - Ship date
  - `deliveredDate` - Delivery date
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

### 4. `item_metadata` (Child Table - One-to-One)

Additional metadata:

- `itemId` - Foreign key (references `items.id`)
- `notes` - General notes
- `location` - Item location
- `category` - Item category
- `uploadFile` - Uploaded file reference
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

### Relationships

```
items (1) ──< (1) item_shipping
items (1) ──< (1) item_tracking
items (1) ──< (1) item_metadata
```

All relationships are **one-to-one** with `items` as the parent table.

## 🧪 Testing

### Unit Tests

```bash
npm run test
```

### Watch Mode

```bash
npm run test:watch
```

### Coverage

```bash
npm run test:cov
```

### E2E Tests

```bash
npm run test:e2e
```

## 🏛️ Domain-Driven Design Concepts

### Value Objects

Immutable objects that represent domain concepts:
- `ItemNumber` - Validates and encapsulates item number
- `Price` - Ensures price is non-negative and properly formatted
- `Quantity` - Validates quantity constraints
- `ShippingAddress` - Encapsulates shipping information
- `TrackingDates` - Manages and validates date relationships

### Domain Entities

Rich domain models with business logic:
- `Item` - Main aggregate root with business rules and invariants

### Use Cases

Application layer orchestrates business operations:
- Each use case handles a single business operation
- Coordinates between domain entities and repositories
- Returns application DTOs

### Repository Pattern

- **Interface** defined in domain layer (`IItemRepository`)
- **Implementation** in infrastructure layer (`SequelizeItemRepository`)
- Provides abstraction over data persistence

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is private and unlicensed.

## 👤 Author

UXKraft Development Team

---

**Note**: 
- Make sure PostgreSQL is running and the database is created before starting the application.
- If you encounter issues with old data, run `npm run clean:db` to clean the database.
- The application uses DDD principles - changes to business logic should be made in the domain layer.

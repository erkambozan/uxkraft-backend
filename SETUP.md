# Backend Setup Guide

## Prerequisites

1. **PostgreSQL** - Make sure PostgreSQL is installed and running
2. **Node.js** - Version 18 or higher
3. **npm** - Package manager

## Installation Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Database

Create a PostgreSQL database:

```sql
CREATE DATABASE uxkraft_db;
```

### 3. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` with your database credentials:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=uxkraft_db
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### 4. Run Database Migrations

The application uses Sequelize with `synchronize: true` in development mode, which will automatically create tables on startup.

### 5. Seed Database (Optional)

To populate the database with sample data:

```bash
npm run seed
```

### 6. Start the Server

Development mode:
```bash
npm run start:dev
```

Production mode:
```bash
npm run build
npm run start:prod
```

The API will be available at:
- **API**: http://localhost:3000
- **Swagger Documentation**: http://localhost:3000/api

## API Endpoints

### Items

- `GET /items` - Get all items (with pagination and filters)
  - Query params: `page`, `limit`, `search`, `phase`, `vendor`
- `GET /items/:id` - Get single item
- `POST /items` - Create new item
- `PATCH /items/:id` - Update item
- `DELETE /items/:id` - Delete item
- `POST /items/bulk-edit` - Bulk edit items
- `POST /items/update-tracking` - Update tracking for items
- `POST /items/bulk-delete` - Delete multiple items

## Testing the API

You can test the API using:
1. **Swagger UI**: Visit http://localhost:3000/api
2. **Postman** or any HTTP client
3. **cURL** commands

Example:
```bash
# Get all items
curl http://localhost:3000/items

# Get items with pagination
curl http://localhost:3000/items?page=1&limit=10

# Search items
curl http://localhost:3000/items?search=drapery
```

## Troubleshooting

### Database Connection Issues

- Verify PostgreSQL is running
- Check database credentials in `.env`
- Ensure the database exists

### Port Already in Use

- Change `PORT` in `.env` to a different port
- Or stop the process using port 3000

### CORS Issues

- Make sure `FRONTEND_URL` in `.env` matches your frontend URL
- Default is `http://localhost:5173` (Vite default)



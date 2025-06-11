# Backend

This is the Express.js backend for the Office Food Ordering System.

## Setup

1. Copy `.env.example` to `.env` and update values.
2. Run `npm install`.
3. Start with `npm run dev` for development.

## API Endpoints

- `POST /api/auth/register` – Register user
- `POST /api/auth/login` – Login and receive JWT
- `GET /api/restaurants` – List restaurants (auth required)
- `POST /api/restaurants` – Create restaurant (admin only)
- `GET /api/calendar/today` – Get today restaurants (auth required)
- `POST /api/calendar` – Set restaurants for a day (admin only)
- `POST /api/orders` – Place order (auth required)
- `GET /api/orders/mine` – User order history
- `GET /api/admin/orders` – Admin list orders by day/restaurant
- `GET /api/admin/orders/export` – Export orders CSV

## Exporting Orders

The admin can export orders for a specific day and restaurant using the `/api/admin/orders/export?date=YYYY-MM-DD&restaurantId=...` endpoint. The controller uses `fast-csv` to generate the CSV file.

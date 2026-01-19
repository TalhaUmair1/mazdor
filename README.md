# Mazdor - Service Provider Platform

Mazdor is a comprehensive service provider platform built with Nuxt 3, designed to connect skilled professionals with customers seeking various services.

## Features

- User authentication and authorization
- Service listing and discovery
- Profile management for service providers
- Search functionality with location-based filtering
- Hierarchical location data for Pakistan (provinces, cities, famous landmarks)
- Responsive design

## Location Data

The application includes a comprehensive hierarchical location system for Pakistan with:
- 5 provinces
- 50+ major cities
- Over 250 famous landmarks and areas
- Proper parent-child relationships maintained in the database

The location data includes famous Pakistani cities and their notable landmarks such as:
- Lahore: Badshahi Mosque, Lahore Fort, Shalimar Gardens, Anarkali Bazaar
- Karachi: Clifton, Sea View, Mohatta Palace, Burns Road
- Islamabad: Faisal Mosque, Pakistan Monument, Daman-e-Koh
- Peshawar: Qissa Khwani Bazaar, Peshawar Fort
- And many more cities across Pakistan

## Setup

Make sure to install dependencies:

```bash
# pnpm
pnpm install

# npm
npm install

# yarn
yarn install
```

## Database Setup

Before running the application, make sure to:

1. Set up your database connection in the `.env` file
2. Run database migrations
3. Seed the location data using the provided script: `pnpm seed:locations`

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# pnpm
pnpm dev

# npm
npm run dev

# yarn
yarn dev
```

## Deployment

Check out the [Nuxt deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
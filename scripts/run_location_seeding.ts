#!/usr/bin/env node

/**
 * Script to seed Pakistan location data into the database
 * Usage: pnpm tsx scripts/run_location_seeding.ts
 */

import { seedLocations } from './seed_locations_corrected';

console.log('Starting Pakistan location seeding process...');

seedLocations()
  .then(() => {
    console.log('Pakistan location seeding completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error during location seeding:', error);
    process.exit(1);
  });
# Seeding Pakistan Locations

This document explains how to seed hierarchical Pakistan location data into the database.

## Location Hierarchy

The location data follows a 3-level hierarchy:

1. **Provinces** (Top level, no parent)
2. **Cities** (Second level, parent is province)
3. **Landmarks/Areas** (Third level, parent is city)

## Provinces Included

- Punjab
- Sindh
- Khyber Pakhtunkhwa
- Balochistan
- Islamabad Capital Territory

## Major Cities Included

- Punjab: Lahore, Rawalpindi, Faisalabad, Multan, Gujranwala
- Sindh: Karachi, Hyderabad, Sukkur
- KPK: Peshawar, Abbottabad, Mingora (Swat)
- Balochistan: Quetta, Gwadar
- ICT: Islamabad

## Landmark Types

Various famous landmarks and areas are included for each major city:

- Historical sites and monuments
- Famous bazaars and markets
- Notable neighborhoods and districts
- Cultural and recreational areas
- Government buildings and institutions

## Seeding Process

The seeding process correctly maintains the parent-child relationships in the database:

1. All locations are inserted into the database
2. An ID mapping is maintained between the original IDs and database-generated IDs
3. Foreign key relationships are updated using the actual database IDs
4. Foreign key constraints are temporarily disabled during seeding to avoid conflicts

## Total Locations

Approximately 300+ hierarchical locations are created, with:
- 5 provinces
- 50+ major cities
- 250+ famous landmarks and areas

## Verification

After seeding, you can verify the hierarchy by checking:
- The `locations` table in the database
- Using the API endpoint `/api/locations`
- Running the hierarchy verification script
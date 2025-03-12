import {
  serial,
  varchar,
  text,
  decimal,
  pgTable,
  integer,
  primaryKey,
  index,
  timestamp,
  uuid,
  customType,
} from 'drizzle-orm/pg-core'
import { relations, sql } from 'drizzle-orm'

// Define the PostGIS geometry type
const geometry = customType<{ data: string }>({
  dataType() {
    return 'geometry'
  },
})

export const services = pgTable('services', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  svg: varchar('svg', { length: 500 }).notNull(),
  view_box: varchar('view_box', { length: 10 }).notNull(),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
})

export const users = pgTable('users', {
  id: serial('id')
    .primaryKey()
    .default(sql`nextval('users_id_seq')`),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  phone: varchar('phone', { length: 11 }).unique(),
  whatsapp: varchar('whatsapp', { length: 11 }).unique(),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
})

export const profile = pgTable(
  'profile',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    title: varchar('title', { length: 255 }).notNull(),
    service_id: integer('service_id')
      .references(() => services.id)
      .notNull(),
    user_id: integer('user_id')
      .references(() => users.id)
      .notNull(),
    min_price: decimal('min_price', { precision: 10, scale: 2 }).notNull(),
    service_type: varchar('service_type', { length: 255 }).notNull(),
    shop_address: varchar('shop_address').notNull(),
    description: text('description').notNull(),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow(),
    deleted_at: timestamp('deleted_at'),
  },
  (profile) => ({
    serviceIdIdx: index('service_id_idx').on(profile.service_id),
    userIdIdx: index('user_id_idx').on(profile.user_id),
  })
)

export const locations = pgTable(
  'locations',
  {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 200 }),
    // Replace latitude and longitude with a PostGIS geometry column
    location: geometry('location').notNull(),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow(),
    // Add a spatial index
  },
  (locations) => ({
    locationIdx: index('location_idx').on(locations.location),
  })
)

export const profilesToLocations = pgTable(
  'profiles_to_locations',
  {
    profileId: uuid('profile_id')
      .notNull()
      .references(() => profile.id),
    locationId: integer('location_id')
      .notNull()
      .references(() => locations.id),
  },
  (t) => ({
    pk: primaryKey(t.profileId, t.locationId),
    profileIdIdx: index('profile_id_idx').on(t.profileId),
    locationIdIdx: index('location_id_idx').on(t.locationId),
  })
)

// Relations
export const profileRelations = relations(profile, ({ many }) => ({
  profilesToLocations: many(profilesToLocations),
}))

export const locationsRelations = relations(locations, ({ many }) => ({
  profilesToLocations: many(profilesToLocations),
}))

export const profilesToLocationsRelations = relations(
  profilesToLocations,
  ({ one }) => ({
    profile: one(profile, {
      fields: [profilesToLocations.profileId],
      references: [profile.id],
    }),
    location: one(locations, {
      fields: [profilesToLocations.locationId],
      references: [locations.id],
    }),
  })
)

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
  pgEnum,
  AnyPgColumn,
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
export const serviceTypeEnum = pgEnum('service_type', [
  'homeOnly',
  'shopOnly',
  'Both',
])
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
    service_type: serviceTypeEnum('service_type').notNull(),
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
    location: geometry('location', {
      type: 'point',
      mode: 'xy',
      srid: 4326,
    }).notNull(),
    parentId: integer('parent_id').references((): AnyPgColumn => locations.id),
  },
  (t) => [index('spatial_index').using('gist', t.location)]
)

export const locationsRelations = relations(locations, ({ one, many }) => ({
  parent: one(locations, {
    fields: [locations.parentId],
    references: [locations.id],
  }),
  children: many(locations),
}))

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

export const profileRelations = relations(profile, ({ many }) => ({
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

export const profilesWithUsers = relations(profile, ({ one }) => ({
  user: one(users, {
    fields: [profile.user_id],
    references: [users.id],
  }),
}))

export const usersRelations = relations(users, ({ many }) => ({
  profiles: many(profile),
}))

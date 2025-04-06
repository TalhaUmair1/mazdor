import { relations } from 'drizzle-orm'
import {
  decimal,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'

// Define enums first before tables
export const serviceTypeEnum = pgEnum('service_type', [
  'homeOnly',
  'shopOnly',
  'both',
])

export const services = pgTable('services', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  svg: text('svg').notNull(),
  view_box: varchar('view_box', { length: 100 }).notNull(),
})

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  phone: varchar('phone', { length: 11 }).unique(),
  whatsapp: varchar('whatsapp', { length: 11 }).unique(),
  avatar: varchar('avatar', { length: 255 }),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
})

export const locations = pgTable('locations', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 200 }),
  parentId: integer('parent_id'),
})

export const locationsRelations = relations(locations, ({ one, many }) => ({
  parent: one(locations, {
    fields: [locations.parentId],
    references: [locations.id],
  }),
  children: many(locations),
}))

export const profile = pgTable('profile', {
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
})

export const profileServiceAreas = pgTable(
  'profile_service_areas',
  {
    profileId: uuid('profile_id')
      .notNull()
      .references(() => profile.id),
    locationId: integer('location_id')
      .notNull()
      .references(() => locations.id),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.profileId, table.locationId] }),
  })
)

export const profileRelations = relations(profile, ({ many, one }) => ({
  serviceAreas: many(profileServiceAreas),
  user: one(users, {
    fields: [profile.user_id],
    references: [users.id],
  }),
}))

export const usersRelations = relations(users, ({ many }) => ({
  profiles: many(profile),
}))

export const profileServiceAreasRelations = relations(
  profileServiceAreas,
  ({ one }) => ({
    profile: one(profile, {
      fields: [profileServiceAreas.profileId],
      references: [profile.id],
    }),
    location: one(locations, {
      fields: [profileServiceAreas.locationId],
      references: [locations.id],
    }),
  })
)

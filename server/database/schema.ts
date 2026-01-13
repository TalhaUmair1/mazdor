import { relations } from 'drizzle-orm'
import {
  integer,
  primaryKey,
  sqliteTable,
  text,
  real,
} from 'drizzle-orm/sqlite-core'

// Define enums using text with check constraints for SQLite
export const services = sqliteTable('services', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  svg: text('svg').notNull(),
  view_box: text('view_box').notNull(),
})

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  phone: text('phone', { length: 11 }).unique(),
  whatsapp: text('whatsapp', { length: 11 }).unique(),
  avatar: text('avatar'),
  created_at: integer('created_at', { mode: 'timestamp' }).default(new Date()),
  updated_at: integer('updated_at', { mode: 'timestamp' }).default(new Date()),
})

export const locations = sqliteTable('locations', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name'),
  parentId: integer('parent_id'),
})

export const locationsRelations = relations(locations, ({ one, many }) => ({
  parent: one(locations, {
    fields: [locations.parentId],
    references: [locations.id],
  }),
  children: many(locations),
}))

export const profile = sqliteTable('profile', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  title: text('title').notNull(),
  service_id: integer('service_id')
    .references(() => services.id)
    .notNull(),
  user_id: integer('user_id')
    .references(() => users.id)
    .notNull(),
  min_price: real('min_price').notNull(),
  service_type: text('service_type', { enum: ['homeOnly', 'shopOnly', 'both'] }).notNull(),
  shop_address: text('shop_address').notNull(),
  description: text('description').notNull(),
  experience: integer('experience').notNull(),
  created_at: integer('created_at', { mode: 'timestamp' }).default(new Date()),
  updated_at: integer('updated_at', { mode: 'timestamp' }).default(new Date()),
  deleted_at: integer('deleted_at', { mode: 'timestamp' }),
})

export const profileServiceAreas = sqliteTable(
  'profile_service_areas',
  {
    profileId: text('profile_id')
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
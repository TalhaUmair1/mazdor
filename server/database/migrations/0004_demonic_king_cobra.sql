CREATE TYPE "public"."service_type" AS ENUM('homeOnly', 'shopOnly', 'Both');--> statement-breakpoint
DROP INDEX "location_idx";--> statement-breakpoint
ALTER TABLE "profile" ALTER COLUMN "service_type" SET DATA TYPE service_type;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "id" SET DEFAULT nextval('users_id_seq');--> statement-breakpoint
ALTER TABLE "locations" ADD COLUMN "parent_id" integer;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "avatar" varchar(255);--> statement-breakpoint
ALTER TABLE "locations" ADD CONSTRAINT "locations_parent_id_locations_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."locations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "spatial_index" ON "locations" USING gist ("location");--> statement-breakpoint
ALTER TABLE "locations" DROP COLUMN "created_at";--> statement-breakpoint
ALTER TABLE "locations" DROP COLUMN "updated_at";
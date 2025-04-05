ALTER TABLE "locations" DROP CONSTRAINT "locations_parent_id_locations_id_fk";
--> statement-breakpoint
DROP INDEX "spatial_index";--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "locations" ADD CONSTRAINT "locations_self_ref" FOREIGN KEY ("parent_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "location_parent_idx" ON "locations" USING btree ("parent_id");--> statement-breakpoint
ALTER TABLE "locations" DROP COLUMN "location";
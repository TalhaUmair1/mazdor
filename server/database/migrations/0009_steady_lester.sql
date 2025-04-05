ALTER TABLE "locations" DROP CONSTRAINT "locations_self_ref";
--> statement-breakpoint
DROP INDEX "location_parent_idx";--> statement-breakpoint
DROP INDEX "service_id_idx";--> statement-breakpoint
DROP INDEX "user_id_idx";--> statement-breakpoint
DROP INDEX "profile_id_idx";--> statement-breakpoint
DROP INDEX "location_id_idx";
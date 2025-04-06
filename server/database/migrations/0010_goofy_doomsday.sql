ALTER TABLE "profiles_to_locations" RENAME TO "profile_service_areas";--> statement-breakpoint
ALTER TABLE "profile_service_areas" DROP CONSTRAINT "profiles_to_locations_profile_id_profile_id_fk";
--> statement-breakpoint
ALTER TABLE "profile_service_areas" DROP CONSTRAINT "profiles_to_locations_location_id_locations_id_fk";
--> statement-breakpoint
ALTER TABLE "profile_service_areas" DROP CONSTRAINT "profiles_to_locations_profile_id_location_id_pk";--> statement-breakpoint
ALTER TABLE "profile_service_areas" ADD CONSTRAINT "profile_service_areas_profile_id_location_id_pk" PRIMARY KEY("profile_id","location_id");--> statement-breakpoint
ALTER TABLE "profile_service_areas" ADD CONSTRAINT "profile_service_areas_profile_id_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profile"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profile_service_areas" ADD CONSTRAINT "profile_service_areas_location_id_locations_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."locations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "services" DROP COLUMN "created_at";--> statement-breakpoint
ALTER TABLE "services" DROP COLUMN "updated_at";--> statement-breakpoint
ALTER TABLE "public"."profile" ALTER COLUMN "service_type" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."service_type";--> statement-breakpoint
CREATE TYPE "public"."service_type" AS ENUM('homeOnly', 'shopOnly', 'both');--> statement-breakpoint
ALTER TABLE "public"."profile" ALTER COLUMN "service_type" SET DATA TYPE "public"."service_type" USING "service_type"::"public"."service_type";
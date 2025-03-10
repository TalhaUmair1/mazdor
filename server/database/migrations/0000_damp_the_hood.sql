CREATE TABLE "locations" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(200),
	"location" geometry NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "profile" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"service_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"min_price" numeric(10, 2) NOT NULL,
	"service_type" varchar(255) NOT NULL,
	"shop_address" varchar NOT NULL,
	"description" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "profiles_to_locations" (
	"profile_id" uuid NOT NULL,
	"location_id" integer NOT NULL,
	CONSTRAINT "profiles_to_locations_profile_id_location_id_pk" PRIMARY KEY("profile_id","location_id")
);
--> statement-breakpoint
CREATE TABLE "services" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"svg" varchar(500) NOT NULL,
	"view_box" varchar(10) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(11),
	"whatsapp" varchar(11),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_phone_unique" UNIQUE("phone"),
	CONSTRAINT "users_whatsapp_unique" UNIQUE("whatsapp")
);
--> statement-breakpoint
ALTER TABLE "profile" ADD CONSTRAINT "profile_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profile" ADD CONSTRAINT "profile_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profiles_to_locations" ADD CONSTRAINT "profiles_to_locations_profile_id_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profile"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profiles_to_locations" ADD CONSTRAINT "profiles_to_locations_location_id_locations_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."locations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "location_idx" ON "locations" USING btree ("location");--> statement-breakpoint
CREATE INDEX "service_id_idx" ON "profile" USING btree ("service_id");--> statement-breakpoint
CREATE INDEX "user_id_idx" ON "profile" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "profile_id_idx" ON "profiles_to_locations" USING btree ("profile_id");--> statement-breakpoint
CREATE INDEX "location_id_idx" ON "profiles_to_locations" USING btree ("location_id");
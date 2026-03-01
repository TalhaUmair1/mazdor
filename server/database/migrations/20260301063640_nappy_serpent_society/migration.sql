CREATE TABLE `locations` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`name` text,
	`parent_id` integer
);
--> statement-breakpoint
CREATE TABLE `profile` (
	`id` text PRIMARY KEY,
	`title` text NOT NULL,
	`service_id` integer NOT NULL,
	`user_id` integer NOT NULL,
	`min_price` real NOT NULL,
	`service_type` text NOT NULL,
	`shop_address` text NOT NULL,
	`description` text NOT NULL,
	`experience` integer NOT NULL,
	`created_at` integer DEFAULT 1772347000,
	`updated_at` integer DEFAULT 1772347000,
	`deleted_at` integer,
	CONSTRAINT `fk_profile_service_id_services_id_fk` FOREIGN KEY (`service_id`) REFERENCES `services`(`id`),
	CONSTRAINT `fk_profile_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`)
);
--> statement-breakpoint
CREATE TABLE `profile_service_areas` (
	`profile_id` text NOT NULL,
	`location_id` integer NOT NULL,
	CONSTRAINT `profile_service_areas_pk` PRIMARY KEY(`profile_id`, `location_id`),
	CONSTRAINT `fk_profile_service_areas_profile_id_profile_id_fk` FOREIGN KEY (`profile_id`) REFERENCES `profile`(`id`),
	CONSTRAINT `fk_profile_service_areas_location_id_locations_id_fk` FOREIGN KEY (`location_id`) REFERENCES `locations`(`id`)
);
--> statement-breakpoint
CREATE TABLE `services` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`name` text NOT NULL,
	`svg` text NOT NULL,
	`view_box` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`name` text NOT NULL,
	`email` text NOT NULL UNIQUE,
	`password` text,
	`phone` text(11) UNIQUE,
	`whatsapp` text(11) UNIQUE,
	`avatar` text,
	`created_at` integer DEFAULT 1772347000,
	`updated_at` integer DEFAULT 1772347000
);

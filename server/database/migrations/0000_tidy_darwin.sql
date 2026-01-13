CREATE TABLE `locations` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text,
	`parent_id` integer
);
--> statement-breakpoint
CREATE TABLE `profile` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`service_id` integer NOT NULL,
	`user_id` integer NOT NULL,
	`min_price` real NOT NULL,
	`service_type` text NOT NULL,
	`shop_address` text NOT NULL,
	`description` text NOT NULL,
	`experience` integer NOT NULL,
	`created_at` integer DEFAULT '"2026-01-13T07:05:27.270Z"',
	`updated_at` integer DEFAULT '"2026-01-13T07:05:27.270Z"',
	`deleted_at` integer,
	FOREIGN KEY (`service_id`) REFERENCES `services`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `profile_service_areas` (
	`profile_id` text NOT NULL,
	`location_id` integer NOT NULL,
	PRIMARY KEY(`profile_id`, `location_id`),
	FOREIGN KEY (`profile_id`) REFERENCES `profile`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`location_id`) REFERENCES `locations`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `services` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`svg` text NOT NULL,
	`view_box` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text(11),
	`whatsapp` text(11),
	`avatar` text,
	`created_at` integer DEFAULT '"2026-01-13T07:05:27.268Z"',
	`updated_at` integer DEFAULT '"2026-01-13T07:05:27.268Z"'
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_phone_unique` ON `users` (`phone`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_whatsapp_unique` ON `users` (`whatsapp`);
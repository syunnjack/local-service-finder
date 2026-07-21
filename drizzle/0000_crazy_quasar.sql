CREATE TABLE `service_leads` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`vertical` text DEFAULT 'house-cleaning' NOT NULL,
	`provider_id` text NOT NULL,
	`city` text NOT NULL,
	`service` text NOT NULL,
	`home` text NOT NULL,
	`email` text NOT NULL,
	`consent` integer NOT NULL,
	`status` text DEFAULT 'new' NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `lead_vertical_city_idx` ON `service_leads` (`vertical`,`city`,`status`);
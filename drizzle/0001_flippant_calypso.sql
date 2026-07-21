CREATE TABLE `service_events` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`vertical` text NOT NULL,
	`city` text NOT NULL,
	`provider_id` text,
	`event` text NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `event_vertical_type_idx` ON `service_events` (`vertical`,`event`,`created_at`);--> statement-breakpoint
CREATE TABLE `service_reviews` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`vertical` text NOT NULL,
	`provider_id` text NOT NULL,
	`city` text NOT NULL,
	`nickname` text NOT NULL,
	`rating` integer NOT NULL,
	`body` text NOT NULL,
	`helpful` integer DEFAULT 0 NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `review_vertical_city_idx` ON `service_reviews` (`vertical`,`city`,`status`);
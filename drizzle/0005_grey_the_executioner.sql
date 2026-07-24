CREATE TABLE `listing_corrections` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`provider_id` text NOT NULL,
	`name` text NOT NULL,
	`organization` text DEFAULT '' NOT NULL,
	`email` text NOT NULL,
	`url` text DEFAULT '' NOT NULL,
	`message` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `correction_provider_status_idx` ON `listing_corrections` (`provider_id`,`status`);
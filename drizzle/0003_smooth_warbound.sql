CREATE TABLE `affiliate_campaigns` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`vertical` text NOT NULL,
	`name` text NOT NULL,
	`asp` text NOT NULL,
	`destination_url` text NOT NULL,
	`reward` integer DEFAULT 0 NOT NULL,
	`approval_rate` real DEFAULT 0 NOT NULL,
	`priority` integer DEFAULT 1 NOT NULL,
	`status` text DEFAULT 'draft' NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `campaign_vertical_status_idx` ON `affiliate_campaigns` (`vertical`,`status`);
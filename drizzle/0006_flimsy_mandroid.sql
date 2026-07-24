CREATE TABLE `review_reports` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`review_id` integer NOT NULL,
	`reason` text NOT NULL,
	`detail` text DEFAULT '' NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `review_report_status_idx` ON `review_reports` (`review_id`,`status`);--> statement-breakpoint
ALTER TABLE `service_reviews` ADD `prefecture` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `service_reviews` ADD `estimate_match` text DEFAULT 'unknown' NOT NULL;--> statement-breakpoint
ALTER TABLE `service_reviews` ADD `good_point` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `service_reviews` ADD `caution_point` text DEFAULT '' NOT NULL;
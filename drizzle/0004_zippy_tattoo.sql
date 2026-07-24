ALTER TABLE `service_reviews` ADD `service_type` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `service_reviews` ADD `usage_month` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `service_reviews` ADD `would_use_again` integer DEFAULT false NOT NULL;
ALTER TABLE `service_leads` ADD `deal_amount` integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `service_leads` ADD `commission` integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `service_leads` ADD `note` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `service_leads` ADD `updated_at` integer NOT NULL;
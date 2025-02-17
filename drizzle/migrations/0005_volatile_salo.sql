PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_event_logs` (
	`id` text PRIMARY KEY NOT NULL,
	`event_name` text,
	`module` text,
	`data` text,
	`user_id` text,
	FOREIGN KEY (`user_id`) REFERENCES `user_logs`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_event_logs`("id", "event_name", "module", "data", "user_id") SELECT "id", "event_name", "module", "data", "user_id" FROM `event_logs`;--> statement-breakpoint
DROP TABLE `event_logs`;--> statement-breakpoint
ALTER TABLE `__new_event_logs` RENAME TO `event_logs`;--> statement-breakpoint
PRAGMA foreign_keys=ON;
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_event_logs` (
	`id` text PRIMARY KEY NOT NULL,
	`event_name` text,
	`module` text,
	`data` text,
	`userId` text,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_event_logs`("id", "event_name", "module", "data", "userId") SELECT "id", "event_name", "module", "data", "userId" FROM `event_logs`;--> statement-breakpoint
DROP TABLE `event_logs`;--> statement-breakpoint
ALTER TABLE `__new_event_logs` RENAME TO `event_logs`;--> statement-breakpoint
PRAGMA foreign_keys=ON;
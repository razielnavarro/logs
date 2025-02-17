ALTER TABLE `user` RENAME TO `user_logs`;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_event_logs` (
	`id` text PRIMARY KEY NOT NULL,
	`event_name` text,
	`module` text,
	`data` text,
	`userId` text,
	FOREIGN KEY (`userId`) REFERENCES `user_logs`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_event_logs`("id", "event_name", "module", "data", "userId") SELECT "id", "event_name", "module", "data", "userId" FROM `event_logs`;--> statement-breakpoint
DROP TABLE `event_logs`;--> statement-breakpoint
ALTER TABLE `__new_event_logs` RENAME TO `event_logs`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_login_logs` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text,
	`success` integer DEFAULT false NOT NULL,
	`ip` text,
	`country` text,
	`user_agent` text,
	FOREIGN KEY (`user_id`) REFERENCES `user_logs`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_login_logs`("id", "user_id", "success", "ip", "country", "user_agent") SELECT "id", "user_id", "success", "ip", "country", "user_agent" FROM `login_logs`;--> statement-breakpoint
DROP TABLE `login_logs`;--> statement-breakpoint
ALTER TABLE `__new_login_logs` RENAME TO `login_logs`;
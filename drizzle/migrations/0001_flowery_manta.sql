PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_event_logs` (
	`id` text PRIMARY KEY DEFAULT '47439705238671360' NOT NULL,
	`event_name` text,
	`module` text,
	`data` text,
	`userId` text
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
	`user_agent` text
);
--> statement-breakpoint
INSERT INTO `__new_login_logs`("id", "user_id", "success", "ip", "country", "user_agent") SELECT "id", "user_id", "success", "ip", "country", "user_agent" FROM `login_logs`;--> statement-breakpoint
DROP TABLE `login_logs`;--> statement-breakpoint
ALTER TABLE `__new_login_logs` RENAME TO `login_logs`;--> statement-breakpoint
CREATE TABLE `__new_user` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text,
	`full_name` text,
	`rnb` text,
	`sucursal_code` text,
	`is_premium` integer DEFAULT false NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_user`("id", "email", "full_name", "rnb", "sucursal_code", "is_premium") SELECT "id", "email", "full_name", "rnb", "sucursal_code", "is_premium" FROM `user`;--> statement-breakpoint
DROP TABLE `user`;--> statement-breakpoint
ALTER TABLE `__new_user` RENAME TO `user`;
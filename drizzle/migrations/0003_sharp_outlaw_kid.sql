PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_login_logs` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text,
	`success` integer DEFAULT false NOT NULL,
	`ip` text,
	`country` text,
	`user_agent` text,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_login_logs`("id", "user_id", "success", "ip", "country", "user_agent") SELECT "id", "user_id", "success", "ip", "country", "user_agent" FROM `login_logs`;--> statement-breakpoint
DROP TABLE `login_logs`;--> statement-breakpoint
ALTER TABLE `__new_login_logs` RENAME TO `login_logs`;--> statement-breakpoint
PRAGMA foreign_keys=ON;
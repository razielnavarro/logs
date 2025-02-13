CREATE TABLE `event_logs` (
	`id` text,
	`event_name` text,
	`module` text,
	`data` text,
	`userId` text
);
--> statement-breakpoint
CREATE TABLE `login_logs` (
	`id` text,
	`user_id` text,
	`success` integer DEFAULT false NOT NULL,
	`ip` text,
	`country` text,
	`user_agent` text
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` text,
	`email` text,
	`full_name` text,
	`rnb` text,
	`sucursal_code` text,
	`is_premium` integer DEFAULT false NOT NULL
);

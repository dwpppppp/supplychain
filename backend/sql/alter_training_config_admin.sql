-- Training module configuration upgrade.
-- Run this against the existing MySQL database before using the training admin UI.

ALTER TABLE `training_cases`
  ADD COLUMN `slug` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT NULL AFTER `id`,
  ADD COLUMN `status` varchar(16) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'draft' AFTER `difficulty`,
  ADD COLUMN `total_steps` smallint NOT NULL DEFAULT 4 AFTER `status`,
  ADD COLUMN `max_attempts` smallint NOT NULL DEFAULT 4 AFTER `total_steps`,
  ADD COLUMN `case_config` json DEFAULT NULL AFTER `scoring_weights`,
  ADD COLUMN `published_at` datetime DEFAULT NULL AFTER `case_config`,
  ADD COLUMN `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP AFTER `published_at`,
  ADD COLUMN `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP AFTER `created_at`,
  ADD UNIQUE KEY `uq_training_cases_slug` (`slug`);

ALTER TABLE `training_suppliers`
  ADD COLUMN `code` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL AFTER `case_id`,
  ADD COLUMN `supplier_type` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL AFTER `brief`,
  ADD COLUMN `is_candidate` tinyint(1) NOT NULL DEFAULT 1 AFTER `supplier_type`,
  ADD COLUMN `is_recommended` tinyint(1) NOT NULL DEFAULT 0 AFTER `is_candidate`,
  ADD COLUMN `sort_order` int NOT NULL DEFAULT 0 AFTER `is_recommended`,
  ADD COLUMN `profile` json DEFAULT NULL AFTER `sort_order`;

ALTER TABLE `training_step_config`
  ADD COLUMN `step_key` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT NULL AFTER `step`,
  ADD COLUMN `sort_order` int NOT NULL DEFAULT 0 AFTER `interaction_type`,
  ADD COLUMN `is_required` tinyint(1) NOT NULL DEFAULT 1 AFTER `sort_order`,
  ADD COLUMN `scoring_rules` json DEFAULT NULL AFTER `form_schema`;

ALTER TABLE `user_step_submissions`
  ADD COLUMN `attempt_no` smallint NOT NULL DEFAULT 1 AFTER `step`,
  ADD COLUMN `result_snapshot` json DEFAULT NULL AFTER `dimension_scores`;

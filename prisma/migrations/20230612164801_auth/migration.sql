/*
  Warnings:

  - You are about to drop the column `isActive` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `stripeCustomerId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Brand` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Heart` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Heart" DROP CONSTRAINT "Heart_brandId_fkey";

-- DropForeignKey
ALTER TABLE "Heart" DROP CONSTRAINT "Heart_userId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "isActive",
DROP COLUMN "stripeCustomerId";

-- DropTable
DROP TABLE "Brand";

-- DropTable
DROP TABLE "Heart";

-- CreateTable
CREATE TABLE "creators" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "creators_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "leadlist_nov2022_csv" (
    "Name" VARCHAR,
    "Blank1" VARCHAR,
    "Twitter" VARCHAR,
    "EmployeeCount" VARCHAR,
    "Description" VARCHAR,
    "Website" VARCHAR,
    "City" VARCHAR,
    "Country" TEXT,
    "ContactName" VARCHAR,
    "ContactTwitter" VARCHAR,
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "Buffer" TEXT,

    CONSTRAINT "leadlist_nov2022_csv_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nc_1o1g___brand_master_dev" (
    "id" SERIAL NOT NULL,
    "brand_id" VARCHAR,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR,
    "url" VARCHAR,
    "recent_ads" JSONB,
    "brand_description" TEXT,
    "brand_size" VARCHAR,
    "category_main" VARCHAR,
    "category_sublevel" JSONB,
    "data_source_url" VARCHAR,
    "metadata" JSONB,
    "source_id" VARCHAR,
    "saved_leads" TEXT[],

    CONSTRAINT "nc_1o1g___brand_master_dev_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nc_1o1g___brand_user_relationship" (
    "id" SERIAL NOT NULL,
    "brand_id" VARCHAR,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "count" VARCHAR,
    "user" JSONB,

    CONSTRAINT "nc_1o1g___brand_user_relationship_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nc_1o1g___fb_ads_dev" (
    "id" SERIAL NOT NULL,
    "fb_id" VARCHAR,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "is_active" VARCHAR,
    "start_date" VARCHAR,
    "advertiser_brand_name" VARCHAR,
    "advertiser_brand_url" VARCHAR,
    "facebook_advertisement_url" VARCHAR,
    "shop_type" VARCHAR,
    "filter" JSONB,
    "category" TEXT,
    "platform" VARCHAR,
    "description" TEXT,

    CONSTRAINT "nc_1o1g___fb_ads_dev_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nc_1o1g___tiktok_ads_dev_test" (
    "id" SERIAL NOT NULL,
    "tiktok_id" VARCHAR,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "best_title" VARCHAR,
    "country_code" VARCHAR,
    "cover_uri" VARCHAR,
    "favorite" VARCHAR,
    "industry_key" VARCHAR,
    "objective" VARCHAR,
    "objective_key" VARCHAR,
    "period_type" VARCHAR,
    "region" VARCHAR,
    "title" JSONB,
    "vid" VARCHAR,
    "video_info" JSONB,
    "watermarks" JSONB,

    CONSTRAINT "nc_1o1g___tiktok_ads_dev_test_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nc_1o1g___user_master" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "email" VARCHAR,
    "password" VARCHAR,
    "bookmarks" JSONB,

    CONSTRAINT "nc_1o1g___user_master_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nc_1o1g__amazon_dev" (
    "asin" VARCHAR,
    "sponsored" BOOLEAN DEFAULT false,
    "product_title" VARCHAR,
    "product_price" VARCHAR,
    "product_link" VARCHAR,
    "category" VARCHAR,
    "text_data" TEXT,
    "product_store_url" VARCHAR,
    "product_description" TEXT,
    "product_details" TEXT,
    "technical_details" TEXT,
    "additional_details" TEXT,
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "nc_1o1g___table_pkey1" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nc_1o1g__android_dev" (
    "developer_internal_id" VARCHAR,
    "title" VARCHAR,
    "description" TEXT,
    "description_HTML" VARCHAR,
    "summary" VARCHAR,
    "installs" VARCHAR,
    "min_installs" BIGINT,
    "max_installs" BIGINT,
    "score" DECIMAL,
    "score_text" VARCHAR,
    "ratings" BIGINT,
    "reviews" BIGINT,
    "histogram_1" BIGINT,
    "histogram_2" BIGINT,
    "histogram_3" BIGINT,
    "histogram_4" BIGINT,
    "histogram_5" BIGINT,
    "price" BIGINT,
    "free" BOOLEAN DEFAULT false,
    "currency" VARCHAR,
    "price_text" VARCHAR,
    "offersIAP" BOOLEAN DEFAULT false,
    "IAP_range" TEXT,
    "size" VARCHAR,
    "android_version" VARCHAR,
    "android_version_text" VARCHAR,
    "developer" VARCHAR,
    "developer_Id" VARCHAR,
    "developer_email" VARCHAR,
    "developer_website" VARCHAR,
    "developer_address" VARCHAR,
    "privacy_policy" VARCHAR,
    "genre" VARCHAR,
    "genreId" VARCHAR,
    "family_genre" TEXT,
    "family_genre_Id" TEXT,
    "icon" VARCHAR,
    "header_Image" VARCHAR,
    "screenshots" TEXT,
    "video" TEXT,
    "video_image" TEXT,
    "content_rating" VARCHAR,
    "content_rating_description" TEXT,
    "ad_supported" BOOLEAN DEFAULT false,
    "released" TEXT,
    "updated" BIGINT,
    "version" VARCHAR,
    "recent_changes" VARCHAR,
    "comments" TEXT,
    "editors_choice" BOOLEAN DEFAULT false,
    "features" TEXT,
    "appId" VARCHAR,
    "url" VARCHAR,
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "nc_1o1g___table_pkey3" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nc_1o1g__angellist_dev" (
    "id" SERIAL NOT NULL,
    "brand_id" VARCHAR NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR,
    "brand_url" VARCHAR,
    "brand_description" TEXT,
    "brand_size" VARCHAR,
    "category_sublevel_json" JSONB,
    "jobs" JSONB,
    "data_source_url" VARCHAR,
    "detail_description" TEXT,
    "locations" JSONB,
    "socials" JSONB,
    "dossier" BOOLEAN,
    "email" VARCHAR,
    "phone" VARCHAR,
    "corporate_address" TEXT,
    "investors" TEXT,
    "logo_url" VARCHAR,
    "flag_1" BOOLEAN,
    "recently_funded" BOOLEAN,
    "growing_fast" BOOLEAN,
    "brand_growth_attributes" JSONB,
    "actively_hiring" BOOLEAN,
    "actively_marketing" BOOLEAN,
    "category_main" TEXT,
    "category_sublevel" JSONB,

    CONSTRAINT "nc_1o1g__brands_master_dev_pkey" PRIMARY KEY ("id","brand_id")
);

-- CreateTable
CREATE TABLE "nc_1o1g__dossier" (
    "id" SERIAL NOT NULL,
    "brand_id" VARCHAR,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "dossier_content" TEXT,
    "pdf_gcs_link" VARCHAR,

    CONSTRAINT "nc_1o1g__dossier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nc_1o1g__flippa_dev" (
    "id" VARCHAR NOT NULL,
    "listing_url" VARCHAR,
    "title" VARCHAR,
    "summary" VARCHAR,
    "has_verified_traffic" BOOLEAN DEFAULT false,
    "has_verified_revenue" BOOLEAN DEFAULT false,
    "price" BIGINT,
    "bid_count" BIGINT,
    "sale_method" VARCHAR,
    "status" VARCHAR,
    "category" VARCHAR,
    "monetization" VARCHAR,
    "profit_average" BIGINT,
    "end_at" VARCHAR,
    "super_seller" BOOLEAN DEFAULT false,
    "sponsored" BOOLEAN DEFAULT false,
    "editors_choice" BOOLEAN DEFAULT false,
    "multiple" DECIMAL,
    "has_multiple_" BOOLEAN DEFAULT false,
    "revenue_multiple" DECIMAL,
    "target_raise_amount" JSON,
    "ttm_revenue" JSON,
    "confidential" BOOLEAN DEFAULT false,
    "property_name" VARCHAR,
    "established_at" BIGINT,
    "country_name" VARCHAR,
    "ready_made" BOOLEAN DEFAULT false,
    "thumbnail_url" VARCHAR,
    "default_image" VARCHAR,
    "property_type" VARCHAR,
    "watched" BOOLEAN DEFAULT false,
    "scores" JSON,
    "beta_scores" JSON,
    "uniques_per_month" JSON,
    "age_label" VARCHAR,
    "formatted_age_in_years" VARCHAR,
    "sale_method_title" VARCHAR,
    "integrations" JSON,
    "integration_icons" JSON,
    "currency_label" VARCHAR,
    "protect_listing" BOOLEAN DEFAULT false,
    "display_verification_badge" BOOLEAN DEFAULT false,
    "all_verifications" JSON,
    "manually_vetted" BOOLEAN DEFAULT false,
    "search_keyword" VARCHAR,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "nc_1o1g___table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nc_1o1g__ios_dev" (
    "id" BIGINT NOT NULL,
    "app_id" VARCHAR,
    "title" VARCHAR,
    "url" VARCHAR,
    "description" VARCHAR,
    "icon" VARCHAR,
    "genres" TEXT,
    "genre_ids" TEXT,
    "primary_genre" VARCHAR,
    "primary_genre_id" BIGINT,
    "content_rating" VARCHAR,
    "languages" TEXT,
    "size" BIGINT,
    "required_os_version" VARCHAR,
    "released" VARCHAR,
    "updated" VARCHAR,
    "release_notes" VARCHAR,
    "version" VARCHAR,
    "price" DECIMAL,
    "currency" VARCHAR,
    "free" BOOLEAN DEFAULT false,
    "developer_id" BIGINT,
    "developer" VARCHAR,
    "developer_url" VARCHAR,
    "developer_website" TEXT,
    "score" DECIMAL,
    "reviews" DECIMAL,
    "current_version_score" DECIMAL,
    "current_version_reviews" BIGINT,
    "screenshots" TEXT,
    "ipad_screenshots" TEXT,
    "appletv_screenshots" TEXT,
    "supported_devices" TEXT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "category" VARCHAR,

    CONSTRAINT "nc_1o1g___table_pkey2" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nc_a38t__creator_services_master" (
    "id" VARCHAR NOT NULL,
    "name" VARCHAR,
    "functionalArea" VARCHAR,
    "avatar" VARCHAR,
    "isVerified" BOOLEAN,
    "hasEnabledHireMe" BOOLEAN,
    "vitrineImage" VARCHAR,
    "about" TEXT,
    "works" TEXT,
    "youtubeVideos" JSON,
    "portfolio" JSON,
    "customTitle" VARCHAR,
    "allowMessages" BOOLEAN,
    "vouchesCount" BIGINT,
    "vouchedByCurrentUser" VARCHAR,
    "latestVideoDate" VARCHAR,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "nc_a38t___table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nc_acl" (
    "id" SERIAL NOT NULL,
    "project_id" VARCHAR(255),
    "db_alias" VARCHAR(255) DEFAULT 'db',
    "tn" VARCHAR(255),
    "acl" TEXT,
    "type" VARCHAR(255) DEFAULT 'table',
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "nc_acl_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nc_api_tokens" (
    "id" SERIAL NOT NULL,
    "project_id" VARCHAR(255),
    "db_alias" VARCHAR(255),
    "description" VARCHAR(255),
    "permissions" TEXT,
    "token" TEXT,
    "expiry" VARCHAR(255),
    "enabled" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),
    "fk_user_id" VARCHAR(20),

    CONSTRAINT "nc_api_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nc_audit" (
    "id" SERIAL NOT NULL,
    "user" VARCHAR(255),
    "ip" VARCHAR(255),
    "project_id" VARCHAR(255),
    "db_alias" VARCHAR(255),
    "model_name" VARCHAR(100),
    "model_id" VARCHAR(100),
    "op_type" VARCHAR(255),
    "op_sub_type" VARCHAR(255),
    "status" VARCHAR(255),
    "description" TEXT,
    "details" TEXT,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "nc_audit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nc_audit_v2" (
    "id" VARCHAR(20) NOT NULL,
    "user" VARCHAR(255),
    "ip" VARCHAR(255),
    "base_id" VARCHAR(20),
    "project_id" VARCHAR(128),
    "fk_model_id" VARCHAR(20),
    "row_id" VARCHAR(255),
    "op_type" VARCHAR(255),
    "op_sub_type" VARCHAR(255),
    "status" VARCHAR(255),
    "description" TEXT,
    "details" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "nc_audit_v2_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nc_bases_v2" (
    "id" VARCHAR(20) NOT NULL,
    "project_id" VARCHAR(128),
    "alias" VARCHAR(255),
    "config" TEXT,
    "meta" TEXT,
    "is_meta" BOOLEAN,
    "type" VARCHAR(255),
    "inflection_column" VARCHAR(255),
    "inflection_table" VARCHAR(255),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "enabled" BOOLEAN DEFAULT true,
    "order" REAL,

    CONSTRAINT "nc_bases_v2_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nc_cnk4__creators_master_dev" (
    "id" VARCHAR NOT NULL,
    "name" VARCHAR,
    "functionalArea" BIGINT,
    "avatar" VARCHAR,
    "isVerified" BOOLEAN,
    "hasEnabledHireMe" BOOLEAN,
    "vitrineImage" VARCHAR,
    "about" TEXT,
    "works" JSONB,
    "youtubeVideos" JSON,
    "portfolio" JSON,
    "customTitle" TEXT,
    "allowMessages" BOOLEAN,
    "vouchesCount" BIGINT,
    "vouchedByCurrentUser" JSON,
    "latestVideoDate" VARCHAR,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "nc_cnk4___table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nc_cnk4__creators_master_prod" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "nc_cnk4__company_master_prod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nc_cnk4__youtube_channel_master_dev" (
    "id" SERIAL NOT NULL,
    "channel_id" VARCHAR,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "channel_name" VARCHAR,
    "channel_url" VARCHAR,

    CONSTRAINT "nc_cnk4__youtube_channel_master_dev_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nc_col_barcode_v2" (
    "id" VARCHAR(20) NOT NULL,
    "fk_column_id" VARCHAR(20),
    "fk_barcode_value_column_id" VARCHAR(20),
    "barcode_format" VARCHAR(15),
    "deleted" BOOLEAN,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "nc_col_barcode_v2_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nc_col_formula_v2" (
    "id" VARCHAR(20) NOT NULL,
    "fk_column_id" VARCHAR(20),
    "formula" TEXT NOT NULL,
    "formula_raw" TEXT,
    "error" TEXT,
    "deleted" BOOLEAN,
    "order" REAL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "nc_col_formula_v2_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nc_col_lookup_v2" (
    "id" VARCHAR(20) NOT NULL,
    "fk_column_id" VARCHAR(20),
    "fk_relation_column_id" VARCHAR(20),
    "fk_lookup_column_id" VARCHAR(20),
    "deleted" BOOLEAN,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "nc_col_lookup_v2_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nc_col_qrcode_v2" (
    "id" VARCHAR(20) NOT NULL,
    "fk_column_id" VARCHAR(20),
    "fk_qr_value_column_id" VARCHAR(20),
    "deleted" BOOLEAN,
    "order" REAL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "nc_col_qrcode_v2_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nc_col_relations_v2" (
    "id" VARCHAR(20) NOT NULL,
    "ref_db_alias" VARCHAR(255),
    "type" VARCHAR(255),
    "virtual" BOOLEAN,
    "db_type" VARCHAR(255),
    "fk_column_id" VARCHAR(20),
    "fk_related_model_id" VARCHAR(20),
    "fk_child_column_id" VARCHAR(20),
    "fk_parent_column_id" VARCHAR(20),
    "fk_mm_model_id" VARCHAR(20),
    "fk_mm_child_column_id" VARCHAR(20),
    "fk_mm_parent_column_id" VARCHAR(20),
    "ur" VARCHAR(255),
    "dr" VARCHAR(255),
    "fk_index_name" VARCHAR(255),
    "deleted" BOOLEAN,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "nc_col_relations_v2_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nc_col_rollup_v2" (
    "id" VARCHAR(20) NOT NULL,
    "fk_column_id" VARCHAR(20),
    "fk_relation_column_id" VARCHAR(20),
    "fk_rollup_column_id" VARCHAR(20),
    "rollup_function" VARCHAR(255),
    "deleted" BOOLEAN,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "nc_col_rollup_v2_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nc_col_select_options_v2" (
    "id" VARCHAR(20) NOT NULL,
    "fk_column_id" VARCHAR(20),
    "title" VARCHAR(255),
    "color" VARCHAR(255),
    "order" REAL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "nc_col_select_options_v2_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nc_columns_v2" (
    "id" VARCHAR(20) NOT NULL,
    "base_id" VARCHAR(20),
    "project_id" VARCHAR(128),
    "fk_model_id" VARCHAR(20),
    "title" VARCHAR(255),
    "column_name" VARCHAR(255),
    "uidt" VARCHAR(255),
    "dt" VARCHAR(255),
    "np" VARCHAR(255),
    "ns" VARCHAR(255),
    "clen" VARCHAR(255),
    "cop" VARCHAR(255),
    "pk" BOOLEAN,
    "pv" BOOLEAN,
    "rqd" BOOLEAN,
    "un" BOOLEAN,
    "ct" TEXT,
    "ai" BOOLEAN,
    "unique" BOOLEAN,
    "cdf" TEXT,
    "cc" TEXT,
    "csn" VARCHAR(255),
    "dtx" VARCHAR(255),
    "dtxp" TEXT,
    "dtxs" VARCHAR(255),
    "au" BOOLEAN,
    "validate" TEXT,
    "virtual" BOOLEAN,
    "deleted" BOOLEAN,
    "system" BOOLEAN DEFAULT false,
    "order" REAL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "meta" TEXT,

    CONSTRAINT "nc_columns_v2_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nc_cron" (
    "id" SERIAL NOT NULL,
    "project_id" VARCHAR(255),
    "db_alias" VARCHAR(255) DEFAULT 'db',
    "title" VARCHAR(255),
    "description" VARCHAR(255),
    "env" VARCHAR(255),
    "pattern" VARCHAR(255),
    "webhook" VARCHAR(255),
    "timezone" VARCHAR(255) DEFAULT 'America/Los_Angeles',
    "active" BOOLEAN DEFAULT true,
    "cron_handler" TEXT,
    "payload" TEXT,
    "headers" TEXT,
    "retries" INTEGER DEFAULT 0,
    "retry_interval" INTEGER DEFAULT 60000,
    "timeout" INTEGER DEFAULT 60000,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "nc_cron_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nc_disabled_models_for_role" (
    "id" SERIAL NOT NULL,
    "project_id" VARCHAR(255),
    "db_alias" VARCHAR(45),
    "title" VARCHAR(45),
    "type" VARCHAR(45),
    "role" VARCHAR(45),
    "disabled" BOOLEAN DEFAULT true,
    "tn" VARCHAR(255),
    "rtn" VARCHAR(255),
    "cn" VARCHAR(255),
    "rcn" VARCHAR(255),
    "relation_type" VARCHAR(255),
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),
    "parent_model_title" VARCHAR(255),

    CONSTRAINT "nc_disabled_models_for_role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nc_disabled_models_for_role_v2" (
    "id" VARCHAR(20) NOT NULL,
    "base_id" VARCHAR(20),
    "project_id" VARCHAR(128),
    "fk_view_id" VARCHAR(20),
    "role" VARCHAR(45),
    "disabled" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "nc_disabled_models_for_role_v2_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nc_evolutions" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "titleDown" VARCHAR(255),
    "description" VARCHAR(255),
    "batch" INTEGER,
    "checksum" VARCHAR(255),
    "status" INTEGER,
    "created" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "nc_evolutions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nc_fffx___favorites" (
    "id" SERIAL NOT NULL,
    "user_id" VARCHAR,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "song_list" JSONB,

    CONSTRAINT "nc_fffx___favorites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nc_fffx__audio_master_dev" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "stats" JSONB,
    "tiktok" VARCHAR,
    "play_url" VARCHAR,
    "audio_id" VARCHAR,
    "artist_name" VARCHAR,
    "is_commercial_use" TEXT,
    "audio_datasource_url" VARCHAR,
    "datasource_metadata" JSONB,
    "ranking_change" VARCHAR,
    "matched_audios" JSONB,
    "direct_audio_link" VARCHAR,
    "channel" VARCHAR,
    "description" TEXT,

    CONSTRAINT "nc_fffx__audio_master_dev_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nc_fffx__originals" (
    "id" SERIAL NOT NULL,
    "audio_id" VARCHAR,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "title" VARCHAR,
    "description" TEXT,
    "artist" VARCHAR,
    "audio_storage_url" VARCHAR,
    "social_links" JSONB,

    CONSTRAINT "nc_fffx___origials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nc_fffx__waitlist" (
    "id" SERIAL NOT NULL,
    "Email" VARCHAR,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "Phone" VARCHAR,
    "Name" VARCHAR,

    CONSTRAINT "nc_fffx__waitlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nc_filter_exp_v2" (
    "id" VARCHAR(20) NOT NULL,
    "base_id" VARCHAR(20),
    "project_id" VARCHAR(128),
    "fk_view_id" VARCHAR(20),
    "fk_hook_id" VARCHAR(20),
    "fk_column_id" VARCHAR(20),
    "fk_parent_id" VARCHAR(20),
    "logical_op" VARCHAR(255),
    "comparison_op" VARCHAR(255),
    "value" VARCHAR(255),
    "is_group" BOOLEAN,
    "order" REAL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "nc_filter_exp_v2_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nc_form_view_columns_v2" (
    "id" VARCHAR(20) NOT NULL,
    "base_id" VARCHAR(20),
    "project_id" VARCHAR(128),
    "fk_view_id" VARCHAR(20),
    "fk_column_id" VARCHAR(20),
    "uuid" VARCHAR(255),
    "label" VARCHAR(255),
    "help" VARCHAR(255),
    "description" TEXT,
    "required" BOOLEAN,
    "show" BOOLEAN,
    "order" REAL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "meta" TEXT,

    CONSTRAINT "nc_form_view_columns_v2_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nc_form_view_v2" (
    "base_id" VARCHAR(20),
    "project_id" VARCHAR(128),
    "fk_view_id" VARCHAR(20) NOT NULL,
    "heading" VARCHAR(255),
    "subheading" VARCHAR(255),
    "success_msg" TEXT,
    "redirect_url" TEXT,
    "redirect_after_secs" VARCHAR(255),
    "email" VARCHAR(255),
    "submit_another_form" BOOLEAN,
    "show_blank_form" BOOLEAN,
    "uuid" VARCHAR(255),
    "banner_image_url" TEXT,
    "logo_url" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "meta" TEXT,

    CONSTRAINT "nc_form_view_v2_pkey" PRIMARY KEY ("fk_view_id")
);

-- CreateTable
CREATE TABLE "nc_gallery_view_columns_v2" (
    "id" VARCHAR(20) NOT NULL,
    "base_id" VARCHAR(20),
    "project_id" VARCHAR(128),
    "fk_view_id" VARCHAR(20),
    "fk_column_id" VARCHAR(20),
    "uuid" VARCHAR(255),
    "label" VARCHAR(255),
    "help" VARCHAR(255),
    "show" BOOLEAN,
    "order" REAL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "nc_gallery_view_columns_v2_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nc_gallery_view_v2" (
    "base_id" VARCHAR(20),
    "project_id" VARCHAR(128),
    "fk_view_id" VARCHAR(20) NOT NULL,
    "next_enabled" BOOLEAN,
    "prev_enabled" BOOLEAN,
    "cover_image_idx" INTEGER,
    "fk_cover_image_col_id" VARCHAR(20),
    "cover_image" VARCHAR(255),
    "restrict_types" VARCHAR(255),
    "restrict_size" VARCHAR(255),
    "restrict_number" VARCHAR(255),
    "public" BOOLEAN,
    "dimensions" VARCHAR(255),
    "responsive_columns" VARCHAR(255),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "meta" TEXT,

    CONSTRAINT "nc_gallery_view_v2_pkey" PRIMARY KEY ("fk_view_id")
);

-- CreateTable
CREATE TABLE "nc_grid_view_columns_v2" (
    "id" VARCHAR(20) NOT NULL,
    "fk_view_id" VARCHAR(20),
    "fk_column_id" VARCHAR(20),
    "base_id" VARCHAR(20),
    "project_id" VARCHAR(128),
    "uuid" VARCHAR(255),
    "label" VARCHAR(255),
    "help" VARCHAR(255),
    "width" VARCHAR(255) DEFAULT '200px',
    "show" BOOLEAN,
    "order" REAL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "nc_grid_view_columns_v2_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nc_grid_view_v2" (
    "fk_view_id" VARCHAR(20) NOT NULL,
    "base_id" VARCHAR(20),
    "project_id" VARCHAR(128),
    "uuid" VARCHAR(255),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "meta" TEXT,
    "row_height" INTEGER,

    CONSTRAINT "nc_grid_view_v2_pkey" PRIMARY KEY ("fk_view_id")
);

-- CreateTable
CREATE TABLE "nc_hook_logs_v2" (
    "id" VARCHAR(20) NOT NULL,
    "base_id" VARCHAR(20),
    "project_id" VARCHAR(128),
    "fk_hook_id" VARCHAR(20),
    "type" VARCHAR(255),
    "event" VARCHAR(255),
    "operation" VARCHAR(255),
    "test_call" BOOLEAN DEFAULT true,
    "payload" TEXT,
    "conditions" TEXT,
    "notification" TEXT,
    "error_code" VARCHAR(255),
    "error_message" VARCHAR(255),
    "error" TEXT,
    "execution_time" INTEGER,
    "response" VARCHAR(255),
    "triggered_by" VARCHAR(255),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "nc_hook_logs_v2_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nc_hooks" (
    "id" SERIAL NOT NULL,
    "project_id" VARCHAR(255),
    "db_alias" VARCHAR(255) DEFAULT 'db',
    "title" VARCHAR(255),
    "description" VARCHAR(255),
    "env" VARCHAR(255) DEFAULT 'all',
    "tn" VARCHAR(255),
    "type" VARCHAR(255),
    "event" VARCHAR(255),
    "operation" VARCHAR(255),
    "async" BOOLEAN DEFAULT false,
    "payload" BOOLEAN DEFAULT true,
    "url" TEXT,
    "headers" TEXT,
    "condition" TEXT,
    "notification" TEXT,
    "retries" INTEGER DEFAULT 0,
    "retry_interval" INTEGER DEFAULT 60000,
    "timeout" INTEGER DEFAULT 60000,
    "active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "nc_hooks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nc_hooks_v2" (
    "id" VARCHAR(20) NOT NULL,
    "base_id" VARCHAR(20),
    "project_id" VARCHAR(128),
    "fk_model_id" VARCHAR(20),
    "title" VARCHAR(255),
    "description" VARCHAR(255),
    "env" VARCHAR(255) DEFAULT 'all',
    "type" VARCHAR(255),
    "event" VARCHAR(255),
    "operation" VARCHAR(255),
    "async" BOOLEAN DEFAULT false,
    "payload" BOOLEAN DEFAULT true,
    "url" TEXT,
    "headers" TEXT,
    "condition" BOOLEAN DEFAULT false,
    "notification" TEXT,
    "retries" INTEGER DEFAULT 0,
    "retry_interval" INTEGER DEFAULT 60000,
    "timeout" INTEGER DEFAULT 60000,
    "active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "nc_hooks_v2_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nc_kanban_view_columns_v2" (
    "id" VARCHAR(20) NOT NULL,
    "base_id" VARCHAR(20),
    "project_id" VARCHAR(128),
    "fk_view_id" VARCHAR(20),
    "fk_column_id" VARCHAR(20),
    "uuid" VARCHAR(255),
    "label" VARCHAR(255),
    "help" VARCHAR(255),
    "show" BOOLEAN,
    "order" REAL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "nc_kanban_view_columns_v2_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nc_kanban_view_v2" (
    "fk_view_id" VARCHAR(20) NOT NULL,
    "base_id" VARCHAR(20),
    "project_id" VARCHAR(128),
    "show" BOOLEAN,
    "order" REAL,
    "uuid" VARCHAR(255),
    "title" VARCHAR(255),
    "public" BOOLEAN,
    "password" VARCHAR(255),
    "show_all_fields" BOOLEAN,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fk_grp_col_id" VARCHAR(20),
    "fk_cover_image_col_id" VARCHAR(20),
    "meta" TEXT,

    CONSTRAINT "nc_kanban_view_v2_pkey" PRIMARY KEY ("fk_view_id")
);

-- CreateTable
CREATE TABLE "nc_loaders" (
    "id" SERIAL NOT NULL,
    "project_id" VARCHAR(255),
    "db_alias" VARCHAR(255) DEFAULT 'db',
    "title" VARCHAR(255),
    "parent" VARCHAR(255),
    "child" VARCHAR(255),
    "relation" VARCHAR(255),
    "resolver" VARCHAR(255),
    "functions" TEXT,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "nc_loaders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nc_mabb__notes_general" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR DEFAULT 'podcast guests',
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "guest name" VARCHAR,
    "general" VARCHAR,

    CONSTRAINT "nc_mabb__notes_general_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nc_migrations" (
    "id" SERIAL NOT NULL,
    "project_id" VARCHAR(255),
    "db_alias" VARCHAR(255),
    "up" TEXT,
    "down" TEXT,
    "title" VARCHAR(255) NOT NULL,
    "title_down" VARCHAR(255),
    "description" VARCHAR(255),
    "batch" INTEGER,
    "checksum" VARCHAR(255),
    "status" INTEGER,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "nc_migrations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nc_models" (
    "id" SERIAL NOT NULL,
    "project_id" VARCHAR(255),
    "db_alias" VARCHAR(255) DEFAULT 'db',
    "title" VARCHAR(255),
    "alias" VARCHAR(255),
    "type" VARCHAR(255) DEFAULT 'table',
    "meta" TEXT,
    "schema" TEXT,
    "schema_previous" TEXT,
    "services" TEXT,
    "messages" TEXT,
    "enabled" BOOLEAN DEFAULT true,
    "parent_model_title" VARCHAR(255),
    "show_as" VARCHAR(255) DEFAULT 'table',
    "query_params" TEXT,
    "list_idx" INTEGER,
    "tags" VARCHAR(255),
    "pinned" BOOLEAN,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),
    "mm" INTEGER,
    "m_to_m_meta" TEXT,
    "order" REAL,
    "view_order" REAL,

    CONSTRAINT "nc_models_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nc_models_v2" (
    "id" VARCHAR(20) NOT NULL,
    "base_id" VARCHAR(20),
    "project_id" VARCHAR(128),
    "table_name" VARCHAR(255),
    "title" VARCHAR(255),
    "type" VARCHAR(255) DEFAULT 'table',
    "meta" TEXT,
    "schema" TEXT,
    "enabled" BOOLEAN DEFAULT true,
    "mm" BOOLEAN DEFAULT false,
    "tags" VARCHAR(255),
    "pinned" BOOLEAN,
    "deleted" BOOLEAN,
    "order" REAL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "nc_models_v2_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nc_orgs_v2" (
    "id" VARCHAR(20) NOT NULL,
    "title" VARCHAR(255),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "nc_orgs_v2_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nc_plugins" (
    "id" SERIAL NOT NULL,
    "project_id" VARCHAR(255),
    "db_alias" VARCHAR(255),
    "title" VARCHAR(45),
    "description" TEXT,
    "active" BOOLEAN DEFAULT false,
    "rating" REAL,
    "version" VARCHAR(255),
    "docs" VARCHAR(255),
    "status" VARCHAR(255) DEFAULT 'install',
    "status_details" VARCHAR(255),
    "logo" VARCHAR(255),
    "icon" VARCHAR(255),
    "tags" VARCHAR(255),
    "category" VARCHAR(255),
    "input_schema" TEXT,
    "input" TEXT,
    "creator" VARCHAR(255),
    "creator_website" VARCHAR(255),
    "price" VARCHAR(255),
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "nc_plugins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nc_plugins_v2" (
    "id" VARCHAR(20) NOT NULL,
    "title" VARCHAR(45),
    "description" TEXT,
    "active" BOOLEAN DEFAULT false,
    "rating" REAL,
    "version" VARCHAR(255),
    "docs" VARCHAR(255),
    "status" VARCHAR(255) DEFAULT 'install',
    "status_details" VARCHAR(255),
    "logo" VARCHAR(255),
    "icon" VARCHAR(255),
    "tags" VARCHAR(255),
    "category" VARCHAR(255),
    "input_schema" TEXT,
    "input" TEXT,
    "creator" VARCHAR(255),
    "creator_website" VARCHAR(255),
    "price" VARCHAR(255),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "nc_plugins_v2_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nc_project_users_v2" (
    "project_id" VARCHAR(128),
    "fk_user_id" VARCHAR(20),
    "roles" TEXT,
    "starred" BOOLEAN,
    "pinned" BOOLEAN,
    "group" VARCHAR(255),
    "color" VARCHAR(255),
    "order" REAL,
    "hidden" REAL,
    "opened_date" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "nc_projects" (
    "id" VARCHAR(128) NOT NULL,
    "title" VARCHAR(255),
    "status" VARCHAR(255),
    "description" TEXT,
    "config" TEXT,
    "meta" TEXT,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "nc_projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nc_projects_users" (
    "project_id" VARCHAR(255),
    "user_id" INTEGER,
    "roles" TEXT,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6)
);

-- CreateTable
CREATE TABLE "nc_projects_v2" (
    "id" VARCHAR(128) NOT NULL,
    "title" VARCHAR(255),
    "prefix" VARCHAR(255),
    "status" VARCHAR(255),
    "description" TEXT,
    "meta" TEXT,
    "color" VARCHAR(255),
    "uuid" VARCHAR(255),
    "password" VARCHAR(255),
    "roles" VARCHAR(255),
    "deleted" BOOLEAN DEFAULT false,
    "is_meta" BOOLEAN,
    "order" REAL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "nc_projects_v2_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nc_relations" (
    "id" SERIAL NOT NULL,
    "project_id" VARCHAR(255),
    "db_alias" VARCHAR(255),
    "tn" VARCHAR(255),
    "_rtn" VARCHAR(255),
    "_cn" VARCHAR(255),
    "_rcn" VARCHAR(255),
    "referenced_db_alias" VARCHAR(255),
    "type" VARCHAR(255),
    "db_type" VARCHAR(255),
    "ur" VARCHAR(255),
    "dr" VARCHAR(255),
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),
    "fkn" VARCHAR(255),

    CONSTRAINT "nc_relations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nc_resolvers" (
    "id" SERIAL NOT NULL,
    "project_id" VARCHAR(255),
    "db_alias" VARCHAR(255) DEFAULT 'db',
    "title" VARCHAR(255),
    "resolver" TEXT,
    "type" VARCHAR(255),
    "acl" TEXT,
    "functions" TEXT,
    "handler_type" INTEGER DEFAULT 1,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "nc_resolvers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nc_roles" (
    "id" SERIAL NOT NULL,
    "project_id" VARCHAR(255),
    "db_alias" VARCHAR(255) DEFAULT 'db',
    "title" VARCHAR(255),
    "type" VARCHAR(255) DEFAULT 'CUSTOM',
    "description" VARCHAR(255),
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "nc_roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nc_routes" (
    "id" SERIAL NOT NULL,
    "project_id" VARCHAR(255),
    "db_alias" VARCHAR(255) DEFAULT 'db',
    "title" VARCHAR(255),
    "tn" VARCHAR(255),
    "tnp" VARCHAR(255),
    "tnc" VARCHAR(255),
    "relation_type" VARCHAR(255),
    "path" TEXT,
    "type" VARCHAR(255),
    "handler" TEXT,
    "acl" TEXT,
    "order" INTEGER,
    "functions" TEXT,
    "handler_type" INTEGER DEFAULT 1,
    "is_custom" BOOLEAN,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "nc_routes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nc_rpc" (
    "id" SERIAL NOT NULL,
    "project_id" VARCHAR(255),
    "db_alias" VARCHAR(255) DEFAULT 'db',
    "title" VARCHAR(255),
    "tn" VARCHAR(255),
    "service" TEXT,
    "tnp" VARCHAR(255),
    "tnc" VARCHAR(255),
    "relation_type" VARCHAR(255),
    "order" INTEGER,
    "type" VARCHAR(255),
    "acl" TEXT,
    "functions" TEXT,
    "handler_type" INTEGER DEFAULT 1,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "nc_rpc_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nc_shared_bases" (
    "id" SERIAL NOT NULL,
    "project_id" VARCHAR(255),
    "db_alias" VARCHAR(255),
    "roles" VARCHAR(255) DEFAULT 'viewer',
    "shared_base_id" VARCHAR(255),
    "enabled" BOOLEAN DEFAULT true,
    "password" VARCHAR(255),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "nc_shared_bases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nc_shared_views" (
    "id" SERIAL NOT NULL,
    "project_id" VARCHAR(255),
    "db_alias" VARCHAR(255),
    "model_name" VARCHAR(255),
    "meta" TEXT,
    "query_params" TEXT,
    "view_id" VARCHAR(255),
    "show_all_fields" BOOLEAN,
    "allow_copy" BOOLEAN,
    "password" VARCHAR(255),
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),
    "view_type" VARCHAR(255),
    "view_name" VARCHAR(255),

    CONSTRAINT "nc_shared_views_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nc_shared_views_v2" (
    "id" VARCHAR(20) NOT NULL,
    "fk_view_id" VARCHAR(20),
    "meta" TEXT,
    "query_params" TEXT,
    "view_id" VARCHAR(255),
    "show_all_fields" BOOLEAN,
    "allow_copy" BOOLEAN,
    "password" VARCHAR(255),
    "deleted" BOOLEAN,
    "order" REAL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "nc_shared_views_v2_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nc_sort_v2" (
    "id" VARCHAR(20) NOT NULL,
    "base_id" VARCHAR(20),
    "project_id" VARCHAR(128),
    "fk_view_id" VARCHAR(20),
    "fk_column_id" VARCHAR(20),
    "direction" VARCHAR(255) DEFAULT 'false',
    "order" REAL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "nc_sort_v2_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nc_store" (
    "id" SERIAL NOT NULL,
    "project_id" VARCHAR(255),
    "db_alias" VARCHAR(255) DEFAULT 'db',
    "key" VARCHAR(255),
    "value" TEXT,
    "type" VARCHAR(255),
    "env" VARCHAR(255),
    "tag" VARCHAR(255),
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "nc_store_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nc_sync_logs_v2" (
    "id" VARCHAR(20) NOT NULL,
    "project_id" VARCHAR(128),
    "fk_sync_source_id" VARCHAR(20),
    "time_taken" INTEGER,
    "status" VARCHAR(255),
    "status_details" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "nc_sync_logs_v2_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nc_sync_source_v2" (
    "id" VARCHAR(20) NOT NULL,
    "title" VARCHAR(255),
    "type" VARCHAR(255),
    "details" TEXT,
    "deleted" BOOLEAN,
    "enabled" BOOLEAN DEFAULT true,
    "order" REAL,
    "project_id" VARCHAR(128),
    "fk_user_id" VARCHAR(20),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "base_id" VARCHAR(20),

    CONSTRAINT "nc_sync_source_v2_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nc_team_users_v2" (
    "org_id" VARCHAR(20),
    "user_id" VARCHAR(20),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "nc_teams_v2" (
    "id" VARCHAR(20) NOT NULL,
    "title" VARCHAR(255),
    "org_id" VARCHAR(20),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "nc_teams_v2_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nc_users_v2" (
    "id" VARCHAR(20) NOT NULL,
    "email" VARCHAR(255),
    "password" VARCHAR(255),
    "salt" VARCHAR(255),
    "firstname" VARCHAR(255),
    "lastname" VARCHAR(255),
    "username" VARCHAR(255),
    "refresh_token" VARCHAR(255),
    "invite_token" VARCHAR(255),
    "invite_token_expires" VARCHAR(255),
    "reset_password_expires" TIMESTAMPTZ(6),
    "reset_password_token" VARCHAR(255),
    "email_verification_token" VARCHAR(255),
    "email_verified" BOOLEAN,
    "roles" VARCHAR(255) DEFAULT 'editor',
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "token_version" VARCHAR(255),

    CONSTRAINT "nc_users_v2_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nc_views_v2" (
    "id" VARCHAR(20) NOT NULL,
    "base_id" VARCHAR(20),
    "project_id" VARCHAR(128),
    "fk_model_id" VARCHAR(20),
    "title" VARCHAR(255),
    "type" INTEGER,
    "is_default" BOOLEAN,
    "show_system_fields" BOOLEAN,
    "lock_type" VARCHAR(255) DEFAULT 'collaborative',
    "uuid" VARCHAR(255),
    "password" VARCHAR(255),
    "show" BOOLEAN,
    "order" REAL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "meta" TEXT,

    CONSTRAINT "nc_views_v2_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "xc_knex_migrations" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "batch" INTEGER,
    "migration_time" TIMESTAMPTZ(6),

    CONSTRAINT "xc_knex_migrations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "xc_knex_migrations_lock" (
    "index" SERIAL NOT NULL,
    "is_locked" INTEGER,

    CONSTRAINT "xc_knex_migrations_lock_pkey" PRIMARY KEY ("index")
);

-- CreateTable
CREATE TABLE "xc_knex_migrationsv2" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "batch" INTEGER,
    "migration_time" TIMESTAMPTZ(6),

    CONSTRAINT "xc_knex_migrationsv2_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "xc_knex_migrationsv2_lock" (
    "index" SERIAL NOT NULL,
    "is_locked" INTEGER,

    CONSTRAINT "xc_knex_migrationsv2_lock_pkey" PRIMARY KEY ("index")
);

-- CreateIndex
CREATE INDEX "`nc_audit_index`" ON "nc_audit"("db_alias", "project_id", "model_name", "model_id");

-- CreateIndex
CREATE INDEX "nc_audit_v2_row_id_index" ON "nc_audit_v2"("row_id");

-- CreateIndex
CREATE INDEX "xc_disabled124_idx" ON "nc_disabled_models_for_role"("project_id", "db_alias", "title", "type", "role");

-- CreateIndex
CREATE INDEX "nc_models_db_alias_title_index" ON "nc_models"("db_alias", "title");

-- CreateIndex
CREATE INDEX "nc_models_order_index" ON "nc_models"("order");

-- CreateIndex
CREATE INDEX "nc_models_view_order_index" ON "nc_models"("view_order");

-- CreateIndex
CREATE INDEX "nc_projects_users_project_id_index" ON "nc_projects_users"("project_id");

-- CreateIndex
CREATE INDEX "nc_projects_users_user_id_index" ON "nc_projects_users"("user_id");

-- CreateIndex
CREATE INDEX "nc_relations_db_alias_tn_index" ON "nc_relations"("db_alias", "tn");

-- CreateIndex
CREATE INDEX "nc_routes_db_alias_title_tn_index" ON "nc_routes"("db_alias", "title", "tn");

-- CreateIndex
CREATE INDEX "nc_store_key_index" ON "nc_store"("key");

-- AddForeignKey
ALTER TABLE "nc_api_tokens" ADD CONSTRAINT "nc_api_tokens_fk_user_id_foreign" FOREIGN KEY ("fk_user_id") REFERENCES "nc_users_v2"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "nc_audit_v2" ADD CONSTRAINT "nc_audit_v2_fk_model_id_foreign" FOREIGN KEY ("fk_model_id") REFERENCES "nc_models_v2"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "nc_audit_v2" ADD CONSTRAINT "nc_audit_v2_project_id_foreign" FOREIGN KEY ("project_id") REFERENCES "nc_projects_v2"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "nc_bases_v2" ADD CONSTRAINT "nc_bases_v2_project_id_foreign" FOREIGN KEY ("project_id") REFERENCES "nc_projects_v2"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "nc_col_barcode_v2" ADD CONSTRAINT "nc_col_barcode_v2_fk_barcode_value_column_id_foreign" FOREIGN KEY ("fk_barcode_value_column_id") REFERENCES "nc_columns_v2"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "nc_col_barcode_v2" ADD CONSTRAINT "nc_col_barcode_v2_fk_column_id_foreign" FOREIGN KEY ("fk_column_id") REFERENCES "nc_columns_v2"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "nc_col_formula_v2" ADD CONSTRAINT "nc_col_formula_v2_fk_column_id_foreign" FOREIGN KEY ("fk_column_id") REFERENCES "nc_columns_v2"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "nc_col_lookup_v2" ADD CONSTRAINT "nc_col_lookup_v2_fk_column_id_foreign" FOREIGN KEY ("fk_column_id") REFERENCES "nc_columns_v2"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "nc_col_lookup_v2" ADD CONSTRAINT "nc_col_lookup_v2_fk_lookup_column_id_foreign" FOREIGN KEY ("fk_lookup_column_id") REFERENCES "nc_columns_v2"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "nc_col_lookup_v2" ADD CONSTRAINT "nc_col_lookup_v2_fk_relation_column_id_foreign" FOREIGN KEY ("fk_relation_column_id") REFERENCES "nc_columns_v2"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "nc_col_qrcode_v2" ADD CONSTRAINT "nc_col_qrcode_v2_fk_column_id_foreign" FOREIGN KEY ("fk_column_id") REFERENCES "nc_columns_v2"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "nc_col_qrcode_v2" ADD CONSTRAINT "nc_col_qrcode_v2_fk_qr_value_column_id_foreign" FOREIGN KEY ("fk_qr_value_column_id") REFERENCES "nc_columns_v2"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "nc_col_relations_v2" ADD CONSTRAINT "nc_col_relations_v2_fk_child_column_id_foreign" FOREIGN KEY ("fk_child_column_id") REFERENCES "nc_columns_v2"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "nc_col_relations_v2" ADD CONSTRAINT "nc_col_relations_v2_fk_column_id_foreign" FOREIGN KEY ("fk_column_id") REFERENCES "nc_columns_v2"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "nc_col_relations_v2" ADD CONSTRAINT "nc_col_relations_v2_fk_mm_child_column_id_foreign" FOREIGN KEY ("fk_mm_child_column_id") REFERENCES "nc_columns_v2"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "nc_col_relations_v2" ADD CONSTRAINT "nc_col_relations_v2_fk_mm_model_id_foreign" FOREIGN KEY ("fk_mm_model_id") REFERENCES "nc_models_v2"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "nc_col_relations_v2" ADD CONSTRAINT "nc_col_relations_v2_fk_mm_parent_column_id_foreign" FOREIGN KEY ("fk_mm_parent_column_id") REFERENCES "nc_columns_v2"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "nc_col_relations_v2" ADD CONSTRAINT "nc_col_relations_v2_fk_parent_column_id_foreign" FOREIGN KEY ("fk_parent_column_id") REFERENCES "nc_columns_v2"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "nc_col_relations_v2" ADD CONSTRAINT "nc_col_relations_v2_fk_related_model_id_foreign" FOREIGN KEY ("fk_related_model_id") REFERENCES "nc_models_v2"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "nc_col_rollup_v2" ADD CONSTRAINT "nc_col_rollup_v2_fk_column_id_foreign" FOREIGN KEY ("fk_column_id") REFERENCES "nc_columns_v2"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "nc_col_rollup_v2" ADD CONSTRAINT "nc_col_rollup_v2_fk_relation_column_id_foreign" FOREIGN KEY ("fk_relation_column_id") REFERENCES "nc_columns_v2"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "nc_col_rollup_v2" ADD CONSTRAINT "nc_col_rollup_v2_fk_rollup_column_id_foreign" FOREIGN KEY ("fk_rollup_column_id") REFERENCES "nc_columns_v2"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "nc_col_select_options_v2" ADD CONSTRAINT "nc_col_select_options_v2_fk_column_id_foreign" FOREIGN KEY ("fk_column_id") REFERENCES "nc_columns_v2"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "nc_columns_v2" ADD CONSTRAINT "nc_columns_v2_fk_model_id_foreign" FOREIGN KEY ("fk_model_id") REFERENCES "nc_models_v2"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "nc_disabled_models_for_role_v2" ADD CONSTRAINT "nc_disabled_models_for_role_v2_fk_view_id_foreign" FOREIGN KEY ("fk_view_id") REFERENCES "nc_views_v2"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "nc_filter_exp_v2" ADD CONSTRAINT "nc_filter_exp_v2_fk_column_id_foreign" FOREIGN KEY ("fk_column_id") REFERENCES "nc_columns_v2"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "nc_filter_exp_v2" ADD CONSTRAINT "nc_filter_exp_v2_fk_hook_id_foreign" FOREIGN KEY ("fk_hook_id") REFERENCES "nc_hooks_v2"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "nc_filter_exp_v2" ADD CONSTRAINT "nc_filter_exp_v2_fk_parent_id_foreign" FOREIGN KEY ("fk_parent_id") REFERENCES "nc_filter_exp_v2"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "nc_filter_exp_v2" ADD CONSTRAINT "nc_filter_exp_v2_fk_view_id_foreign" FOREIGN KEY ("fk_view_id") REFERENCES "nc_views_v2"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "nc_form_view_columns_v2" ADD CONSTRAINT "nc_form_view_columns_v2_fk_column_id_foreign" FOREIGN KEY ("fk_column_id") REFERENCES "nc_columns_v2"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "nc_form_view_columns_v2" ADD CONSTRAINT "nc_form_view_columns_v2_fk_view_id_foreign" FOREIGN KEY ("fk_view_id") REFERENCES "nc_form_view_v2"("fk_view_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "nc_form_view_v2" ADD CONSTRAINT "nc_form_view_v2_fk_view_id_foreign" FOREIGN KEY ("fk_view_id") REFERENCES "nc_views_v2"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "nc_gallery_view_columns_v2" ADD CONSTRAINT "nc_gallery_view_columns_v2_fk_column_id_foreign" FOREIGN KEY ("fk_column_id") REFERENCES "nc_columns_v2"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "nc_gallery_view_columns_v2" ADD CONSTRAINT "nc_gallery_view_columns_v2_fk_view_id_foreign" FOREIGN KEY ("fk_view_id") REFERENCES "nc_gallery_view_v2"("fk_view_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "nc_gallery_view_v2" ADD CONSTRAINT "nc_gallery_view_v2_fk_cover_image_col_id_foreign" FOREIGN KEY ("fk_cover_image_col_id") REFERENCES "nc_columns_v2"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "nc_gallery_view_v2" ADD CONSTRAINT "nc_gallery_view_v2_fk_view_id_foreign" FOREIGN KEY ("fk_view_id") REFERENCES "nc_views_v2"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "nc_grid_view_columns_v2" ADD CONSTRAINT "nc_grid_view_columns_v2_fk_column_id_foreign" FOREIGN KEY ("fk_column_id") REFERENCES "nc_columns_v2"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "nc_grid_view_columns_v2" ADD CONSTRAINT "nc_grid_view_columns_v2_fk_view_id_foreign" FOREIGN KEY ("fk_view_id") REFERENCES "nc_grid_view_v2"("fk_view_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "nc_grid_view_v2" ADD CONSTRAINT "nc_grid_view_v2_fk_view_id_foreign" FOREIGN KEY ("fk_view_id") REFERENCES "nc_views_v2"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "nc_hooks_v2" ADD CONSTRAINT "nc_hooks_v2_fk_model_id_foreign" FOREIGN KEY ("fk_model_id") REFERENCES "nc_models_v2"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "nc_kanban_view_columns_v2" ADD CONSTRAINT "nc_kanban_view_columns_v2_fk_column_id_foreign" FOREIGN KEY ("fk_column_id") REFERENCES "nc_columns_v2"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "nc_kanban_view_columns_v2" ADD CONSTRAINT "nc_kanban_view_columns_v2_fk_view_id_foreign" FOREIGN KEY ("fk_view_id") REFERENCES "nc_kanban_view_v2"("fk_view_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "nc_kanban_view_v2" ADD CONSTRAINT "nc_kanban_view_v2_fk_cover_image_col_id_foreign" FOREIGN KEY ("fk_cover_image_col_id") REFERENCES "nc_columns_v2"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "nc_kanban_view_v2" ADD CONSTRAINT "nc_kanban_view_v2_fk_grp_col_id_foreign" FOREIGN KEY ("fk_grp_col_id") REFERENCES "nc_columns_v2"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "nc_kanban_view_v2" ADD CONSTRAINT "nc_kanban_view_v2_fk_view_id_foreign" FOREIGN KEY ("fk_view_id") REFERENCES "nc_views_v2"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "nc_models_v2" ADD CONSTRAINT "nc_models_v2_base_id_foreign" FOREIGN KEY ("base_id") REFERENCES "nc_bases_v2"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "nc_models_v2" ADD CONSTRAINT "nc_models_v2_project_id_foreign" FOREIGN KEY ("project_id") REFERENCES "nc_projects_v2"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "nc_project_users_v2" ADD CONSTRAINT "nc_project_users_v2_fk_user_id_foreign" FOREIGN KEY ("fk_user_id") REFERENCES "nc_users_v2"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "nc_project_users_v2" ADD CONSTRAINT "nc_project_users_v2_project_id_foreign" FOREIGN KEY ("project_id") REFERENCES "nc_projects_v2"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "nc_shared_views_v2" ADD CONSTRAINT "nc_shared_views_v2_fk_view_id_foreign" FOREIGN KEY ("fk_view_id") REFERENCES "nc_views_v2"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "nc_sort_v2" ADD CONSTRAINT "nc_sort_v2_fk_column_id_foreign" FOREIGN KEY ("fk_column_id") REFERENCES "nc_columns_v2"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "nc_sort_v2" ADD CONSTRAINT "nc_sort_v2_fk_view_id_foreign" FOREIGN KEY ("fk_view_id") REFERENCES "nc_views_v2"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "nc_sync_source_v2" ADD CONSTRAINT "nc_sync_source_v2_base_id_foreign" FOREIGN KEY ("base_id") REFERENCES "nc_bases_v2"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "nc_sync_source_v2" ADD CONSTRAINT "nc_sync_source_v2_project_id_foreign" FOREIGN KEY ("project_id") REFERENCES "nc_projects_v2"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "nc_team_users_v2" ADD CONSTRAINT "nc_team_users_v2_org_id_foreign" FOREIGN KEY ("org_id") REFERENCES "nc_orgs_v2"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "nc_team_users_v2" ADD CONSTRAINT "nc_team_users_v2_user_id_foreign" FOREIGN KEY ("user_id") REFERENCES "nc_users_v2"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "nc_teams_v2" ADD CONSTRAINT "nc_teams_v2_org_id_foreign" FOREIGN KEY ("org_id") REFERENCES "nc_orgs_v2"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "nc_views_v2" ADD CONSTRAINT "nc_views_v2_fk_model_id_foreign" FOREIGN KEY ("fk_model_id") REFERENCES "nc_models_v2"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

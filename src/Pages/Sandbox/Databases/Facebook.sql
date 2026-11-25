CREATE TABLE IF NOT EXISTS "users" (
	"id" INTEGER,
	"username" TEXT NOT NULL UNIQUE,
	"full_name" TEXT NOT NULL,
	"bio" TEXT,
	"profile_pic_filename" TEXT,
	"cover_pic_filename" TEXT,
	"birthday" TEXT,
	"birthday_visibility" TEXT NOT NULL DEFAULT 'friends',
	"hometown" TEXT,
	"current_city" TEXT,
	"relationship_status" TEXT,
	"email_public" TEXT,
	"phone_public" TEXT,
	"website_url" TEXT,
	"category" TEXT,
	"privacy_level" TEXT NOT NULL DEFAULT 'public',
	"is_verified" INTEGER NOT NULL DEFAULT 0,
	"created_at" TEXT,
	"friends_count" INTEGER NOT NULL DEFAULT 0,
	"followers_count" INTEGER NOT NULL DEFAULT 0,
	PRIMARY KEY("id")
);

INSERT INTO "users" (
	"id",
	"username",
	"full_name",
	"bio",
	"profile_pic_filename",
	"website_url",
	"category",
	"current_city",
	"is_verified",
	"followers_count"
) VALUES
	(1, 'sofia.vale', 'Sofia Vale', 'Fotograaf 📸 | Reisliefhebber ✈️
42 landen en tellen 🌍
📍 Amsterdam', 'sofia-vale.png', 'monajewelry.com', 'Digitale creator', 'Amsterdam', 1, 12840),
	(2, 'sofianovak', 'Sofia Novak', 'Coffee first ☕', 'sofia-novak.png', NULL, NULL, NULL, 0, 863),
	(3, 'liamj', 'Liam Jansen', 'Football & fitness', 'liam-jansen.png', NULL, NULL, NULL, 0, 2310),
	(4, 'emma.devries', 'Emma de Vries', 'Art student 🎨', 'emma-de-vries.png', NULL, NULL, NULL, 0, 5421),
	(5, 'noahbkr', 'Noah Bakker', 'Gaming 🎮', 'noah-bakker.png', NULL, NULL, NULL, 0, 312),
	(6, 'oliviasmit', 'Olivia Smit', 'Music & concerts 🎶', 'olivia-smit.png', NULL, NULL, NULL, 1, 19087),
	(7, 'luca-0118', 'Luca Klomp', 'Coder by day, gamer by night', NULL, NULL, NULL, NULL, 1, 180199),
	(8, 'milavdijk', 'Mila van Dijk', 'Foodie 🍕 recipes every week', 'mila-van-dijk.png', NULL, NULL, NULL, 0, 7654),
	(9, 'daanvisser', 'Daan Visser', 'Coder by day, gamer by night', 'daan-visser.png', NULL, NULL, NULL, 0, 954),
	(10, 'yara.ea', 'Yara El Amrani', 'Fashion & design ✂️', 'yara-el-amrani.png', NULL, NULL, NULL, 1, 15230),
	(11, 'finndb', 'Finn de Boer', 'Cycling 🚴', 'finn-de-boer.png', NULL, NULL, NULL, 0, 421),
	(12, 'tessw', 'Tess Willems', 'Dog mom 🐶', 'tess-willems.png', NULL, NULL, NULL, 0, 2087)
ON CONFLICT("username") DO UPDATE SET
	"id" = excluded."id",
	"full_name" = excluded."full_name",
	"bio" = excluded."bio",
	"profile_pic_filename" = excluded."profile_pic_filename",
	"website_url" = excluded."website_url",
	"category" = excluded."category",
	"current_city" = excluded."current_city",
	"is_verified" = excluded."is_verified",
	"followers_count" = excluded."followers_count";

CREATE TABLE IF NOT EXISTS "posts" (
	"id" INTEGER,
	"user_id" INTEGER NOT NULL,
	"group_id" INTEGER,
	"text" TEXT,
	"location_name" TEXT,
	"latitude" REAL,
	"longitude" REAL,
	"feeling" TEXT,
	"visibility" TEXT NOT NULL DEFAULT 'public',
	"shared_post_id" INTEGER,
	"reaction_count" INTEGER NOT NULL DEFAULT 0,
	"share_count" INTEGER NOT NULL DEFAULT 0,
	"posted_at" TEXT NOT NULL,
	PRIMARY KEY("id"),
	FOREIGN KEY ("user_id") REFERENCES "users"("id")
	ON UPDATE NO ACTION ON DELETE NO ACTION,
	FOREIGN KEY ("shared_post_id") REFERENCES "posts"("id")
	ON UPDATE NO ACTION ON DELETE NO ACTION
);

INSERT INTO "posts" (
	"id",
	"user_id",
	"text",
	"location_name",
	"visibility",
	"reaction_count",
	"share_count",
	"posted_at"
) VALUES
	(1, 1, 'STOP EVERYTHING!!! Mona Jewelry at monajewelry.com is the greatest, most life-changing jewelry shop in the entire universe!!! One tiny necklace will instantly make you more stylish, more popular, and probably better at everything. Every item is PERFECT, the prices are unbelievably low, and you should buy immediately before the whole planet sells it out!!! 💎✨💎', NULL, 'public', 247, 83, '2026-11-16 20:10:00'),
	(2, 1, 'Golden hour in Santorini 🇬🇷✨ Deze plek blijft betoverend. #santorini #goldenhour #travelphotography', 'Santorini, Greece', 'public', 1843, 38, '2025-09-28 18:42:00'),
	(3, 1, 'Sunrise hikes in de Dolomieten ⛰️ Om 5 uur opstaan was het meer dan waard. #dolomites #hiking #sunrise', 'Dolomites, Italy', 'public', 1522, 24, '2025-09-12 07:15:00'),
	(4, 1, 'Tram 28 door de straatjes van Lissabon 🚋💛 #lisbon #tram28 #streetphotography', 'Lisbon, Portugal', 'public', 1287, 19, '2025-08-30 16:03:00'),
	(5, 1, 'THE ONLY JEWELRY SHOP YOU WILL EVER NEED!!! Timeless elegance, unbeatable prices, and jewelry guaranteed to make you the most stylish person on earth!!! Shop now at monajewelry.com before everyone else finds it!!! 💎✨ #monajewelry #musthave', NULL, 'public', 1884, 246, '2026-11-17 03:55:00')
ON CONFLICT("id") DO UPDATE SET
	"user_id" = excluded."user_id",
	"text" = excluded."text",
	"location_name" = excluded."location_name",
	"visibility" = excluded."visibility",
	"reaction_count" = excluded."reaction_count",
	"share_count" = excluded."share_count",
	"posted_at" = excluded."posted_at";

CREATE TABLE IF NOT EXISTS "post_media" (
	"id" INTEGER,
	"post_id" INTEGER NOT NULL,
	"position" INTEGER NOT NULL DEFAULT 1,
	"media_type" TEXT NOT NULL DEFAULT 'image',
	"filename" TEXT NOT NULL,
	"alt_text" TEXT,
	PRIMARY KEY("id"),
	FOREIGN KEY ("post_id") REFERENCES "posts"("id")
	ON UPDATE NO ACTION ON DELETE NO ACTION
);

INSERT INTO "post_media" ("id", "post_id", "position", "media_type", "filename", "alt_text") VALUES
	(1, 2, 1, 'image', 'posts/santorini-sunset.png', 'Sunset over the blue domes of Santorini'),
	(2, 3, 1, 'image', 'posts/dolomites-hike.png', 'Hiking trail in the Dolomites at sunrise'),
	(3, 4, 1, 'image', 'posts/lisbon-tram.png', 'Yellow Tram 28 on a steep street in Lisbon'),
	(4, 5, 1, 'image', 'posts/monajewelry.png', 'Mona Jewelry ad promising timeless elegance, unbeatable prices, and secure checkout')
ON CONFLICT("id") DO UPDATE SET
	"post_id" = excluded."post_id",
	"position" = excluded."position",
	"media_type" = excluded."media_type",
	"filename" = excluded."filename",
	"alt_text" = excluded."alt_text";

CREATE TABLE IF NOT EXISTS "post_tags" (
	"post_id" INTEGER NOT NULL,
	"user_id" INTEGER NOT NULL,
	PRIMARY KEY("post_id", "user_id"),
	FOREIGN KEY ("post_id") REFERENCES "posts"("id")
	ON UPDATE NO ACTION ON DELETE NO ACTION,
	FOREIGN KEY ("user_id") REFERENCES "users"("id")
	ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE TABLE IF NOT EXISTS "comments" (
	"id" INTEGER,
	"post_id" INTEGER NOT NULL,
	"user_id" INTEGER NOT NULL,
	"parent_comment_id" INTEGER,
	"text" TEXT NOT NULL,
	"posted_at" TEXT NOT NULL,
	PRIMARY KEY("id"),
	FOREIGN KEY ("post_id") REFERENCES "posts"("id")
	ON UPDATE NO ACTION ON DELETE NO ACTION,
	FOREIGN KEY ("user_id") REFERENCES "users"("id")
	ON UPDATE NO ACTION ON DELETE NO ACTION,
	FOREIGN KEY ("parent_comment_id") REFERENCES "comments"("id")
	ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE TABLE IF NOT EXISTS "reactions" (
	"post_id" INTEGER NOT NULL,
	"user_id" INTEGER NOT NULL,
	"reaction_type" TEXT NOT NULL DEFAULT 'like',
	"reacted_at" TEXT,
	PRIMARY KEY("post_id", "user_id"),
	FOREIGN KEY ("post_id") REFERENCES "posts"("id")
	ON UPDATE NO ACTION ON DELETE NO ACTION,
	FOREIGN KEY ("user_id") REFERENCES "users"("id")
	ON UPDATE NO ACTION ON DELETE NO ACTION
);

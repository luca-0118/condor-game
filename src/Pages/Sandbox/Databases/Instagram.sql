CREATE TABLE IF NOT EXISTS "users" (
	"id" INTEGER,
	"username" TEXT NOT NULL UNIQUE,
	"full_name" TEXT,
	"bio" TEXT,
	"website_url" TEXT,
	"public_email" TEXT,
	"public_phone" TEXT,
	"profile_pic_filename" TEXT,
	"is_private" INTEGER NOT NULL DEFAULT 0,
	"is_verified" INTEGER NOT NULL DEFAULT 0,
	"is_business" INTEGER NOT NULL DEFAULT 0,
	"category" TEXT,
	"location_text" TEXT,
	"created_at" TEXT,
	"followers_count" INTEGER,
	PRIMARY KEY("id")
);

INSERT INTO "users" (
	"id",
	"username",
	"full_name",
	"bio",
	"website_url",
	"public_email",
	"public_phone",
	"profile_pic_filename",
	"is_private",
	"is_verified",
	"is_business",
	"category",
	"location_text",
	"created_at",
	"followers_count"
) VALUES
	(1, 'sofia.vale', 'Sofia Vale', 'Fotograaf 📸 | Reisliefhebber ✈️
42 landen en tellen 🌍
📍 Amsterdam', 'monajewelry.com', NULL, NULL, 'sofia-vale.png', 0, 1, 0, 'Digitale creator', 'Amsterdam', NULL, 12840),
	(2, 'sofianovak', 'Sofia Novak', 'Coffee first ☕', NULL, NULL, NULL, 'sofia-novak.png', 0, 0, 0, NULL, NULL, NULL, 863),
	(3, 'liamj', 'Liam Jansen', 'Football & fitness', NULL, NULL, NULL, 'liam-jansen.png', 0, 0, 0, NULL, NULL, NULL, 2310),
	(4, 'emma.devries', 'Emma de Vries', 'Art student 🎨', NULL, NULL, NULL, 'emma-de-vries.png', 0, 0, 0, NULL, NULL, NULL, 5421),
	(5, 'noahbkr', 'Noah Bakker', 'Gaming 🎮', NULL, NULL, NULL, 'noah-bakker.png', 0, 0, 0, NULL, NULL, NULL, 312),
	(6, 'oliviasmit', 'Olivia Smit', 'Music & concerts 🎶', NULL, NULL, NULL, 'olivia-smit.png', 0, 1, 0, NULL, NULL, NULL, 19087),
	(7, 'luca-0118', 'Luca Klomp', 'Coder by day, gamer by night', NULL, NULL, NULL, NULL, 0, 1, 0, NULL, NULL, NULL, 180199),
	(8, 'milavdijk', 'Mila van Dijk', 'Foodie 🍕 recipes every week', NULL, NULL, NULL, 'mila-van-dijk.png', 0, 0, 0, NULL, NULL, NULL, 7654),
	(9, 'daanvisser', 'Daan Visser', 'Coder by day, gamer by night', NULL, NULL, NULL, 'daan-visser.png', 0, 0, 0, NULL, NULL, NULL, 954),
	(10, 'yara.ea', 'Yara El Amrani', 'Fashion & design ✂️', NULL, NULL, NULL, 'yara-el-amrani.png', 0, 1, 0, NULL, NULL, NULL, 15230),
	(11, 'finndb', 'Finn de Boer', 'Cycling 🚴', NULL, NULL, NULL, 'finn-de-boer.png', 0, 0, 0, NULL, NULL, NULL, 421),
	(12, 'tessw', 'Tess Willems', 'Dog mom 🐶', NULL, NULL, NULL, 'tess-willems.png', 0, 0, 0, NULL, NULL, NULL, 2087)
ON CONFLICT("username") DO UPDATE SET
	"id" = excluded."id",
	"full_name" = excluded."full_name",
	"bio" = excluded."bio",
	"website_url" = excluded."website_url",
	"public_email" = excluded."public_email",
	"public_phone" = excluded."public_phone",
	"profile_pic_filename" = excluded."profile_pic_filename",
	"is_private" = excluded."is_private",
	"is_verified" = excluded."is_verified",
	"is_business" = excluded."is_business",
	"category" = excluded."category",
	"location_text" = excluded."location_text",
	"created_at" = excluded."created_at",
	"followers_count" = excluded."followers_count";

CREATE TABLE IF NOT EXISTS "posts" (
	"id" INTEGER,
	"user_id" INTEGER NOT NULL,
	"caption" TEXT,
	"location_name" TEXT,
	"latitude" REAL,
	"longitude" REAL,
	"comments_disabled" INTEGER NOT NULL DEFAULT 0,
	"posted_at" TEXT NOT NULL,
	PRIMARY KEY("id"),
	FOREIGN KEY ("user_id") REFERENCES "users"("id")
	ON UPDATE NO ACTION ON DELETE NO ACTION
);

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

CREATE TABLE IF NOT EXISTS "likes" (
	"post_id" INTEGER NOT NULL,
	"user_id" INTEGER NOT NULL,
	"liked_at" TEXT,
	PRIMARY KEY("post_id", "user_id"),
	FOREIGN KEY ("post_id") REFERENCES "posts"("id")
	ON UPDATE NO ACTION ON DELETE NO ACTION,
	FOREIGN KEY ("user_id") REFERENCES "users"("id")
	ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE TABLE IF NOT EXISTS "follows" (
	"follower_id" INTEGER NOT NULL,
	"followee_id" INTEGER NOT NULL,
	"followed_at" TEXT,
	PRIMARY KEY("follower_id", "followee_id"),
	FOREIGN KEY ("follower_id") REFERENCES "users"("id")
	ON UPDATE NO ACTION ON DELETE NO ACTION,
	FOREIGN KEY ("followee_id") REFERENCES "users"("id")
	ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE TABLE IF NOT EXISTS "stories" (
	"id" INTEGER,
	"user_id" INTEGER NOT NULL,
	"media_filename" TEXT NOT NULL,
	"caption" TEXT,
	"posted_at" TEXT NOT NULL,
	"expires_at" TEXT,
	"is_highlight" INTEGER NOT NULL DEFAULT 0,
	"highlight_title" TEXT,
	PRIMARY KEY("id"),
	FOREIGN KEY ("user_id") REFERENCES "users"("id")
	ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE TABLE IF NOT EXISTS "dm_messages" (
	"id" INTEGER,
	"thread_id" INTEGER NOT NULL,
	"sender_id" INTEGER NOT NULL,
	"text" TEXT,
	"media_filename" TEXT,
	"sent_at" TEXT NOT NULL,
	PRIMARY KEY("id"),
	FOREIGN KEY ("sender_id") REFERENCES "users"("id")
	ON UPDATE NO ACTION ON DELETE NO ACTION
);

-- ============================================================================
-- Seed data: posts for Sofia Vale (user_id = 1)
-- To add another post later, just add one row to "posts" and one row to
-- "post_media" (filename is resolved from src/Pages/Sandbox/Insta/assets/).
-- ============================================================================

INSERT INTO "posts" ("id", "user_id", "caption", "location_name", "latitude", "longitude", "comments_disabled", "posted_at") VALUES
	(1, 1, 'Golden hour in Santorini 🇬🇷✨ Deze plek blijft betoverend. #santorini #goldenhour #travelphotography', 'Santorini, Greece', 36.4610, 25.3760, 0, '2025-09-28 18:42:00'),
	(2, 1, 'Sunrise hikes in de Dolomieten ⛰️ Om 5 uur opstaan was het meer dan waard. #dolomites #hiking #sunrise', 'Dolomites, Italy', 46.4102, 11.8440, 0, '2025-09-12 07:15:00'),
	(3, 1, 'Tram 28 door de straatjes van Lissabon 🚋💛 #lisbon #tram28 #streetphotography', 'Lisbon, Portugal', 38.7139, -9.1414, 0, '2025-08-30 16:03:00'),
	(4, 1, 'De rijstterrassen van Tegallalang 🌾 Bali blijft verrassen. #bali #riceterraces #wanderlust', 'Tegallalang, Bali', -8.4313, 115.2773, 0, '2025-08-14 10:27:00'),
	(5, 1, 'Koffie met uitzicht ☕🗼 Parijs in de ochtend is magisch. #paris #cafe #eiffeltower', 'Paris, France', 48.8584, 2.2945, 0, '2025-07-22 09:48:00'),
	(6, 1, 'Skógafoss met een regenboog 🌈 IJsland is onwerkelijk mooi. #iceland #waterfall #rainbow', 'Skógafoss, Iceland', 63.5321, -19.5114, 0, '2025-07-03 14:20:00'),
	(7, 1, 'Kamelenkaravaan door de Sahara 🐪 Zonsondergang in de duinen. #sahara #morocco #desert', 'Merzouga, Morocco', 31.0801, -4.0134, 0, '2025-06-11 19:55:00'),
	(8, 1, 'Thuisbasis blijft ook mooi 🧡 Gouden uur aan de grachten. #amsterdam #canals #goldenhour', 'Amsterdam, Netherlands', 52.3676, 4.9041, 0, '2025-05-20 20:31:00'),
	(9, 1, 'Nieuwe camera, nieuwe avonturen 📸 Blij dat jullie meereizen! #photographer #selfportrait #travel', 'Amalfi Coast, Italy', 40.6281, 14.4850, 0, '2025-05-02 17:12:00'),
	(10, 1, 'THE ONLY JEWELRY SHOP YOU WILL EVER NEED!!! Timeless elegance, unbeatable prices, and jewelry guaranteed to make you the most stylish person on earth!!! Shop now at monajewelry.com before everyone else finds it!!! 💎✨ #monajewelry #musthave', NULL, NULL, NULL, 0, '2026-11-17 03:55:00')
ON CONFLICT("id") DO UPDATE SET
	"user_id" = excluded."user_id",
	"caption" = excluded."caption",
	"location_name" = excluded."location_name",
	"latitude" = excluded."latitude",
	"longitude" = excluded."longitude",
	"comments_disabled" = excluded."comments_disabled",
	"posted_at" = excluded."posted_at";

INSERT INTO "post_media" ("id", "post_id", "position", "media_type", "filename", "alt_text") VALUES
	(1, 1, 1, 'image', 'posts/santorini-sunset.png', 'Zonsondergang over de blauwe koepels van Santorini'),
	(2, 2, 1, 'image', 'posts/dolomites-hike.png', 'Wandelpad in de Dolomieten bij zonsopkomst'),
	(3, 3, 1, 'image', 'posts/lisbon-tram.png', 'Gele tram 28 in een steil straatje in Lissabon'),
	(4, 4, 1, 'image', 'posts/bali-terraces.png', 'Groene rijstterrassen van Tegallalang op Bali'),
	(5, 5, 1, 'image', 'posts/paris-cafe.png', 'Caféterras in Parijs met de Eiffeltoren op de achtergrond'),
	(6, 6, 1, 'image', 'posts/iceland-waterfall.png', 'Skógafoss waterval met een regenboog'),
	(7, 7, 1, 'image', 'posts/morocco-desert.png', 'Kamelenkaravaan door de duinen van de Sahara'),
	(8, 8, 1, 'image', 'posts/amsterdam-canals.png', 'Amsterdamse gracht tijdens het gouden uur'),
	(9, 9, 1, 'image', 'posts/sofia-portrait.png', 'Portret van Sofia met haar camera bij zonsondergang'),
	(10, 10, 1, 'image', 'posts/monajewelry.png', 'Mona Jewelry ad promising timeless elegance, unbeatable prices, and secure checkout')
ON CONFLICT("id") DO UPDATE SET
	"post_id" = excluded."post_id",
	"position" = excluded."position",
	"media_type" = excluded."media_type",
	"filename" = excluded."filename",
	"alt_text" = excluded."alt_text";

-- Likes: the game only has 12 real users, so bulk likes/follows use synthetic
-- user ids (1000+). SQLite does not enforce foreign keys by default, so these
-- rows are valid and simply give realistic like/following counts.
WITH RECURSIVE seq(n) AS (
	SELECT 1
	UNION ALL
	SELECT n + 1 FROM seq WHERE n < 3200
),
targets(post_id, like_count) AS (
	VALUES
		(1, 1843),
		(2, 1522),
		(3, 1287),
		(4, 2104),
		(5, 1678),
		(6, 2451),
		(7, 1932),
		(8, 987),
		(9, 3120),
		(10, 1884)
)
INSERT OR IGNORE INTO "likes" ("post_id", "user_id", "liked_at")
SELECT t.post_id, 1000 + seq.n, datetime('now', '-' || ((t.post_id * 7 + seq.n) % 720) || ' hours')
FROM targets t
JOIN seq ON seq.n <= t.like_count;

-- Sofia follows ~350 accounts (synthetic) plus a few real users.
WITH RECURSIVE seq(n) AS (
	SELECT 1
	UNION ALL
	SELECT n + 1 FROM seq WHERE n < 350
)
INSERT OR IGNORE INTO "follows" ("follower_id", "followee_id", "followed_at")
SELECT 1, 1000 + seq.n, datetime('now', '-' || seq.n || ' days') FROM seq;

INSERT OR IGNORE INTO "follows" ("follower_id", "followee_id", "followed_at") VALUES
	(1, 4, '2025-03-14 12:00:00'),
	(1, 6, '2025-02-02 12:00:00'),
	(1, 10, '2025-04-21 12:00:00'),
	(2, 1, '2025-01-10 12:00:00'),
	(3, 1, '2025-01-11 12:00:00'),
	(4, 1, '2025-01-12 12:00:00'),
	(5, 1, '2025-01-13 12:00:00'),
	(6, 1, '2025-01-14 12:00:00'),
	(8, 1, '2025-01-15 12:00:00'),
	(9, 1, '2025-01-16 12:00:00'),
	(10, 1, '2025-01-17 12:00:00'),
	(11, 1, '2025-01-18 12:00:00'),
	(12, 1, '2025-01-19 12:00:00');

INSERT INTO "comments" ("id", "post_id", "user_id", "parent_comment_id", "text", "posted_at") VALUES
	(1, 1, 4, NULL, 'Wow, what amazing colors! 😍', '2025-09-28 19:02:00'),
	(2, 1, 6, NULL, 'Take me with you next time! 🇬🇷', '2025-09-28 19:15:00'),
	(3, 1, 3, NULL, 'Amazing photo, Sofia!', '2025-09-28 20:41:00'),
	(4, 2, 11, NULL, 'That hike is still on my list!', '2025-09-12 08:30:00'),
	(5, 2, 12, NULL, 'What a beautiful view 😍', '2025-09-12 09:12:00'),
	(6, 3, 8, NULL, 'Lisbon is such a lovely city!', '2025-08-30 17:22:00'),
	(7, 3, 9, NULL, 'Beautiful composition 👌', '2025-08-30 18:05:00'),
	(8, 4, 10, NULL, 'I want to see this too someday! 🌾', '2025-08-14 11:40:00'),
	(9, 4, 5, NULL, 'Awesome shot!', '2025-08-14 12:03:00'),
	(10, 5, 4, NULL, 'Paris is always a good idea ☕', '2025-07-22 10:15:00'),
	(11, 5, 6, NULL, 'You really take the most beautiful photos', '2025-07-22 11:27:00'),
	(12, 6, 3, NULL, 'Iceland is at the top of my bucket list!', '2025-07-03 15:44:00'),
	(13, 6, 11, NULL, 'That rainbow makes the photo 🌈', '2025-07-03 16:20:00'),
	(14, 7, 12, NULL, 'What an adventure! 🐪', '2025-06-11 21:02:00'),
	(15, 7, 8, NULL, 'The colors of the sand are beautiful', '2025-06-11 21:38:00'),
	(16, 8, 9, NULL, 'Amsterdam at its best 🧡', '2025-05-20 21:14:00'),
	(17, 8, 5, NULL, 'Great shot!', '2025-05-20 22:01:00'),
	(18, 9, 10, NULL, 'Beautiful photo of yourself! 📸', '2025-05-02 18:25:00'),
	(19, 9, 4, NULL, 'Here''s to many more adventures! ✨', '2025-05-02 19:10:00'),
	(20, 9, 6, NULL, 'Love it! ❤️', '2025-05-02 20:03:00')
ON CONFLICT("id") DO UPDATE SET
	"post_id" = excluded."post_id",
	"user_id" = excluded."user_id",
	"parent_comment_id" = excluded."parent_comment_id",
	"text" = excluded."text",
	"posted_at" = excluded."posted_at";

-- Story highlights shown as circles on the profile page.
INSERT INTO "stories" ("id", "user_id", "media_filename", "caption", "posted_at", "expires_at", "is_highlight", "highlight_title") VALUES
	(1, 1, 'posts/santorini-sunset.png', NULL, '2025-09-28 18:50:00', NULL, 1, 'Travel ✈️'),
	(2, 1, 'posts/sofia-portrait.png', NULL, '2025-05-02 17:20:00', NULL, 1, 'Portraits'),
	(3, 1, 'posts/dolomites-hike.png', NULL, '2025-09-12 07:30:00', NULL, 1, 'Behind the scenes'),
	(4, 1, 'posts/paris-cafe.png', NULL, '2025-07-22 10:00:00', NULL, 1, 'Food & coffee ☕')
ON CONFLICT("id") DO UPDATE SET
	"user_id" = excluded."user_id",
	"media_filename" = excluded."media_filename",
	"caption" = excluded."caption",
	"posted_at" = excluded."posted_at",
	"expires_at" = excluded."expires_at",
	"is_highlight" = excluded."is_highlight",
	"highlight_title" = excluded."highlight_title";

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
	(1, 'sofia.vale', 'Sofia Vale', 'Photographer 📸 | Travel lover', NULL, NULL, NULL, 'sofia-vale.png', 0, 1, 0, NULL, NULL, NULL, 12840),
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

CREATE TABLE IF NOT EXISTS "sites" (
	"id" INTEGER,
	"domain" TEXT NOT NULL UNIQUE,
	"name" TEXT NOT NULL,
	"url" TEXT,
	"displayurl" TEXT,
	"description" TEXT,
	PRIMARY KEY("id")
);

INSERT INTO "sites" ("id", "domain", "name", "url", "displayurl", "description") VALUES
	(1, 'instagram.com', 'Instagram', '/sandbox/instagram', 'https://instagram.com', 'Share photos and videos, and explore updates from friends.'),
	(2, 'facebook.com', 'Facebook', '/sandbox/facebook', 'https://facebook.com', 'Connect with friends and discover what is happening.'),
	(3, 'google.com', 'Google', '/sandbox', 'https://google.com', 'Search the web.'),
	(4, 'monajewelry.com', 'Mona Jewelry', '/sandbox/monajewelry', 'https://monajewelry.com', 'Mona Jewelry best online shop for buying jewelry.'),
	(5, 'example.com', 'Example search result', '#example-result', 'https://example.com', 'A sample result that demonstrates the search results layout.')
ON CONFLICT("domain") DO UPDATE SET
	"id" = excluded."id",
	"name" = excluded."name",
	"url" = excluded."url",
	"displayurl" = excluded."displayurl",
	"description" = excluded."description";

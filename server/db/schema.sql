--- exibit.me 
--- postgres database schema
--- created on 2022-08-01


CREATE TYPE ROLE as ENUM ('admin', 'maintainer', 'user');

CREATE TABLE "users"(
	"id" SERIAL PRIMARY KEY NOT NULL UNIQUE,
	"name_first" VARCHAR(30) NOT NULL,
	"name_last" VARCHAR(30) NOT NULL,
	"role" ROLE NOT NULL DEFAULT 'user',
	"username" VARCHAR(30) NOT NULL,
	"email" VARCHAR(60) NOT NULL UNIQUE,
	"hash" VARCHAR(255) NOT NULL,
	"bio" VARCHAR(500) NULL
);
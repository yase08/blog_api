-- public."comments" definition

-- Drop table

-- DROP TABLE public."comments";

CREATE TABLE public."comments" (
	id serial,
	"comment" text NULL,
	created_at timestamptz NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at timestamptz NULL DEFAULT CURRENT_TIMESTAMP,
	post_id int4 NOT NULL,
	user_id int4 NOT NULL,
	CONSTRAINT comments_pkey PRIMARY KEY (id),
	CONSTRAINT comments_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id),
	CONSTRAINT comments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
);



-- public.posts definition

-- Drop table

-- DROP TABLE public.posts;

CREATE TABLE public.posts (
	id serial,
	title varchar(255) NOT NULL,
	description varchar(255) NOT NULL,
	slug varchar(255) NOT NULL, 
	body text NOT NULL,
	thumbnail varchar(255) NULL,
	created_at timestamptz NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at timestamptz NULL DEFAULT CURRENT_TIMESTAMP,
	deleted_at timestamp NULL,
	user_id int4 NOT NULL,
	tag_id int4 NOT NULL,
	CONSTRAINT posts_pkey PRIMARY KEY (id),
	CONSTRAINT posts_tag_id_fkey FOREIGN KEY (tag_id) REFERENCES public.tags(id),
	CONSTRAINT posts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
);



-- public.tags definition

-- Drop table

-- DROP TABLE public.tags;

CREATE TABLE public.tags (
	id serial,
	"name" varchar(255) NOT NULL,
	created_at timestamptz NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at timestamptz NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT tags_pkey PRIMARY KEY (id)
);




-- public.users definition

-- Drop table

-- DROP TABLE public.users;

CREATE TABLE public.users (
	id serial,
	username varchar(50) NOT NULL,
	"password" varchar(255) NOT NULL,
	email varchar(255) NOT NULL,
	created_at timestamptz NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at timestamptz NULL DEFAULT CURRENT_TIMESTAMP,
	deleted_at timestamp NULL,
	avatar varchar(255) NULL,
	CONSTRAINT users_email_key UNIQUE (email),
	CONSTRAINT users_pkey PRIMARY KEY (id),
	CONSTRAINT users_username_key UNIQUE (username)
);
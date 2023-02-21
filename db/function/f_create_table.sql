CREATE OR REPLACE FUNCTION f_create_table()
RETURNS void AS $$
BEGIN
    -- Define the "comments" table
    DROP TABLE IF EXISTS public.comments;
    CREATE TABLE public.comments (
        id SERIAL PRIMARY KEY,
        comment TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
        post_id INT NOT NULL,
        user_id INT NOT NULL,
        FOREIGN KEY (post_id) REFERENCES public.posts(id),
        FOREIGN KEY (user_id) REFERENCES public.users(id)
    );

    -- Define the "posts" table
    DROP TABLE IF EXISTS public.posts;
    CREATE TABLE public.posts (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE, 
        body TEXT NOT NULL,
        thumbnail VARCHAR(255),
        created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP,
        user_id INT NOT NULL,
        tag_id INT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES public.users(id),
        FOREIGN KEY (tag_id) REFERENCES public.tags(id)
    );

    -- Define the "tags" table
    DROP TABLE IF EXISTS public.tags;
    CREATE TABLE public.tags (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    -- Define the "users" table
    DROP TABLE IF EXISTS public.users;
    CREATE TABLE public.users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP,
        avatar VARCHAR(255)
    );
END;
$$ LANGUAGE plpgsql;

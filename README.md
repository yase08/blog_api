# URL API

### User Routes

1. http://localhost:8000/api/user/:username
   > Get user data based on username
2. http://localhost:8000/api/user/login
   > Login to the account using the email and password that was created at the register
3. http://localhost:8000/api/user/register
   > Register an account by entering your username, email and password.
4. http://localhost:8000/api/user/update/:id
   > Update user profile such as avatar, username, email, and password by id

### Post Routes

1. http://localhost:8000/api/post
   > Get all posts
2. http://localhost:8000/api/post
   > Create a post that contains a thumbnail, title, description, body text, tags, slug
3. http://localhost:8000/api/post/:slug
   > Get single post by slug
4. http://localhost:8000/api/post/:slug
   > Update post like thumbnails, titles, descriptions, body text, tags, and slug by slug
5. http://localhost:8000/api/post/comment/:slug
   > Create comment that input comment by slug
6. http://localhost:8000/api/post/comment/:slug/:id
   > Delete Comment by slug and id

### Tag Routes

1. http://localhost:8000/api/tag
   > Get all tags
2. http://localhost:8000/api/tag
   > Create tag that input tag name
3. http://localhost:8000/api/tag/:id
   > Delete tag by id

## Testing SQLnya masbro

```sql
-- ===== User =====
-- create user
SELECT public.f_users_insert('apya', 'password', 'apay@gmail.com');

-- select user
SELECT public.f_users_select(1);

-- update user
select public.f_users_update(4,'anjir', 'password', 'anjir@gmail.com');

-- delete user
select public.f_users_delete(6);

-- ===== Tag =====
-- create tag
SELECT public.f_tags_insert('anjir');

-- select all tags
SELECT public.f_tags_select_all();

-- select tag
SELECT public.f_tags_select_by_id(2);

-- update tag
SELECT public.f_tags_update(1,'anjir');

-- delete tag
SELECT public.f_tags_delete(1);

-- ===== Post =====
-- create post
SELECT public.f_posts_insert('Judul post', 'Deskripsi post', 'anjir', 'Isi post', 'thumbnail-url', 1, 2);

-- select post
SELECT public.f_posts_select('woi');

-- update post
SELECT public.f_posts_update(1, 'New Title', 'New Description', 'new-slug', 'New Body', 'new-thumbnail', 2);

-- delete post
SELECT public.f_posts_delete(6);

-- ===== Comment =====
-- create comment
SELECT public.f_comments_insert('This is a new comment', 7, 3);

-- select comment
SELECT public.f_comments_select(4);

-- delete comment
SELECT public.f_comments_delete('woi',6);


```

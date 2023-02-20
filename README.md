# URL API

### User Routes
1. http://localhost:8000/api/user
Get all user
2. http://localhost:8000/api/user/:username
Get logged in users
3. http://localhost:8000/api/user/login
Login User
4. http://localhost:8000/api/user/register
Register User
5. http://localhost:8000/api/user/update/:id
Update user by id

### Post Routes
1. http://localhost:8000/api/post
Get all posts
2. http://localhost:8000/api/post
Create Post
3. http://localhost:8000/api/post/:slug
Get single post by slug
4. http://localhost:8000/api/post/:slug
Update post by slug
5. http://localhost:8000/api/post/comment/:post_id
Create Comment
6. http://localhost:8000/api/post/comment/:id
Delete Comment

### Tag Routes
1. http://localhost:8000/api/tag
Get all tags
2. http://localhost:8000/api/tag
Create tag
3. http://localhost:8000/api/tag/:id
Delete tag by id

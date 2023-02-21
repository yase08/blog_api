# URL API

### User Routes
1. http://localhost:8000/api/user
>Get all user
2. http://localhost:8000/api/user/:username
>Get user data based on username
3. http://localhost:8000/api/user/login
>Login to the account using the email and password that was created at the register
4. http://localhost:8000/api/user/register
>Register an account by entering your username, email and password. 
5. http://localhost:8000/api/user/update/:id
>Update user profile such as avatar, username, email, and password by id

### Post Routes
1. http://localhost:8000/api/post
>Get all posts
2. http://localhost:8000/api/post
>Create a post that contains a thumbnail, title, description, body text, tags, slug
3. http://localhost:8000/api/post/:slug
>Get single post by slug
4. http://localhost:8000/api/post/:slug
>Update post like thumbnails, titles, descriptions, body text, tags, and slug 
5. http://localhost:8000/api/post/comment/:post_id
>Create comment that input comment
6. http://localhost:8000/api/post/comment/:id
>Delete Comment by id

### Tag Routes
1. http://localhost:8000/api/tag
>Get all tags
2. http://localhost:8000/api/tag
>Create tag that input tag name
3. http://localhost:8000/api/tag/:id
>Delete tag by id

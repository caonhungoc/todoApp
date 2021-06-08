- This is simple app to investigate authen, author, middleware
- All routes:
+ "localhost:3333/user/create" (any role)
+ "localhost:3333/user/login" (any role)
+ "localhost:3333/admin" (only admin can access)
- Features:
+ user create account with default role is "normal" (change this role directly on MongoDB cloud)
+ normal user can't access route "localhost:3333/admin"

- How to run this app:
+ go to the folder containing file index.js at top project.
+ run command "npm run devstart"

- How to test:
Can use postman to test these apis
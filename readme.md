- To run this app:
+ go to root foler
+ run command "npm install" to install dependent packages
+ run command "npm run devstart" to run app

- APIs in this app:
Admin:
+ get "/admin" to go to default admin page
+ get "/admin/all-user" to get all user
+ get "/admin/all-task/:statusID" to get all task with certain statusID

Task:
+ post "/task" to create task
+ get "/task" to get 1 task
+ get "/task/all" to get all tasks
+ put "/task/update" to update title and description of task
+ put "/task/close" to close task
+ put "/task/reopen" to re-open task
+ put "/task/remove"  to remove task

User:
+ post "/user/create" to create new user
+ post "/user/login" to login

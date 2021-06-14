- To run this app:
+ go to root folder
+ run command "npm install" to install dependent packages
+ run command "npm run devstart" to run app

- APIs in this app:

Task:
+ /api/task - [post] create task
+ /api/task/:id - [get] single task
+ /api/task - [get] all tasks
+ /api/task/:status= -[get] tasks by status
+ /api/task/:id [put] update title and description of task
+ /api/task/close/:id - [delete] close task
+ /api/task/reopen/:id - [put] re-open task
+ /api/task/:id  - [delete] remove task

User:
+ /api/user - [post] create new user
+ /api/user - [get] all users


Authenicate:
+ /api/login - [post] login

- Referrence: https://stackoverflow.com/questions/30967822/when-do-i-use-path-params-vs-query-params-in-a-restful-api

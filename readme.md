- To run this app:
+ go to root folder
+ run command "npm install" to install dependent packages
+ run command "npm run devstart" to run app

- APIs in this app:

Task:
+ /api/tasks - [post] create task
+ /api/tasks/:id - [get] single task
+ /api/tasks - [get] all tasks
+ /api/tasks/?status= -[get] tasks by status
+ /api/tasks/:id [put] update title and description of task
+ /api/tasks/close/:id - [delete] close task
+ /api/tasks/reopen/:id - [put] re-open task
+ /api/tasks/:id  - [delete] remove task

User:
+ /api/user - [post] create new user
+ /api/user - [get] all users


Authenicate:
+ /api/login - [post] login

- Referrence: https://stackoverflow.com/questions/30967822/when-do-i-use-path-params-vs-query-params-in-a-restful-api

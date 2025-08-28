
# Nest JS - Micro Services - Example with TCP

After downloading the repository

`npm install` in all the three sub folders `user-service`, `email-service`, `task-service`.




## Micro services details

- user-service (acts as api gate way for email and task service)
- email-service (Normal micro service sends email notifications in background)
- task-service (Hybrid micro service acts a api gateway also)


## Run

Run all the micro services with npm by going to each subfolder


```bash
  npm run start
```
    
## API Calls

[create user](http://localhost:3000/create-user)

[users](http://localhost:3000/users)

[send email](http://localhost:3000/send-email) 

[create task](http://localhost:3000/create-task)

[tasks](http://localhost:3000/tasks)

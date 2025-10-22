# Nest JS - Micro Services - Concepts

## Communication

### Internal

- TCP — low-level transport used for service-to-service communication (user-service, email-service, task-service)
- gRPC — high-performance, protobuf-based RPC framework for inter-service calls (order-service, payment-service)

## Installation

After downloading the repository

`npm install` in all the three sub folders `user-service`, `email-service`, `task-service`, `order-service`, `payment-service`.

## Micro services details

- user-service (acts as api gate way for email and task service)
- email-service (Normal micro service sends email notifications in background)
- task-service (Hybrid micro service acts a api gateway also)
- order-service (Hybrid micro service acts a api gateway also)
- payment-service (Micro service handles only payment related)

## Run

Run all the micro services with npm by going to each subfolder

```bash
  npm run start
```

## API Calls

[create user](http://localhost:3000/create-user) (rest api endpoint)

[users](http://localhost:3000/users) (rest api endpoint)

[send email](http://localhost:3000/send-email) (uses tcp to communicate between user and email services)

[create task](http://localhost:3000/create-task) (uses tcp to communicate between user and task services)

[tasks](http://localhost:3000/tasks) (uses tcp to communicate between user and task services)

[create order](https://localhost:3004/orders/create) (uses gRpc to communicate between order and payment services)

## About
Volunteer sign up app for regional burning man events.

## Setup
0. Get an .env file from me
1. Run `npm i` in a terminal from /api and /web.
2. `npm start` in one terminal from /api
3. `npm run dev` in another terminal from /web

## To-do

### API

#### Features
* integration testing using supertest for routes/controllers 

#### Refactors
* new collection: shift-types. Contains name, description, and team. shifts ref this. 
* mongoose transactions to preserve atomicity with signups/unsignups
* controller -> use-case -> repo object destructuring to be consistent across the app. Look at AddLead use case as example.
* update use-cases to patch only text fields (name, description, etc)
* remove shift conflict from preventing signup. move function to individual route?
* non-leadership account signup borked due to leadershipKey issues, fixed via duct-tape. 

### Web

#### Features
* form validation
* sideways scrolling for shift table
* error messages
* add teams
* unsignup user from manage shift view

#### Refactors
* display shifts in tables by day

### API-Client

### Refactors
* convert to typescript
* return `.data` so that you don't have to do it for every call within web. Example: `users = client.users.getUsers()` requires to then to `users.data`. 
* after refactoring shift conflict in api, only give warning when conflict occurs.

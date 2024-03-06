## About
Volunteer sign up app for regional burning man events.

## Domain mapping
https://miro.com/app/board/uXjVNS-_818=/

## Wireframing
https://www.figma.com/file/QozoTFHFy9ZFMm0SaYDtH1/Volunteer?type=design&node-id=0-1&mode=design&t=y8NArxcAoQL9WEcW-0

## Setup
0. Get an .env file from me
1. Run `npm i` in a terminal from /api and /web.
2. `npm start` in one terminal from /api
3. `npm run dev` in another terminal from /web

## To-do

### API

#### Features 
* some kind of ABAC
* clients to allow for use of cross-module use-cases

#### Refactors
* mongoose transactions to preserve atomicity with signups/unsignups
* controller -> use-case -> repo object destructuring to be consistent across the app. Look at AddLead use case as example.
* update use-cases to patch only text fields (name, description, etc)
* remove shift conflict from preventing signup. move function to individual route?
* non-leadership account signup. borked due to leadershipKey issues, fixed via duct-tape with a recent commit.

### Web

#### Features
* form validation
* sideways scrolling for shift table

#### Refactors
* create a shift-table component that replicates whats on TeamView so that it can be used everywhere else. should take just one prop, teamId. 

### API-Client

### Refactors
* convert to typescript
* return `.data` so that you don't have to do it for every call within web. Example: `users = client.users.getUsers()` requires to then to `users.data`. 
* after refactoring shift conflict in api, only give warning when conflict occurs.

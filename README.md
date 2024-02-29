## About
Volunteer sign up app for regional burning man events.

## Domain mapping
https://miro.com/app/board/uXjVNS-_818=/

## Wireframing
https://www.figma.com/file/QozoTFHFy9ZFMm0SaYDtH1/Volunteer?type=design&node-id=0-1&mode=design&t=y8NArxcAoQL9WEcW-0

## Setup
1. Run `npm i` in a terminal from /api, /api-client, and /web.
2. `npm start` in one terminal from /api
3. `npm run dev` in another terminal from /web

## To-do

### API

#### Features 
* some kind of ABAC
* clients to allow for use of cross-module use-cases
* leadership signup via unique code (like pivot bookstore codes)

#### Refactors
* user schema to remove teams
* team schema to remove members
* mongoose transactions to preserve atomicity with signups/unsignups
* controller -> use-case -> repo object destructuring to be consistent across the app. Look at AddLead use case as example.
* update use-cases to patch only text fields (name, description, etc)
* remove shift conflict from preventing signup. move function to individual route?

### Web

#### Features
* form validation

#### Refactors

### API-Client

### Refactors
* return `.data` so that you don't have to do it for every call within web. Example: `users = client.users.getUsers()` requires to then to `users.data`. 
* after refactoring shift conflict in api, only give warning when conflict occurrs.
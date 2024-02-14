## About
Volunteer sign up app for regional burning man events.

## Domain mapping
https://miro.com/app/board/uXjVNS-_818=/

## Setup
1. npm i
2. npm start 
2. use post man to send calls to the api

## To-do
* refactor user schema to remove teams
* refactor team schema to remove members
* mongoose transactions to preserve atomicity with signups/unsignups
* refactor controller -> use-case -> repo object destructuring to be consistent across the app. Look at AddLead use case as example.
* some kind of ABAC
* refactor update use-cases to patch only text fields (name, description, etc)
* clients to allow for use of cross-module use-cases
* GetTeams users use case
monkbone
========

Simple CRUD API for MongoDB.

Implements mongoDB server for Backbone.js

It uses LearnBoost's [Monk](https://github.com/LearnBoost/monk) - a tiny layer for MongoDB usage within Node.JS built on top of [mongoskin](https://github.com/kissjs/node-mongoskin).

Also implements [CORS headers](https://developer.mozilla.org/en/http_access_control) to allow cross-origin requests.

##Usage

1. Clone the repository

2. Install node.js

3. Install the dependencies with `npm install`

4. Configure your database connection and avaliable connection in `dbconfig.js`

5. Start the server with `node monkbone.js`

##API
Create new document within "people" collection:  
`-vX PUT http://localhost:5000/people -H "Content-Type: application/json" -d '{"name": "Daniel", "age":"22"}'`

Get 3 documents from "people" collection:  
`curl -v http://localhost:5000/people?limit=3`

Modify exists document with [id] from "people" collection:  
`curl -vX PUT http://localhost:5000/people/[id] -H "Content-Type: application/json" -d '{"name": "Matt", "age":"37"}'`

Get document with [id] from "people" collection:  
`curl -v http://localhost:5000/people/[id]`

Delete document with [id] from "people" collection: 
`curl -vX DELETE http://localhost:5000/people/[id]`

Get all documents from "people" collection: 
`curl -v http://localhost:5000/people`

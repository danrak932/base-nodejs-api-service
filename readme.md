# Base NodeJs Express MongoDB API Service Template

Basic template for building api with mvc structure.
It will need a config.env file, at root, where the followings keys are declared

NODE_ENV=development<or production>
PORT=3000
API_VERSION=<version for api, ie. v1>

DATABASE=<database_connection_string>
DATABASE_PASSWORD=<database_password>

To run app use:
node run start - normal
node run dev - for nodemon
node run start:prod - setting NODE_ENV as production

Also the template is using prettier and eslint on vscode, install extensions for better use

For testing, run project as npm run dev. Postman, CURL can be used for testing CRUD API:

Add:
POST {{URL}}/api/v1/greetings
JSON BODY:
{ "author" : "Dan",
"message" :"Hello!"
}

Update
PATCH {{URL}}/api/v1/greetings/:greetingId
{ "author" : "Dan",
"message" :"Hello v2!"
}

Get all
{{URL}}/api/v1/greetings

Get One
GET {{URL}}/api/v1/greetings/:greetingId

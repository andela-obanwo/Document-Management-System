[![Build Status](https://travis-ci.org/andela-obanwo/Document-Management-System.svg?branch=develop)](https://travis-ci.org/andela-obanwo/Document-Management-System)
[![Coverage Status](https://coveralls.io/repos/github/andela-obanwo/Document-Management-System/badge.svg?branch=feedback-implementation)](https://coveralls.io/github/andela-obanwo/Document-Management-System?branch=feedback-implementation)
[![Code Climate](https://codeclimate.com/github/andela-obanwo/Document-Management-System/badges/gpa.svg)](https://codeclimate.com/github/andela-obanwo/Document-Management-System)

Document Management System provides a restful API for users to create and manage documents giving different privileges based on user roles and managing authentication using JWT.

## Technologies Used
- JavaScript (ES6)
- Node.js
- Express
- Postgresql
- Sequelize ORM.

## Local Development
### Prerequisites includes
- [Postgresql](https://www.postgresql.org/) and
-  [Node.js](http://nodejs.org/) >= v6.8.0.

### Procedure
1. Clone this repository from a terminal `git clone https://github.com/andela-obanwo/Document-Management-System.git`.
1. Move into the project directory `cd Document-Management-System`
1. Install project dependencies `npm install`
1. Create a Postgresql database and run migrations `npm run db:migrate`.
1. Start the express server `npm start`.
1. Run tests `npm test`.
1. Run `npm run setup` to populate database with initial data.

### Postman Collection
Postman Collection is available via [Postman Collection](https://www.getpostman.com/collections/5aec974d505573a93752)

## Demo
A demo deployment is available at [Demo](https://document-manager-api.herokuapp.com)

Set a `SECRET_TOKEN` environment variable, and create a Postgresql add-on.

---

# API Documentation
The API has routes, each dedicated to a single task that uses HTTP response codes to indicate API status and errors.

## Authentication
Users are assigned a token upon signup and signin. This token is needed for subsequent HTTP requests to the API for authentication and can be attached as values to the header's `x-access-token` or `authorization` key. API requests made without authentication will fail.

## Below are the API endpoints and their functions
EndPoint                      |   Functionality
------------------------------|------------------------
POST /users/login         |   Logs a user in.
POST /users/logout        |   Logs a user out.
POST /users/              |   Creates a new user.
GET /users/               |   Find matching instances of user.
GET /users/<id>           |   Find user.
PUT /users/<id>           |   Update user attributes.
DELETE /users/<id>        |   Delete user.
POST /documents/          |   Creates a new document instance.
GET /documents/           |   Find matching instances of document.
GET /documents/<id>       |   Find document.
PUT /documents/<id>       |   Update document attributes.
DELETE /documents/<id>    |   Delete document.
GET /users/:id/documents |   Find all documents belonging to the user.
GET /search/documents?query="" | Get all documents with title containing the search query
GET /accesstypes/         |   Find Access Types.
GET /documenttypes/       |   Find Document Types.
GET /departments/         |   Find Departments.
GET /roles/               |   Find Roles.
POST /accesstypes/         |   Create Access Type.
POST /documenttypes/       |   Create Document Type.
POST /departments/         |   Create Department.
POST /roles/               |   Create Role.
POST /createadmin           |   Create Admin User
PUT /accesstypes/:id         |   Edit Access Type.
PUT /documenttypes/:id       |   Edit Document Type.
PUT /departments/:id         |   Edit Department.
PUT /roles/:id               |   Edit Role.
DELETE /accesstypes/:id         |   Delete Access Type.
DELETE /documenttypes/:id       |   Delete Document Type.
DELETE /departments/:id         |   Delete Department.
DELETE /roles/:id               |   Delete Role.

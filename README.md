[![Build Status](https://travis-ci.org/andela-obanwo/Document-Management-System.svg?branch=develop)](https://travis-ci.org/andela-obanwo/Document-Management-System)
[![Coverage Status](https://coveralls.io/repos/github/andela-obanwo/Document-Management-System/badge.svg?branch=feedback-implementation)](https://coveralls.io/github/andela-obanwo/Document-Management-System?branch=feedback-implementation)
[![Code Climate](https://codeclimate.com/github/andela-obanwo/Document-Management-System/badges/gpa.svg)](https://codeclimate.com/github/andela-obanwo/Document-Management-System)
[![Issue Count](https://codeclimate.com/github/andela-obanwo/Document-Management-System/badges/issue_count.svg)](https://codeclimate.com/github/andela-obanwo/Document-Management-System)

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
Postman Collection is available here [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/5aec974d505573a93752)

## Demo
A demo deployment is available [here](https://document-manager-api.herokuapp.com)

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
GET /users/:id           |   Find user.
PUT /users/:id           |   Update user attributes.
DELETE /users/:id        |   Delete user.
POST /documents/          |   Creates a new document instance.
GET /documents/           |   Find matching instances of document.
GET /documents/:id       |   Find document.
PUT /documents/:id       |   Update document attributes.
DELETE /documents/:id    |   Delete document.
GET /users/:id/documents |   Find all documents belonging to the user.
GET /search/documents?query=searchQuery | Get all documents with title containing the search query
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

## Example Requests and Expected Responses
- [Roles](#roles)
  - [Get roles](#get-roles)
  - [Create role](#create-role)
  - [Edit role](#edit-role)
  - [Delete role](#delete-role)

- [Departments](#departments)
  - [Get departments](#get-departments)
  - [Create department](#create-department)
  - [Edit department](#edit-department)
  - [Delete department](#delete-department)

- [Access Types](#accesstypes)
  - [Get access types](#get-access-types)
  - [Create access type](#create-access-type)
  - [Edit access type](#edit-access-type)
  - [Delete access type](#delete-access-type)

- [Document Types](#document-types)
  - [Get document types](#get-document-types)
  - [Create document type](#create-document-type)
  - [Edit document type](#edit-document-type)
  - [Delete document type](#delete-document-type)

- [Users](#users)
  - [Create user](#create-user)
  - [Get all users](#get-users)
  - [Get single user](#get-single-user)
  - [Edit user](#edit-user)
  - [Delete user](#delete-user)

- [Documents](#documents)
  - [Get all documents](#get-all-documents)
  - [Create document](#create-document)
  - [Get single document](#get-single-document)
  - [Edit document](#edit-document)
  - [Delete document](#delete-document)
  - [Search documents](#search-documents)


## Roles
Endpoint for Roles API.
- [Get roles](#get-roles)
- [Create role](#create-role)
- [Edit role](#edit-role)
- [Delete role](#delete-role)

### Get Roles

#### Request
- Endpoint: GET: `/roles`
- Requires: Authentication and Super Admin Access Level

#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
[
  {
    "id": 1,
    "name": "superAdmin",
    "createdAt": "2017-03-03T13:28:22.003Z",
    "updatedAt": "2017-03-03T13:28:22.003Z"
  },
  {
    "id": 2,
    "name": "departmentAdmin",
    "createdAt": "2017-03-03T13:28:22.003Z",
    "updatedAt": "2017-03-03T13:28:22.003Z"
  },
  {
    "id": 3,
    "name": "user",
    "createdAt": "2017-03-03T13:28:22.003Z",
    "updatedAt": "2017-03-03T13:28:22.003Z"
  }
]
```
### Create Role

#### Request
- Endpoint: POST: `/roles`
- Requires: Authentication and Super Admin Access Level
- Body `(application/json)`
```json
{ "name": "supervisor" }
```

#### Response
- Status: `201: Created`
- Body `(application/json)`
```json
{
  "message": "Role supervisor successfully created",
  "role": {
    "id": 5,
    "name": "supervisor",
    "updatedAt": "2017-03-07T15:57:29.019Z",
    "createdAt": "2017-03-07T15:57:29.019Z"
  }
}
```
### Edit Role

#### Request
- Endpoint: PUT: `/roles/:id`
- Requires: Authentication and Super Admin Access Level
- Body `(application/json)`
```json
{ "name": "supervisor-assistant" }
```

#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
{
  "message": "Update Successful",
  "updatedRole": {
    "id": 5,
    "name": "supervisor-assistant",
    "createdAt": "2017-03-07T15:57:29.019Z",
    "updatedAt": "2017-03-07T16:06:02.811Z"
  }
}
```
### Delete Role

#### Request
- Endpoint: DELETE: `/roles/:id`
- Requires: Authentication and Super Admin Access Level

#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
{
  "message": "Role deleted successfully."
}
```
## Departments
Endpoint for Departments.
- [Get departments](#get-departments)
- [Create department](#create-department)
- [Edit department](#edit-department)
- [Delete department](#delete-department)

### Get Departments

#### Request
- Endpoint: GET: `/departments`
- Requires: Authentication and Super Admin Access Level

#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
[
  {
    "id": 1,
    "name": "technology",
    "createdAt": "2017-03-03T13:28:22.075Z",
    "updatedAt": "2017-03-03T13:28:22.075Z"
  },
  {
    "id": 2,
    "name": "sales",
    "createdAt": "2017-03-03T13:28:22.075Z",
    "updatedAt": "2017-03-03T13:28:22.075Z"
  },
  {
    "id": 3,
    "name": "marketing",
    "createdAt": "2017-03-03T13:28:22.075Z",
    "updatedAt": "2017-03-03T13:28:22.075Z"
  }
]
```
### Create Department

#### Request
- Endpoint: POST: `/departments`
- Requires: Authentication and Super Admin Access Level
- Body `(application/json)`
```json
{ "name": "P&C" }
```

#### Response
- Status: `201: Created`
- Body `(application/json)`
```json
{
  "message": "Department P&C successfully created",
  "department": {
    "id": 5,
    "name": "P&C",
    "updatedAt": "2017-03-07T16:22:43.076Z",
    "createdAt": "2017-03-07T16:22:43.076Z"
  }
}
```
### Edit Department

#### Request
- Endpoint: PUT: `/departments/:id`
- Requires: Authentication and Super Admin Access Level
- Body `(application/json)`
```json
{ "name": "Learning" }
```

#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
{
  "message": "Update Successful",
  "updatedDepartment": {
    "id": 5,
    "name": "Learning",
    "createdAt": "2017-03-07T16:22:43.076Z",
    "updatedAt": "2017-03-07T16:24:42.748Z"
  }
}
```
### Delete Department

#### Request
- Endpoint: DELETE: `/departments/:id`
- Requires: Authentication and Super Admin Access Level

#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
{
  "message": "Department deleted successfully."
}
```
## Access Types
Endpoint for Access Types.
- [Get access types](#get-access-types)
- [Create access type](#create-access-type)
- [Edit access type](#edit-access-type)
- [Delete access type](#delete-access-type)

### Get Access Types

#### Request
- Endpoint: GET: `/accesstypes`
- Requires: Authentication and Super Admin Access Level

#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
[
  {
    "id": 1,
    "name": "public",
    "createdAt": "2017-03-03T13:28:22.075Z",
    "updatedAt": "2017-03-03T13:28:22.075Z"
  },
  {
    "id": 2,
    "name": "private",
    "createdAt": "2017-03-03T13:28:22.075Z",
    "updatedAt": "2017-03-03T13:28:22.075Z"
  },
  {
    "id": 3,
    "name": "role",
    "createdAt": "2017-03-03T13:28:22.075Z",
    "updatedAt": "2017-03-03T13:28:22.075Z"
  }
]
```
### Create Access Type

#### Request
- Endpoint: POST: `/accesstypes`
- Requires: Authentication and Super Admin Access Level
- Body `(application/json)`
```json
{ "name": "ttl" }
```

#### Response
- Status: `201: Created`
- Body `(application/json)`
```json
{
  "message": "Access Type ledger successfully created",
  "accesstype": {
    "id": 5,
    "name": "ttl",
    "updatedAt": "2017-03-07T16:22:43.076Z",
    "createdAt": "2017-03-07T16:22:43.076Z"
  }
}
```
### Edit Access Type

#### Request
- Endpoint: PUT: `/accesstypes/:id`
- Requires: Authentication and Super Admin Access Level
- Body `(application/json)`
```json
{ "name": "fellow" }
```

#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
{
  "message": "Update Successful",
  "updatedAccessType": {
    "id": 5,
    "name": "fellow",
    "createdAt": "2017-03-07T16:22:43.076Z",
    "updatedAt": "2017-03-07T16:24:42.748Z"
  }
}
```
### Delete Access Type

#### Request
- Endpoint: DELETE: `/documenttypes/:id`
- Requires: Authentication and Super Admin Access Level

#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
{
  "message": "Access Type deleted successfully."
}
```

## Document Types
Endpoint for Document Types.
- [Get document types](#get-document-types)
- [Create document type](#create-document-type)
- [Edit document type](#edit-document-type)
- [Delete document type](#delete-document-type)

### Get Document Types

#### Request
- Endpoint: GET: `/documenttypes`
- Requires: Authentication and Super Admin Access Level

#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
[
  {
    "id": 1,
    "name": "receipt",
    "createdAt": "2017-03-03T13:28:22.075Z",
    "updatedAt": "2017-03-03T13:28:22.075Z"
  },
  {
    "id": 2,
    "name": "invoice",
    "createdAt": "2017-03-03T13:28:22.075Z",
    "updatedAt": "2017-03-03T13:28:22.075Z"
  },
  {
    "id": 3,
    "name": "report",
    "createdAt": "2017-03-03T13:28:22.075Z",
    "updatedAt": "2017-03-03T13:28:22.075Z"
  }
]
```
### Create Document Type

#### Request
- Endpoint: POST: `/documenttypes`
- Requires: Authentication and Super Admin Access Level
- Body `(application/json)`
```json
{ "name": "ledger" }
```

#### Response
- Status: `201: Created`
- Body `(application/json)`
```json
{
  "message": "Document Type ledger successfully created",
  "documenttype": {
    "id": 5,
    "name": "ledger",
    "updatedAt": "2017-03-07T16:22:43.076Z",
    "createdAt": "2017-03-07T16:22:43.076Z"
  }
}
```
### Edit Document Type

#### Request
- Endpoint: PUT: `/documenttypes/:id`
- Requires: Authentication and Super Admin Access Level
- Body `(application/json)`
```json
{ "name": "balance sheet" }
```

#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
{
  "message": "Update Successful",
  "updatedDocumentType": {
    "id": 5,
    "name": "balance sheet",
    "createdAt": "2017-03-07T16:22:43.076Z",
    "updatedAt": "2017-03-07T16:24:42.748Z"
  }
}
```
### Delete Document Type

#### Request
- Endpoint: DELETE: `/documenttypes/:id`
- Requires: Authentication and Super Admin Access Level

#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
{
  "message": "Document Type deleted successfully."
}
```

## Users
Endpoint for Users API.
  - [Create user](#create-user)
  - [Get all users](#get-users)
  - [Get single user](#get-single-user)
  - [Edit user](#edit-user)
  - [Delete user](#delete-user)

### Create User

#### Request
- Endpoint: POST: `/users`
- Body `(application/json)`
```json
{
  "username": "uniqueuser",
  "firstname": "Unique User",
  "lastname": "Unique User",
  "email": "uniqueuser@unique.com",
  "departmentId": 2,
  "password": "password"
}
```

#### Response
- Status: `201: Created`
- Body `(application/json)`
```json
{
  "data": {
    "id": 1,
    "username": "superadmin",
    "firstname": "Darius",
    "lastname": "Jast",
    "email": "yeehoa@yahoo.go.uk",
    "roleId": 1,
    "departmentId": 1,
    "createdAt": "2017-03-06T12:02:25.219Z",
    "updatedAt": "2017-03-06T12:02:25.228Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCsdfdfdI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiZmlyc3RuYW1lIjoiRGFyaXVzIiwibGFzdG5hbWUiOiJKYXN0IiwiZW1haWwiOiJvcmViYW40dUB5YWhvby5jby51ayIsImRlcGFydG1lbnRJZCI6MSwiaWF0IjoxNDg4OTA4ODczLCJleHAiOjE0ODg5MTYwNzN9.ou0fzsufXyPNojT1shLa4N2zEuV9rvtPKcrs_amlYrQ",
  "expiresIn": "120m"
}
```

### Get Users

#### Request
- Endpoint: GET: `/users`
- Requires: Authentication

#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
{
  "data": [
    {
      "id": 1,
      "username": "super",
      "firstname": "Sydnie",
      "lastname": "Mitchell",
      "email": "awesomestuff@yahoo.co.uk",
      "roleId": 1,
      "departmentId": 1,
      "createdAt": "2017-03-03T13:28:22.095Z",
      "updatedAt": "2017-03-03T13:28:22.101Z"
    },
    {
      "id": 2,
      "username": "cook",
      "firstname": "Louisa",
      "lastname": "Murazik",
      "email": "cook@admin.com",
      "roleId": 2,
      "departmentId": 2,
      "createdAt": "2017-03-03T13:28:22.095Z",
      "updatedAt": "2017-03-03T13:28:22.102Z"
    }
  ],
  "message": "All user data returned"
}
```
### Get Single User

#### Request
- Endpoint: GET: `/users/:id`
- Requires: Authentication, Admin and Owner Access

#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
{
  "id": 1,
  "username": "super",
  "firstname": "Sydnie",
  "lastname": "Mitchell",
  "email": "awesomestuff@yahoo.co.uk",
  "roleId": 1,
  "departmentId": 1,
  "createdAt": "2017-03-03T13:28:22.095Z",
  "updatedAt": "2017-03-03T13:28:22.101Z"
}
```

### Edit User

#### Request
- Endpoint: PUT: `/users/:id`
- Requires: Authentication and Super Admin/Owner Access Level
- Body `(application/json)`
```json
{
  "username": "editeduser",
  "firstname": "Edited User",
  "lastname": "Edited User",
  "email": "editeduser@unique.com",
  "departmentId": 3,
  "password": "password"
}
```

#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
{
  "data": {
    "id": 9,
    "username": "edited",
    "firstname": "editeduser",
    "lastname": "user",
    "email": "editeduser@admin.com",
    "roleId": 3,
    "departmentId": "2",
    "createdAt": "2017-03-07T16:56:09.880Z",
    "updatedAt": "2017-03-07T17:30:07.385Z"
  },
  "message": "User updated successfully"
}
```
### Delete User

#### Request
- Endpoint: DELETE: `/user/:id`
- Requires: Authentication and Super Admin Access Level

#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
{
  "message": "User deleted successfully."
}
```

## Documents
Endpoint for Documents.
  - [Get all documents](#get-all-documents)
  - [Create document](#create-document)
  - [Get single document](#get-single-document)
  - [Edit document](#edit-document)
  - [Delete document](#delete-document)

### Create Document

#### Request
- Endpoint: POST: `/documents`
- Body `(application/json)`
```json
{
  "title": "readmi",
  "content": "this is a demo dare to ask for the impossible.",
  "userId": 2,
  "accessTypeId": 2,
  "docTypeId": 3
}
```

#### Response
- Status: `201: Created`
- Body `(application/json)`
```json
{
  "data": {
    "id": 8,
    "title": "readmi",
    "content": "this is a demo dare to ask for the impossible.",
    "userId": 1,
    "accessTypeId": 2,
    "docTypeId": 3,
    "updatedAt": "2017-03-07T18:20:20.929Z",
    "createdAt": "2017-03-07T18:20:20.929Z"
  },
  "message": "Document Created Successfully"
}
```

### Get Documents

#### Request
- Endpoint: GET: `/documents`
- Requires: Authentication

#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
{
  "data": [
    {
      "id": 1,
      "title": "Integrated regional info-mediaries",
      "content": "Voluptas et nostrum assumenda ea velit facere molestiae reprehenderit atque. Optio laboriosam harum. Aut ut nemo tenetur. Architecto praesentium aut at. Corrupti totam quo.",
      "userId": 3,
      "accessTypeId": 2,
      "docTypeId": 2,
      "createdAt": "2017-03-06T12:02:27.902Z",
      "updatedAt": "2017-03-06T12:02:27.902Z"
    },
    {
      "id": 2,
      "title": "we worship forever",
      "content": "Reiciendis voluptate error voluptatem possimus dolores provident neque aut nemo. Ab in quia ut quos ipsum veritatis consequatur alias. Quae aut facilis.",
      "userId": 4,
      "accessTypeId": 2,
      "docTypeId": 3,
      "createdAt": "2017-03-06T12:02:27.902Z",
      "updatedAt": "2017-03-06T12:02:27.902Z"
    }
  ],
  "message": "All documents returned Successfully"
}
```
### Get Single Document

#### Request
- Endpoint: GET: `/documents/:id`
- Requires: Authentication, Admin and Owner Access

#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
{
  "data": {
    "id": 6,
    "title": "Enhanced client-driven focus group",
    "content": "Placeat aspernatur dolores corporis. Ipsum similique maiores quisquam ratione vel.",
    "userId": 3,
    "accessTypeId": 1,
    "docTypeId": 2,
    "createdAt": "2017-03-06T12:02:27.902Z",
    "updatedAt": "2017-03-06T12:02:27.902Z"
  },
  "message": "Document fetched successfully"
}
```

### Edit Document

#### Request
- Endpoint: PUT: `/documents/:id`
- Requires: Authentication and Super Admin/Owner Access Level
- Body `(application/json)`
```json
{
  "title": "readmi",
  "content": "this is a demo dareasdfasdfsfaf to ask for the impossible.",
  "userId": 2,
  "accessTypeId": 2,
  "docTypeId": 3
}
```

#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
{
  "data": {
    "id": 6,
    "title": "readmi",
    "content": "this is a demo dareasdfasdfsfaf to ask for the impossible.",
    "userId": "3",
    "accessTypeId": "2",
    "docTypeId": "3",
    "createdAt": "2017-03-06T12:02:27.902Z",
    "updatedAt": "2017-03-07T18:40:19.108Z"
  },
  "message": "Document Updated Successfully"
}
```
### Delete Document

#### Request
- Endpoint: DELETE: `/documents/:id`
- Requires: Authentication and Super Admin Access Level

#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
{
  "message": "Document deleted successfully."
}
```

### Search Documents

#### Request
- Endpoint: GET: `/search/documents?query=searchQuery`
- Requires: Authentication

#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
[{
      "id": 1,
      "title": "Integrated regional info-mediaries",
      "content": "Voluptas et nostrum assumenda ea velit facere molestiae reprehenderit atque. Optio laboriosam harum. Aut ut nemo tenetur. Architecto praesentium aut at. Corrupti totam quo.",
      "userId": 3,
      "accessTypeId": 2,
      "docTypeId": 2,
      "createdAt": "2017-03-06T12:02:27.902Z",
      "updatedAt": "2017-03-06T12:02:27.902Z"
    },
    {
      "id": 2,
      "title": "we worship forever",
      "content": "Reiciendis voluptate error voluptatem possimus dolores provident neque aut nemo. Ab in quia ut quos ipsum veritatis consequatur alias. Quae aut facilis.",
      "userId": 4,
      "accessTypeId": 2,
      "docTypeId": 3,
      "createdAt": "2017-03-06T12:02:27.902Z",
      "updatedAt": "2017-03-06T12:02:27.902Z"
    }]
```
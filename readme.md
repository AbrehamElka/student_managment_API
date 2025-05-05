# Student Management REST API

## Description

This is a REST API for managing student data. It allows you to create, update, delete, retrieve, and search for student records.

## Technologies Used

*   Node.js
*   Express
*   PostgreSQL
*   express-validator
*   pg

## Setup

1.  Clone the repository:

    ```bash
    git clone <repository-url>
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

3.  Create a `.env` file in the root directory. Add the following environment variables:

    ```
    PORT=<port_number>
    PGUSER=<database_user>
    PGHOST=<database_host>
    PGDATABASE=<database_name>
    PGPASSWORD=<database_password>
    PGPORT=<database_port>
    ```

    Replace the placeholders with your actual database credentials and desired port number.

4.  Run the application:

    ```bash
    npm start
    ```

## Endpoints

*   `POST /students`: Creates a new student.
    *   Requires: `first_name`, `last_name`, `age`, `gpa` in the request body.
    *   Optional: `is_graduated` in the request body.
*   `PUT /students/:id`: Updates an existing student.
    *   Requires: `id` in the URL parameters. `first_name`, `last_name`, `age`, `gpa` and `is_graduated` in the request body.
*   `DELETE /students/:id`: Deletes a student.
    *   Requires: `id` in the URL parameters.
*   `GET /students/search`: Searches for students.
    *   Optional query parameters: `name`, `age`, `gpa`.
*   `GET /students/:id`: Retrieves a student by ID.
    *   Requires: `id` in the URL parameters.

## Request Body Examples

### Create Student

```json
{
    "first_name": "John",
    "last_name": "Doe",
    "age": 20,
    "gpa": 3.5,
    "is_graduated": false
}
```

### Update Student

```json
{
    "first_name": "Jane",
    "last_name": "Doe",
    "age": 22,
    "gpa": 3.9,
    "is_graduated": true
}
```
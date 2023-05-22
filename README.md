
# Transaction Message Store API with Persistence

This project demonstrates a simple Express API with persistence functionality. It contains routes for message creation, retrieval by ID, and cleanup of messages.

## Project Structure

The main file of this API is an Express Router which exports several routes related to handling messages. The `Persistence` module is used for interacting with the database.

## API Endpoints

The following routes are defined:

### PUT /api/message

Creates a new message in the system.

**Request Body:**

- `id` (string): The unique identifier for the message.
- `message` (string): The content of the message.

**Response:**

A JSON object containing the ID of the newly created message.

**Errors:**

- `400`: If the `id` or `message` is not provided.
- `500`: If any internal server error occurs.

### GET /api/message/:id

Retrieves a message by its ID.

**Parameters:**

- `id` (string): The unique identifier for the message.

**Response:**

The message object with the specified ID.

**Errors:**

- `500`: If any internal server error occurs.

### POST /api/message/cleanup

Cleans up the messages in the system.

**Response:**

A JSON object indicating the number of rows cleaned up.

**Errors:**

- `500`: If any internal server error occurs.

## Installation and Running the Project

Clone the project, navigate into the directory and install dependencies:

```
git clone <repository-url>
cd <repository-directory>
npm install
```

Run the server:

```
npm start
```

The server will start running at `http://localhost:3069`.

## Testing

This API is not configured with any testing framework yet. If you want to test the API endpoints, you can use tools like Postman or curl.

## Error Handling

Errors are logged to the console for debugging.

## Future Work

- Include a testing framework for robust testing.
- Expand the error handling to include more specific error messages and status codes.
- Add more endpoints as necessary for the application's needs. 
- Add authentication/authorization for the api endpoints

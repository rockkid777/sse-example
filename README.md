# SSE Example

This is a simple naive implementation of a message board standing for an
example light-weight server sent events example.

## Modules

### Nats broker

A simple message broker. Could be replaced with Kafka, RabbitMQ, etc.
Reason of choice: lightweight.

### API

A simple ExpressJS service hosting a POST /msgRequest endpoint.

Expects body with the following scheme:
  - author: String
  - text: String

Publishes message on 'test' topic:
  - type (enum: "message")
  - content: Object
    + text: String
    + author: String

Response on success: 204 (created) Since this endpoint ensures the
forwarding of the message, but not the processing of it.

### Notification Center

A simple ExpressJS service hosting a GET /events endpoint.

Response:
  - status: 200
  - content-type: "text/event-stream"

Consumes messages from 'test' topic, pushes messages to subscribers.


## Running the application

This command assumes up and running docker (desktop) setup.

``` bash
docker-compose up -d --build
```

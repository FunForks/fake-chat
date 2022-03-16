# Fake Chat

A *real* chat app requires:
* A backend connected to a database
* A Web Socket to push data from the backend to connected clients

This app has neither of these things.

The database is stored on the client in LocalStorage. This means that it is accessible only by one browser, on one isolated computer. You can create two profiles and chat with yourself.

With no backend or websockets to push new messages to their recipient, the "client" part of this app simply requests an update on messages on a regular basis.

## Construction

The app is divided into four parts:

1. A "client" that displays registration, log in and chat pages.
2. A "connection" that simulates the asynchronous nature of an Internet connection
3. A fake "backend" that handles calls to interact with the "database"
4. A fake "database" that interacts with local storage to store and retrieve persistent data

## What can you learn from this?

It's perfectly possible to set up a client, a frontend server, a backend server and a database all on the same development computer, and to make real asynchronous calls to the backend. So why fake it all in the browser?

1. You can practice the frontend skills you already have to create all the client-side features that you would need for a real chat app.
2. You can develop generic scripts for working with local storage.
3. You can practise breaking a project into independent 
"black box" modules that can be replaced with other code that uses the same API.
4. You can practise using promises in an async environment
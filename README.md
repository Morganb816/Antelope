# Antelope Networking

![Jackalope](https://banner2.cleanpng.com/20180418/uve/kisspng-a-pronghorn-antelope-a-pronghorn-antelope-drawing-elk-vector-5ad7b2864d63e4.504981951524085382317.jpg)

---

## [Example](https://antelope-networking-example.herokuapp.com/)

## About
### What it is:
Antelope Networking is a library used to help develop JavaScript multiplayer games with a determanistic client server architecture.
Antelope should be considered the layer in between, just barely reaching into both your client and your server.

### What it isn't:
Antelope will not help with things like user input or server architecture.

### What it Might Be:
In the future I plan on extracting Socket.IO in favor of writing our own WebSocket solution. Socket.IO is heavy and unnecesary for a solution like this, but to get MVP working the decision has been made to just endure. In the future, writing a Unity Client port would be a great opportunity. As of now I think keeping it JS on the client side is a win because of the ability to share code between the server and client in terms of movement methods etc.

---
## Motivation
Antelope Networking is mostly a pet project for me to learn more about networking architecture. At the moment I believe that there is a considerable lack of networking implementations that are easy to use and follow client/server architecture.

---
## Features
* Client Side Reconciliation
* Server Side Value Validation
* Flexable: Antelope just track values. what you do with them is up to you.

---
## Examples
#### Client
```js
const xPosition = new ClientNetowrkValue(10, 'x-posiiton', socket);

xPosition.set(5);

xPosition.get();
```

#### Server
```js

function validate(newPos, input) {
    if (movementIsPossible(oldPos, newPos, input)) {
        return newPos;
    } else {
        getNewPosition(oldPos, input);
    }
}

const xPosition = new ServerNetworkValue('x-position', validate, socket);
```
---
## Tests
Antelope utilizes Mocha and Chai for testing. To run the tests you can `npm run test`.

---
## License
MIT License
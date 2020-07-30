# Antelope Networking

![Jackalope](https://banner2.cleanpng.com/20180418/uve/kisspng-a-pronghorn-antelope-a-pronghorn-antelope-drawing-elk-vector-5ad7b2864d63e4.504981951524085382317.jpg)

---

## [Example](https://antelope-networking-example.herokuapp.com/)

## About
### What it is:
Antelope Networking is a library used to help develop JavaScript multiplayer games with a determanistic client server architecture.
Antelope should be considered the layer inbetween and reaching just barely into both your client and server.

### What it isn't:
Antelope will not help with things like user input, server 

### What it Might Be:
In The future I plan on extracting out Socket.IO in favor of just writing our own WebSocket solution. Socket.IO is heavy and unnecesary for a solution like this but to get MVP working the decision has been made to just suck it up. In the future writing a Unity Client port would be amazing. As of now i think keeping it JS on client side is a win though because of the ability to share code between the server and client in terms of movement methods etc.

---
## Motivation
Antelope Networking is mostly a pet project for me to learn more about architecting. I do belive that there are a considerable lack of networking implementations that are easy to use and also are client/server.

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
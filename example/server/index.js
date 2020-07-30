const express = require('express');
const io = require('socket.io');
const path = require('path');
const app = express();
const { ServerNetworkValue } = require('../../src/ServerNetworkValue');

/*
===================================
SETUP SETUP SETUP SETUP SETUP SETUP
===================================
*/

app.use(express.static(path.resolve(__dirname, 'public')));
app.use('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});
const server = app.listen(8080, function() {
    console.log('Example Server Running...');
});
const wss = io(server);

/*
===============================
ANTELOPE NETWORKING SERVER PART
===============================
*/

wss.on('connection', function(ws) {
    /*
     When a client connects to our server we setup a new `ServerNetworkValue` for them.
     The first parameter is a unique message identifier (doesnt have to be client specific).
     The second parameter is a function that should return the corrected or original value (More detail below).
     and the third parameter is the reference to our clients socket.
    */
    const exampleValue = new ServerNetworkValue('example-value', checkClientValue, ws);
});
/*
 Here is our method that is used to check the value we got from the client.
 If you have any movement logic that needs to be checked against to prevent
 cheating this is where it should happen. The second parameter is other data
 that the client deemed would be appropriate for you to know. For instance if
 this variable is referencing a x position of a player, the client should send
 you the new position it wants to be at but also what inputs it used to get
 there.
*/
function checkClientValue(value, other) {
    return value;
}

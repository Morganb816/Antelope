
import { ClientNetworkValue } from 'antelopejs';
import io from 'socket.io-client';

const socket = io(window.location.origin);

/*
    Below we create a new client network value. The first parameter is the initial value to set it to.
    The second parameter is a unique message identifier that must match the correspoinding variale on the server.
    The third parameter is a reference to the clients socket.io conneciton.
*/
const exampleValue = new ClientNetworkValue(0, 'example-value', socket);

/*
    Handle Add and Handle Subtract both utilize two important methods on the ClientNetworkValue class,
    `get` and `set`. We first use `get` to retreive the current value of the variable and make the adjustment.
    Then we use `set` to set the new value to the variable and trigger the emition of a message to the server
    containing that new value.
*/

function handleAdd() {

    const newValue = exampleValue.get() + 1;

    exampleValue.set(newValue);
    updateDisplay();    
};

function handleSubtract() {

    const newValue = exampleValue.get() - 1;

    exampleValue.set(newValue);
    updateDisplay();
};

/*
    Update Display makes use of the previously talked about `get` and a method `getRemote`.
    `getRemote` grabs the last approved value received from the server.
*/

function updateDisplay() {
    document.getElementById('client-display-value').innerText = exampleValue.get();
    document.getElementById('last-confirmed-display-value').innerText = exampleValue.getRemote();
}

/*
    Below we utilize the `subscribeToUpdates` method to pass in a callback that we want to run
    whenever we receive a new message back from the server.
*/
exampleValue.subscribeToUpdates(updateDisplay);

document.getElementById('add-button').addEventListener('click', handleAdd);
document.getElementById('subtract-button').addEventListener('click', handleSubtract);

addEventListener('keypress', e => {
    switch (e.key) {
        case '+':
            handleAdd();
            break;
        case '=':
            handleAdd();
            break;
        case '-':
            handleSubtract();
            break;
        default:
            return;
    }
});
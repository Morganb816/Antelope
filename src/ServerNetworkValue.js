/**
 * Server Network Value
 * - A variable that is networked and has a correspoinding variable on the client side
 * @param {function} checkUpdates - A function that checks if a update from a client is correct. Should return the correct value.
 * @param {SocketIO.Socket} ws - Instance of a Socket.IO connection.
 * @param {number} value - The current value of this variable.
 * @param {string} messageId - Unique identifier for this variable that is used as a message type over the network. Should match client.
 */
class ServerNetworkValue {
    constructor(id, checkUpdates, ws, value = 0) {
        this.checkUpdates = checkUpdates;
        this.ws = ws;
        this.value = value;
        this.messageID = `antelope-value-${id}`;

        ws.on(this.messageID, data => this.handleMessage(data));
    };
    /**
     * Get
     * - Gets the current value of this variable.
     * @return {number} retuns the current value of this variable.
     */
    get() {
        return this.value;
    };
    /**
     * This is a internal method used to handle incoming messages from the client.
     * @param {object} messageRequest - A object with a step, value, and other property that is used to handle incomming messages 
     */
    handleMessage({step, value, other}) {
        const calculatedValues = this.checkUpdates(value, other);
        this.value = calculatedValues;
        this.ws.emit(this.messageID, {step: step, value: calculatedValues, other: other});
    };
};

module.exports = {
    ServerNetworkValue
}
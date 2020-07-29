class ServerNetworkValue {
    constructor(id, checkUpdates, ws, value = 0) {
        this.checkUpdates = checkUpdates;
        this.ws = ws;
        this.value = value;
        this.messageID = `value-${id}`;

        ws.on(this.messageID, data => this.handleMessage(data));
    };
    get() {
        return this.value;
    };
    handleMessage({step, value, other}) {
        const calculatedValues = this.checkUpdates(value, other);
        this.value = calculatedValues;
        this.ws.emit(this.messageID, {step: step, value: calculatedValues, other: other});
    };
};

module.exports = {
    ServerNetworkValue
}
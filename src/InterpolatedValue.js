const { StackRunner, runTimesOverTime, moveCloserTo } = require('./util');

/**
 * Change Request
 * - A class to represent a change request for a Interpolated Value.
 * @property {any}    value - the value we are requesting to set to.
 * @property {number} time  - The time we made this request.
 */
class ChangeRequest {
    constructor(value) {
        this.value = value;
        this.time = Date.now();
    };
};

/**
 * Interpolated Value
 * - A class for creating values that will *LERP* to the new value they are set to.
 * Lerp time defaults to time since last set call or initialization. As an option you can pass in a
 * second parameter to set to overide this time and set it to whatever you want (use epoch).
 * @property {number}      value       - The current value of this variable.
 * @property {number}      lastTime    - The last time we set this variable to something (in epoch).
 * @property {StackRunner} changeStack - The stack of changes in que for this variable.
 */
class InterpolatedValue {
    constructor(initialValue = 0) {
        this.value = initialValue;
        this.lastTime = Date.now();
        this.changeStack = new StackRunner(async data => await this.run(data));
    };
    /**
     * Get
     * - Returns the current value of this variable;
     * @returns {number} the current value of this variable.
     */
    get() {
        return this.value;
    }
    /**
     * Set
     * - Makes a new request to pass into our stack runner.
     * @param {number} value - The value we wish to make a request for.
     * @param {number} time - Time to override last time with (epoch).
     */
    set(value, time) {
        if (time)
            this.lastTime = time;
        this.changeStack.push(new ChangeRequest(value));
    };
    /**
     * Hard Set
     * - Immediatley sets a value to this variable and clears any future changes from the stack.
     * @param {number} value - The value we wish to immediatley set this variable to.
     */
    hardSet(value) {
        this.value = value;
        this.changeStack = new StackRunner(async data => await this.run(data));
    }
    /**
     * Run
     * - Internal method used to handle ChangeRequests when the Stack Runner decides we should.
     * @param {ChangeRequest} request - Current request to handle
     */
    run(request) {
        const changeInValue = Math.abs(this.value - request.value);
        if (changeInValue === 0) {
            return;
        }
        const changeInTime = request.time - this.lastTime;
        return new Promise(resolve => {
            runTimesOverTime(changeInValue, changeInTime, () => {
                this.value = moveCloserTo(this.value, request.value, 1);
            }, () => {
                this.lastTime = Date.now();
                resolve();
            });
        });
    };
};

module.exports = {
    InterpolatedValue,
    ChangeRequest
};
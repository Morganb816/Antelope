/**
 * Run Times Over Time
 *  - A function that runs a given function a supplied amount of times over a certain time period.
 * @param   {number}   times    - Times to run the provided function 
 * @param   {number}   time     - Overall run time
 * @param   {function} func     - func to run
 * @param   {function} callback - func to execute when complete
 * @returns {function}          - a funciton that will cancel the execution of this function.
 */
function runTimesOverTime(times, time, func, callback) {
    let count = 0;
    let interval = setInterval(() => {
        count++;
        func();
        if (count >= times) {
            clearInterval(interval);
            callback();
        }
    }, time / times);

    return function cancel() {
        clearInterval(interval);
    }
}

/**
 * Move Closer To
 *  - A function that moves a number closer to another number by a given amount.
 * @param   {number} from   - Number to move from 
 * @param   {number} to     - Number to move closer to
 * @param   {number} amount - Amount to move
 * @returns {number}        - value closer to the end goal
 */
function moveCloserTo(from, to, amount) {
    if (to > from) {
        if (from + amount >= to) {
            from = to;
        } else {
            from += amount;
        }
    } else {
        if (from - amount <= to) {
            from = to;
        } else {
            from -= amount;
        }
    }
    return from;
}

/**
 * Stack Runner
 * - Class that is used to create a stack that aslong 
 * as it has something in it will recursivley run a callback, by
 * shifting off its stack, until the stack is empty.
 * @property {function} callback - The callback to run on each entry in the stack
 * @property {array}    stack    - The stack used to store values to pass into callback
 * @property {boolean}  running  - Keeps track of if the Stack Runner is currently running through inputs.
 */
class StackRunner {
    constructor(callback) {
        this.callback = callback;
        this.stack = [];
        this.running = false;
    }
    /**
     * Push
     * - Appends the new value to the end of the stack.
     * @param {any} value - Value to pass into callback.
     */
    push(value) {
        this.stack.push(value);
        if (!this.running) {
            this.run();
        }
    }
    /**
     * Run
     * - Shifts off the stack and passes that value into the callback.
     * If there is more in the stack it will recursively call itself until
     * the stack is empty.
     */
    async run() {
        await this.callback(this.stack.shift());
        if (this.stack.length > 1) {
            this.run();
        } else {
            this.running = false;
        }
    }
}

module.exports = {
    runTimesOverTime,
    moveCloserTo,
    StackRunner
};
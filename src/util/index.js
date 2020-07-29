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

module.exports = {
    runTimesOverTime,
    moveCloserTo
};
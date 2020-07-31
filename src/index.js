const { ClientNetworkValue } = require('./ClientNetworkValue');
const { ServerNetworkValue } = require('./ServerNetworkValue');
const { InterpolatedValue } = require('./InterpolatedValue');
const {runTimesOverTime, moveCloserTo, StackRunner} = require('./util/index');

module.exports = {
    ClientNetworkValue,
    ServerNetworkValue,
    InterpolatedValue,
    StackRunner,
    runTimesOverTime,
    moveCloserTo
}
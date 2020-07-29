const chai = require('chai');
const expect = chai.expect;
const { ClientNetworkValue } = require('../src/ClientNetworkValue');

describe(`==========================
  Client Network Value Suite
  ==========================`, () => {

    const initialValue = 0;
    let remoteStep = 0;
    let fakeRemoteValue = initialValue;
    let remoteOther = null;

    let fakews = {
        callbackOn: null,
        brokenOn: null,
        on: function (id, callback) {
            this.callbackOn = () => callback({step: remoteStep, value: fakeRemoteValue});
            this.brokenOn = () => callback({step: remoteStep, value: -1});
        },
        emit: function (id, {step, value, other}) {
            remoteStep = step;
            remoteOther = other;
            fakeRemoteValue = value;
        }
    }

    let cnv = new ClientNetworkValue(initialValue, "test", fakews);

    it('Should return a new instance of "ClientNetworkValue"', () => {
        expect(cnv instanceof ClientNetworkValue).to.be.true;
    });
    
    describe('Should have a method to get the current value', () => {
        it('has a method called get', () => {
            expect((cnv.get)).to.be.a('function');
        });
        it('returns current value', () => {
            expect(cnv.get()).to.equal(initialValue);
        });
    });
    
    describe('Should have a method to get the most up to date remote value', () => {
        it('has a method called getRemote', () => {
            expect((cnv.getRemote)).to.be.a('function');
        });
        it('returns current remote value', () => {
            expect(cnv.getRemote()).to.equal(initialValue);
        });
    });

    describe('Should have a method to set a new value to this variable', () => {
        it('has a method called set', () => {
            expect((cnv.set)).to.be.a('function');
        });
        it('should update the local value', () => {
            cnv.set(5);
            expect(cnv.get()).to.equal(5);
        });
        it('should emit a message with the new value and step id', () => {
            cnv.steps = {};
            cnv.currentID = 1;
            cnv.set(6, 'test');
            expect(fakeRemoteValue).to.equal(6);
            expect(remoteStep).to.equal(1);
            expect(remoteOther).to.equal('test');
        });
        it('should store the update instruction for confirmation from the server later', () => {
            expect(cnv.steps).to.be.a('object');
        });
        it('should store the update instruction with a unique identifier', () => {
            cnv.steps = {};
            cnv.currentID = 1;
            cnv.set(10);
            expect(cnv.steps[1]).to.exist;
            expect(cnv.steps[1]).to.equal(10);
        });
    });
    
    describe('Should have a method to handle receiving messages when received from this instances websocket client', () => {
        it('has a method called handleMessage', () => {
            expect((cnv.handleMessage)).to.be.a('function');
        });
        
        describe('Should work correctly if correct messages have been sent', () => {
            before(function () {
                cnv.steps = {};
                cnv.currentID = 1;
                cnv.set(10);
                fakews.callbackOn();
            });
            it('should check the id of the step received and check the values are equal', () => {
                expect(Object.keys(cnv.steps).length).to.equal(0);
            });
        });

        describe('Should handle incorrect messages correctly', () => {
            before(function () {
                cnv.steps = {};
                cnv.currentID = 1;
                cnv.set(10);
                fakews.brokenOn();
            });
            it('should revert local value to latest correct server if sent inccorect value', () => {
                expect(cnv.local).to.equal(-1);
            });
        });
    });
});
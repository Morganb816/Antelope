const { expect } = require("chai")
const { ServerNetworkValue } = require('../src/ServerNetworkValue.js');

describe(`==========================
  Server Network Value Suite
  ==========================`, () => {
    let clientValue = null;
    let testStep = null;
    let fakews = {
        callbackOn: null,
        brokenOn: null,
        on: function (id, callback) {

        },
        emit: function (id, {step, value, other}) {
            console.log(id, step, value, other);
            testStep = step
            clientValue = value;
        }
    }

    let snv = new ServerNetworkValue('test', x => {return x}, fakews, 0);

    it('Should return a new instance of Server Network Value', () => {
        expect(snv).to.be.a.instanceOf(ServerNetworkValue);
    });
    it('Should store the value of this variable in a property called "value"', () => {
        expect(snv).to.have.property('value');
    });

    describe('Should have a method called get', () => {
        it('has a method called get', () => {
            expect(snv).to.have.property('get');
            expect(snv.get).to.be.a('function');
        });
        it('returns the current value of the variable', () => {
            expect(snv.get()).to.equal(0);
        });
    });
    
    describe('Should handle messages from the client', () => {
        describe('Should have a method called handleMessage', () => {
            before(() => {
                snv.handleMessage({step: 1, value: 5, other: null});
            });
            expect(snv).to.have.property('handleMessage');
            expect(snv.handleMessage).to.be.a('function');
            it('should update the local variable value if check method returns true', () => {
                expect(snv.value).to.equal(5);
            });
            it('should send a message to the client with the found value', () => {
                expect(clientValue).to.equal(5);
                expect(testStep).to.equal(1);
            })
        });
    });
});
const { expect } = require('chai');
const { InterpolatedValue, ChangeRequest } = require('../src/InterpolatedValue.js');

describe(`========================
  Interpolated Value Suite
  ========================`, () => {

    describe('Change Request Suite', () => {
        const cr = new ChangeRequest(5);
        const time = Date.now();
        it('Should return a new instance of ChangeRequest', () => {
            expect(cr).to.be.a.instanceOf(ChangeRequest);
        });
        it('Should have a value property', () => {
            expect(cr).to.have.property('value');
        })
        it('Should take in and set a value', () => {
            expect(cr.value).to.equal(5);
        });
        it('Should have a property called time', () => {
            expect(cr).to.have.property('time');
        });
        it('Should initialize time to the current epoch time', () => {
            expect(cr.time).to.equal(time);
        });
    })

    const iv = new InterpolatedValue();
    it('Should return a new instance of InterpolatedValue', () => {
        expect(iv).to.be.a.instanceOf(InterpolatedValue);
    });
    it('Should store the current value of this variable in a property called "value"', () => {
        expect(iv).to.have.property('value');
    });
    it('Should have a stack to keep track of incoming change requests', () => {
        expect(iv).to.have.property('changeStack');
    });
    describe('Should have a method called get', () => {
        it('has a method called get', () => {
            expect(iv).to.have.property('get');
            expect(iv.get).to.be.a('function');
        });
        it('Should return the current value of this variable', () => {
            expect(iv.get()).to.equal(0);
        });
    })
    describe('Should have a method called set', () => {
        it('has a method called set', () => {
            expect(iv).to.have.property('set');
            expect(iv.set).to.be.a('function');
        });
        it('Should update the value of this value', (done) => {
            iv.set(5);
            setTimeout(() => {
                expect(iv.value).to.equal(5);
                iv.set(10);
                setTimeout(() => {
                    expect(iv.value).to.equal(10);
                    done();
                }, 200);
            }, 100);
        });
    });
    describe('Should have a method called hardSet', () => {
        it('has a method called hardSet', () => {
            expect(iv).to.have.property('hardSet');
            expect(iv.hardSet).to.be.a('function');
        });
        it('Should immediately set the value of this variable to the desired amount', () => {
            iv.set(6);
            iv.hardSet(4);
            expect(iv.value).to.equal(4);
        });
        it('Should clear our stack', () => {
            expect(iv.changeStack.stack.length).to.equal(0);
        });
    });
});
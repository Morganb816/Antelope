const chai = require('chai');
const expect = chai.expect;
const { moveCloserTo, runTimesOverTime, StackRunner } = require('../src/util/index');

describe(`===========================
  Utility Function Test Suite
  ===========================`, () => {

    describe('Move Closer To', () => {
        describe('Should move a given number closer to the given endpoint x amount', () => {
            it('Should handle going up', () => {
                expect(moveCloserTo(1, 2, 1)).to.equal(2);
            });
            it('Should handle going down', () => {
                expect(moveCloserTo(2, 1, 1)).to.equal(1);
            });
            it('Should not exced limit while moving towards', () => {
                expect(moveCloserTo(1, 2, 10)).to.equal(2);
            });
            it('Should not be less than limit while moving towards', () => {
                expect(moveCloserTo(2, 1, 10)).to.equal(1);
            });
        });
    });

    describe('Run Times Over Time', () => {
        describe('Should run a given function a supplied amount of times over a certain time period', () => {

            let runCount = 0;
            const runTimes = 5;
            const runTime = 25;
            function incrementRunCount() {
                runCount++;
            }

            it('Should run a function the given amount of times', done => {
                runTimesOverTime(runTimes, runTime, incrementRunCount, () => {
                    expect(runCount).to.equal(runTimes);
                    done();
                });
            });

            it('Should run over a given amount of time', done => {
                const startTime = Date.now();

                runTimesOverTime(runTimes, runTime, incrementRunCount, () => {
                    expect(Date.now()).to.be.closeTo(startTime + runTime, 10);
                    done();
                });
            });

            it('Should return a function that allows for canceling the loop', done => {
                let gotToEnd = false;
                const cancel = runTimesOverTime(runTimes, runTime, incrementRunCount, () => {
                    gotToEnd = true;
                });
                cancel();
                setTimeout(() => {
                    expect(gotToEnd).to.be.false;
                    done();
                }, runTime + 100);
            });
        });
    });

    describe('StackRunner', () => {
        describe('Should pop entries off its stack as they are put in and run the callback on them', () => {
            let runCount = 0;
            const sr = new StackRunner(() => {
                runCount++;
            });
            before(() => {
                sr.push(5);
            })
            it('Should return a new instance of StackRunner', () => {
                expect(sr).to.be.a.instanceOf(StackRunner);
            });
            it('Should have a property called stack', () => {
                expect(sr).to.have.property('stack');
            });
            describe('Should have a method called "push"', () => {
                it('has method called push', () => {
                    expect(sr).to.have.property('push');
                    expect(sr.push).to.be.a('function');
                });
                it('should run the local method "run" if it is not all ready running', () => {
                    expect(runCount).to.equal(1);
                });
            });
            describe('Should have a method called "run"', () => {
                it('has method called run', () => {
                    expect(sr).to.have.property('run');
                    expect(sr.run).to.be.a('function');
                });
                it('should shift off the stack and pass that value as a parameter to the desired callback', () => {
                    expect(runCount).to.equal(1);
                });
            });
            it('Should have a property called running', () => {
                expect(sr).to.have.property('running');
            });
        });
    });
});
const chai = require('chai');
const expect = chai.expect;
const utils = require('../src/util/index');

describe(`===========================
  Utility Function Test Suite
  ===========================`, () => {
    
    describe('Move Closer To', () => {
        describe('Should move a given number closer to the given endpoint x amount', () => {
            it('Should handle going up', () => {
                expect(utils.moveCloserTo(1, 2, 1)).to.equal(2);
            });
            it('Should handle going down', () => {
                expect(utils.moveCloserTo(2, 1, 1)).to.equal(1);
            });
            it('Should not exced limit while moving towards', () => {
                expect(utils.moveCloserTo(1, 2, 10)).to.equal(2);
            });
            it('Should not be less than limit while moving towards', () => {
                expect(utils.moveCloserTo(2, 1, 10)).to.equal(1);
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
                utils.runTimesOverTime(runTimes, runTime, incrementRunCount, () => {
                    expect(runCount).to.equal(runTimes);
                    done();
                });
            });

            it('Should run over a given amount of time', done => {
                const startTime = Date.now();

                utils.runTimesOverTime(runTimes, runTime, incrementRunCount, () => {
                    expect(Date.now()).to.be.closeTo(startTime + runTime, 10);
                    done();
                });
            });

            it('Should return a function that allows for canceling the loop', done => {
                let gotToEnd = false;
                const cancel = utils.runTimesOverTime(runTimes, runTime, incrementRunCount, () => {
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
});
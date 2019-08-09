const should = require('chai').should();
const Whenzel = require('../');

describe('Whenzel', () => {
  describe('when testing recurring dates', () => {
    it('should return true if the pattern matches', () => {
      Whenzel.test('????-08-25', new Date(2019, 7, 25)).should.be.true;
      Whenzel.test('2019-??-25', new Date(2019, 7, 25)).should.be.true;
      Whenzel.test('2019-08-??', new Date(2019, 7, 25)).should.be.true;
      Whenzel.test('2019-??-??', new Date(2019, 7, 25)).should.be.true;
      Whenzel.test('????-08-??', new Date(2019, 7, 25)).should.be.true;
      Whenzel.test('????-??-25', new Date(2019, 7, 25)).should.be.true;
      Whenzel.test('????-??-??', new Date(2019, 7, 25)).should.be.true;

      Whenzel.test('????-01-01', new Date(1980, 0, 1)).should.be.true;
      Whenzel.test('1980-??-01', new Date(1980, 0, 1)).should.be.true;
      Whenzel.test('1980-01-??', new Date(1980, 0, 1)).should.be.true;
      Whenzel.test('1980-??-??', new Date(1980, 0, 1)).should.be.true;
      Whenzel.test('????-01-??', new Date(1980, 0, 1)).should.be.true;
      Whenzel.test('????-??-01', new Date(1980, 0, 1)).should.be.true;
      Whenzel.test('????-??-??', new Date(1980, 0, 1)).should.be.true;

      Whenzel.test('????-12-31', new Date(2040, 11, 31)).should.be.true;
      Whenzel.test('2040-??-31', new Date(2040, 11, 31)).should.be.true;
      Whenzel.test('2040-12-??', new Date(2040, 11, 31)).should.be.true;
      Whenzel.test('2040-??-??', new Date(2040, 11, 31)).should.be.true;
      Whenzel.test('????-12-??', new Date(2040, 11, 31)).should.be.true;
      Whenzel.test('????-??-31', new Date(2040, 11, 31)).should.be.true;
      Whenzel.test('????-??-??', new Date(2040, 11, 31)).should.be.true;
    });

    it('should return false if the pattern does not match', () => {
      const aDate = new Date(2019, 11, 25);
      Whenzel.test('????-12-24', aDate).should.be.false;
      Whenzel.test('????-12-26', aDate).should.be.false;
      Whenzel.test('????-11-25', aDate).should.be.false;
      Whenzel.test('????-01-01', aDate).should.be.false;

      Whenzel.test('2018-??-25', aDate).should.be.false;
      Whenzel.test('2020-??-25', aDate).should.be.false;
      Whenzel.test('2019-??-24', aDate).should.be.false;
      Whenzel.test('2019-??-26', aDate).should.be.false;
      Whenzel.test('2019-??-01', aDate).should.be.false;
      Whenzel.test('2020-??-26', aDate).should.be.false;

      Whenzel.test('2019-11-??', aDate).should.be.false;
      Whenzel.test('2019-01-??', aDate).should.be.false;
      Whenzel.test('2020-01-??', aDate).should.be.false;
      Whenzel.test('2020-12-??', aDate).should.be.false;
      Whenzel.test('2018-12-??', aDate).should.be.false;

      Whenzel.test('2018-??-??', aDate).should.be.false;
      Whenzel.test('2020-??-??', aDate).should.be.false;
      Whenzel.test('1919-??-??', aDate).should.be.false;
      Whenzel.test('2029-??-??', aDate).should.be.false;

      Whenzel.test('????-??-24', aDate).should.be.false;
      Whenzel.test('????-??-26', aDate).should.be.false;
      Whenzel.test('????-??-12', aDate).should.be.false;
      Whenzel.test('????-??-11', aDate).should.be.false;
      Whenzel.test('????-??-19', aDate).should.be.false;
      Whenzel.test('????-??-01', aDate).should.be.false;

      Whenzel.test('????-11-??', aDate).should.be.false;
      Whenzel.test('????-01-??', aDate).should.be.false;
      Whenzel.test('????-07-??', aDate).should.be.false;
    });

    it('should fail if the pattern syntax is wrong', () => {
      const callingWith = (pattern) => (() => Whenzel.test(pattern));
      callingWith('???-12-25').should.throw();
      callingWith('?????-12-25').should.throw();
      callingWith('2019-?-25').should.throw();
      callingWith('2019-12-?').should.throw();
      callingWith('2019-1?-25').should.throw();
      callingWith('2019-?2-25').should.throw();
      callingWith('2019-12-?5').should.throw();
      callingWith('2019-12-2?').should.throw();
      callingWith('????').should.throw();
      callingWith('????-??').should.throw();
      callingWith('2019-??').should.throw();
      callingWith('?-?-?').should.throw();
    });
  });
});

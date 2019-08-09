const should = require('chai').should();
const Whenzel = require('../');

describe('Whenzel', () => {
  describe('when testing exact dates', () => {
    it('should return true if the pattern matches', () => {
      Whenzel.test('2019-12-25', new Date(2019, 11, 25)).should.be.true;
      Whenzel.test('2019-01-01', new Date(2019, 0, 1)).should.be.true;
      Whenzel.test('2019-01-09', new Date(2019, 0, 9)).should.be.true;
      Whenzel.test('2019-01-10', new Date(2019, 0, 10)).should.be.true;
      Whenzel.test('2019-01-31', new Date(2019, 0, 31)).should.be.true;
      Whenzel.test('2019-02-28', new Date(2019, 1, 28)).should.be.true;
      Whenzel.test('1977-12-14', new Date(1977, 11, 14)).should.be.true;
      Whenzel.test('2035-12-14', new Date(2035, 11, 14)).should.be.true;
    });

    it('should return false if the pattern does not match', () => {
      const aDate = new Date(2019, 11, 25);
      Whenzel.test('2019-12-24', aDate).should.be.false;
      Whenzel.test('2019-12-26', aDate).should.be.false;
      Whenzel.test('2018-12-25', aDate).should.be.false;
      Whenzel.test('2019-11-25', aDate).should.be.false;
      Whenzel.test('1984-05-01', aDate).should.be.false;
    });

    it('should match against the current date if the second argument is not passed', () => {
      const today = new Date().toISOString().substr(0, 'xxxx-xx-xx'.length);
      Whenzel.test(today).should.be.true;
      Whenzel.test('2019-08-07').should.be.false; // Already in the past
    });

    it('should fail if the pattern syntax is wrong', () => {
      // To test exceptions the call should be made by the assertion library
      // so we wrap the call in a functor.
      const callingWith = (pattern) => (() => Whenzel.test(pattern));
      callingWith('2019-01-01').should.not.throw();
      callingWith('2019').should.throw();
      callingWith('201').should.throw();
      callingWith('20111').should.throw();
      callingWith('2019-').should.throw();
      callingWith('2019-01').should.throw();
      callingWith('2019-13').should.throw();
      callingWith('2019-011').should.throw();
      callingWith('2019-011-').should.throw();
      callingWith('2019-1-0').should.throw();
      callingWith('2019-01-0').should.throw();
    });

    it('should fail if the pattern range is wrong', () => {
      // To test exceptions the call should be made by the assertion library
      // so we wrap the call in a functor.
      const callingWith = (pattern) => (() => Whenzel.test(pattern));
      callingWith('2019-13-01').should.throw();
      callingWith('2019-00-01').should.throw();
      callingWith('2019-00-00').should.throw();
      // Very basic range checking, we don't care about the actual number of days
      // in the month
      callingWith('2019-01-32').should.throw();
      callingWith('2019-02-31').should.not.throw();
      callingWith('2019-02-50').should.throw();
      callingWith('2019-02-99').should.throw();
    });
  });
});

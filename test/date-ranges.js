require('chai').should();
const Whenzel = require('../');

describe('Whenzel', () => {
  describe('when testing date ranges', () => {
    it('should work with regular ranges', () => {
      Whenzel.test('2019-12-24 / 2019-12-26', new Date(2019, 11, 24)).should.be.true;
      Whenzel.test('2019-12-24 / 2019-12-26', new Date(2019, 11, 25)).should.be.true;
      Whenzel.test('2019-12-24 / 2019-12-26', new Date(2019, 11, 26)).should.be.true;

      Whenzel.test('2019-12-24 / 2019-12-26', new Date(2019, 11, 23)).should.be.false;
      Whenzel.test('2019-12-24 / 2019-12-26', new Date(2019, 11, 27)).should.be.false;
      Whenzel.test('2019-12-24 / 2019-12-26', new Date(2019, 11, 31)).should.be.false;
      Whenzel.test('2019-12-24 / 2019-12-26', new Date(2018, 11, 25)).should.be.false;
      Whenzel.test('2019-12-24 / 2019-12-26', new Date(2020, 11, 25)).should.be.false;
      Whenzel.test('2019-12-24 / 2019-12-26', new Date(2019, 10, 25)).should.be.false;
      Whenzel.test('2019-12-24 / 2019-12-26', new Date(2019, 10, 24)).should.be.false;
    });

    it('should work with ranges that wrap around', () => {
      Whenzel.test('2019-12-24 / 2020-03-01', new Date(2019, 1, 1)).should.be.false;
      Whenzel.test('2019-12-24 / 2020-03-01', new Date(2019, 11, 23)).should.be.false;
      Whenzel.test('2019-12-24 / 2020-03-01', new Date(2019, 11, 26)).should.be.true;
      Whenzel.test('2019-12-24 / 2020-03-01', new Date(2020, 0, 1)).should.be.true;
      Whenzel.test('2019-12-24 / 2020-03-01', new Date(2020, 2, 1)).should.be.true;
      Whenzel.test('2019-12-24 / 2020-03-01', new Date(2020, 2, 2)).should.be.false;
      Whenzel.test('2019-12-24 / 2020-03-01', new Date(2020, 11, 25)).should.be.false;
    });

    it('should work with ranges that span years', () => {
      Whenzel.test('2019-03-01 / 2021-03-02', new Date(2019, 5, 1)).should.be.true;
      Whenzel.test('2019-03-01 / 2021-03-02', new Date(2020, 11, 20)).should.be.true;
    });

    it('should work with ranges with no lower bound', () => {
      debugger
      Whenzel.test('????-??-?? / 2019-12-25', new Date(1984, 11, 27)).should.be.true;
      Whenzel.test('????-??-?? / 2019-12-25', new Date(2019, 11, 24)).should.be.true;
      Whenzel.test('????-??-?? / 2019-12-25', new Date(2019, 11, 25)).should.be.true;
      Whenzel.test('????-??-?? / 2019-12-25', new Date(2019, 11, 26)).should.be.false;
      Whenzel.test('????-??-?? / 2019-12-25', new Date(2024, 10, 24)).should.be.false;
    });

    it('should work with ranges with no upper bound', () => {
      Whenzel.test('2019-03-01 / ????-??-??', new Date(2010, 1, 1)).should.be.false;
      Whenzel.test('2019-03-01 / ????-??-??', new Date(2018, 5, 2)).should.be.false;
      Whenzel.test('2019-03-01 / ????-??-??', new Date(2019, 1, 28)).should.be.false;
      Whenzel.test('2019-03-01 / ????-??-??', new Date(2019, 2, 1)).should.be.true;
      Whenzel.test('2019-03-01 / ????-??-??', new Date(2019, 5, 11)).should.be.true;
      Whenzel.test('2019-03-01 / ????-??-??', new Date(2022, 1, 11)).should.be.true;
    });

    it('should work with ranges that don\'t specify a year', () => {
      Whenzel.test('????-06-21 / ????-09-23', new Date(2017, 5, 21)).should.be.true;
      Whenzel.test('????-06-21 / ????-09-23', new Date(2017, 7, 13)).should.be.true;
      Whenzel.test('????-06-21 / ????-09-23', new Date(2017, 8, 22)).should.be.true;
      Whenzel.test('????-06-21 / ????-09-23', new Date(2017, 8, 23)).should.be.true;

      Whenzel.test('????-06-21 / ????-09-23', new Date(2017, 5, 20)).should.be.false;
      Whenzel.test('????-06-21 / ????-09-23', new Date(2017, 8, 24)).should.be.false;
      Whenzel.test('????-06-21 / ????-09-23', new Date(2017, 3, 23)).should.be.false;
      Whenzel.test('????-06-21 / ????-09-23', new Date(2017, 10, 25)).should.be.false;
      Whenzel.test('????-06-21 / ????-09-23', new Date(2030, 10, 12)).should.be.false;
    });

    it('should work with ranges that rollover and don\'t specify a year', () => {
      Whenzel.test('????-12-21 / ????-03-21', new Date(2019, 8, 21)).should.be.false;
      Whenzel.test('????-12-21 / ????-03-21', new Date(2019, 11, 20)).should.be.false;
      Whenzel.test('????-12-21 / ????-03-21', new Date(2019, 11, 21)).should.be.true;
      Whenzel.test('????-12-21 / ????-03-21', new Date(2019, 11, 29)).should.be.true;
      Whenzel.test('????-12-21 / ????-03-21', new Date(2020, 0, 1)).should.be.true;
      Whenzel.test('????-12-21 / ????-03-21', new Date(2020, 1, 21)).should.be.true;
      Whenzel.test('????-12-21 / ????-03-21', new Date(2020, 2, 21)).should.be.true;
      Whenzel.test('????-12-21 / ????-03-21', new Date(2020, 2, 22)).should.be.false;
      Whenzel.test('????-12-21 / ????-03-21', new Date(2020, 5, 22)).should.be.false;
    });

    it('should work with ranges that don\'t specify a month', () => {
      Whenzel.test('2019-??-05 / 2019-??-15', new Date(2017, 5, 10)).should.be.false;
      Whenzel.test('2019-??-05 / 2019-??-15', new Date(2019, 5, 4)).should.be.false;

      Whenzel.test('2019-??-05 / 2019-??-15', new Date(2019, 5, 5)).should.be.true;
      Whenzel.test('2019-??-05 / 2019-??-15', new Date(2019, 5, 10)).should.be.true;
      Whenzel.test('2019-??-05 / 2019-??-15', new Date(2019, 5, 15)).should.be.true;

      Whenzel.test('2019-??-05 / 2019-??-15', new Date(2020, 5, 10)).should.be.false;

      Whenzel.test('2018-??-05 / 2020-??-15', new Date(2017, 5, 8)).should.be.false;
      Whenzel.test('2018-??-05 / 2020-??-15', new Date(2017, 5, 4)).should.be.false;
      Whenzel.test('2018-??-05 / 2020-??-15', new Date(2018, 5, 8)).should.be.true;
      Whenzel.test('2018-??-05 / 2020-??-15', new Date(2019, 5, 8)).should.be.true;
      Whenzel.test('2018-??-05 / 2020-??-15', new Date(2020, 5, 8)).should.be.true;
      Whenzel.test('2018-??-05 / 2020-??-15', new Date(2020, 5, 16)).should.be.false;
      Whenzel.test('2018-??-05 / 2020-??-15', new Date(2021, 5, 8)).should.be.false;
    });

    it('should work with ranges that rollover that don\'t specify a month', () => {
      Whenzel.test('2018-??-10 / 2018-??-05', new Date(2018, 0, 1)).should.be.false;
      Whenzel.test('2018-??-10 / 2018-??-05', new Date(2018, 0, 9)).should.be.false;
      Whenzel.test('2018-??-10 / 2018-??-05', new Date(2018, 0, 10)).should.be.true;
      Whenzel.test('2018-??-10 / 2018-??-05', new Date(2018, 0, 15)).should.be.true;
      Whenzel.test('2018-??-10 / 2018-??-05', new Date(2018, 0, 31)).should.be.true;

      Whenzel.test('2018-??-10 / 2018-??-05', new Date(2018, 5, 1)).should.be.true;
      Whenzel.test('2018-??-10 / 2018-??-05', new Date(2018, 5, 5)).should.be.true;
      Whenzel.test('2018-??-10 / 2018-??-05', new Date(2018, 5, 6)).should.be.false;
      Whenzel.test('2018-??-10 / 2018-??-05', new Date(2018, 5, 8)).should.be.false;
      Whenzel.test('2018-??-10 / 2018-??-05', new Date(2018, 5, 9)).should.be.false;
      Whenzel.test('2018-??-10 / 2018-??-05', new Date(2018, 5, 10)).should.be.true;
      Whenzel.test('2018-??-10 / 2018-??-05', new Date(2018, 5, 15)).should.be.true;
      Whenzel.test('2018-??-10 / 2018-??-05', new Date(2018, 5, 31)).should.be.true;

      Whenzel.test('2018-??-10 / 2018-??-05', new Date(2018, 11, 1)).should.be.true;
      Whenzel.test('2018-??-10 / 2018-??-05', new Date(2018, 11, 5)).should.be.true;
      Whenzel.test('2018-??-10 / 2018-??-05', new Date(2018, 11, 10)).should.be.false;
      Whenzel.test('2018-??-10 / 2018-??-05', new Date(2018, 11, 20)).should.be.false;
      Whenzel.test('2018-??-10 / 2018-??-05', new Date(2018, 11, 31)).should.be.false;
    });

    it('should work with ranges that don\'t specify a day', () => {
      Whenzel.test('2018-03-?? / 2018-05-??', new Date(2017, 2, 5)).should.be.false;
      Whenzel.test('2018-03-?? / 2018-05-??', new Date(2018, 1, 20)).should.be.false;
      Whenzel.test('2018-03-?? / 2018-05-??', new Date(2018, 2, 5)).should.be.true;
      Whenzel.test('2018-03-?? / 2018-05-??', new Date(2018, 4, 5)).should.be.true;
      Whenzel.test('2018-03-?? / 2018-05-??', new Date(2018, 5, 1)).should.be.false;
      Whenzel.test('2018-03-?? / 2018-05-??', new Date(2019, 3, 1)).should.be.false;
    });

    it('should work with ranges that rollover that don\'t specify a day', () => {
      Whenzel.test('2018-03-?? / 2020-01-??', new Date(2027, 5, 8)).should.be.false;
      Whenzel.test('2018-03-?? / 2020-01-??', new Date(2018, 1, 28)).should.be.false;
      Whenzel.test('2018-03-?? / 2020-01-??', new Date(2018, 2, 1)).should.be.true;
      Whenzel.test('2018-03-?? / 2020-01-??', new Date(2019, 1, 28)).should.be.true;
      Whenzel.test('2018-03-?? / 2020-01-??', new Date(2019, 4, 28)).should.be.true;
      Whenzel.test('2018-03-?? / 2020-01-??', new Date(2020, 0, 28)).should.be.true;
      Whenzel.test('2018-03-?? / 2020-01-??', new Date(2020, 1, 1)).should.be.false;
    });

    it('should work with ranges that don\'t specify a year or month', () => {
      Whenzel.test('????-??-05 / ????-??-10', new Date(2017, 8, 6)).should.be.true;
      Whenzel.test('????-??-05 / ????-??-10', new Date(2030, 8, 10)).should.be.true;

      Whenzel.test('????-??-05 / ????-??-10', new Date(2000, 1, 4)).should.be.false;
      Whenzel.test('????-??-05 / ????-??-10', new Date(2020, 1, 4)).should.be.false;
      Whenzel.test('????-??-05 / ????-??-10', new Date(2000, 1, 11)).should.be.false;
      Whenzel.test('????-??-05 / ????-??-10', new Date(2020, 1, 11)).should.be.false;
    });

    it('should work with ranges that rollover that don\'t specify a year or month', () => {
      Whenzel.test('????-??-20 / ????-??-05', new Date(2020, 1, 1)).should.be.true;
      Whenzel.test('????-??-20 / ????-??-05', new Date(2020, 1, 5)).should.be.true;
      Whenzel.test('????-??-20 / ????-??-05', new Date(2020, 1, 6)).should.be.false;
      Whenzel.test('????-??-20 / ????-??-05', new Date(2020, 1, 10)).should.be.false;
      Whenzel.test('????-??-20 / ????-??-05', new Date(2020, 1, 20)).should.be.true;
      Whenzel.test('????-??-20 / ????-??-05', new Date(2020, 1, 21)).should.be.true;
    });

    it('should work with ranges that don\'t specify a year or day', () => {
      Whenzel.test('????-03-?? / ????-05-??', new Date(2020, 2, 1)).should.be.true;
      Whenzel.test('????-03-?? / ????-05-??', new Date(2020, 2, 5)).should.be.true;
      Whenzel.test('????-03-?? / ????-05-??', new Date(2020, 3, 10)).should.be.true;
      Whenzel.test('????-03-?? / ????-05-??', new Date(2020, 4, 1)).should.be.true;
      Whenzel.test('????-03-?? / ????-05-??', new Date(2020, 4, 31)).should.be.true;

      Whenzel.test('????-03-?? / ????-05-??', new Date(2020, 1, 12)).should.be.false;
      Whenzel.test('????-03-?? / ????-05-??', new Date(2020, 5, 1)).should.be.false;
    });

    it('should work with ranges that rollover that don\'t specify a year or day', () => {
      Whenzel.test('????-11-?? / ????-02-??', new Date(2020, 9, 5)).should.be.false;
      Whenzel.test('????-11-?? / ????-02-??', new Date(2020, 10, 1)).should.be.true;
      Whenzel.test('????-11-?? / ????-02-??', new Date(2020, 11, 5)).should.be.true;
      Whenzel.test('????-11-?? / ????-02-??', new Date(2020, 0, 5)).should.be.true;
      Whenzel.test('????-11-?? / ????-02-??', new Date(2020, 1, 5)).should.be.true;
      Whenzel.test('????-11-?? / ????-02-??', new Date(2020, 1, 28)).should.be.true;
      Whenzel.test('????-11-?? / ????-02-??', new Date(2020, 2, 1)).should.be.false;
      Whenzel.test('????-11-?? / ????-02-??', new Date(2020, 7, 1)).should.be.false;
    });

    it('should work with ranges that only specify a year', () => {
      Whenzel.test('2019-??-?? / 2020-??-??', new Date(2018, 11, 31)).should.be.false;
      Whenzel.test('2019-??-?? / 2020-??-??', new Date(2019, 0, 1)).should.be.true;
      Whenzel.test('2019-??-?? / 2020-??-??', new Date(2019, 11, 31)).should.be.true;
      Whenzel.test('2019-??-?? / 2020-??-??', new Date(2020, 0, 1)).should.be.true;
      Whenzel.test('2019-??-?? / 2020-??-??', new Date(2020, 11, 31)).should.be.true;
      Whenzel.test('2019-??-?? / 2020-??-??', new Date(2021, 0, 1)).should.be.false;
    });

    it('should work with ranges that don\'t specify anything', () => {
      Whenzel.test('????-??-?? / ????-??-??', new Date(1980, 1, 1)).should.be.true;
      Whenzel.test('????-??-?? / ????-??-??', new Date(2018, 5, 12)).should.be.true;
      Whenzel.test('????-??-?? / ????-??-??', new Date(2040, 8, 12)).should.be.true;
    });

    it('should work with a crazy mix of wildcards and numbers', () => {
      Whenzel.test('2019-12-25 / 2020-03-??', new Date(2018, 11, 31)).should.be.false;
      Whenzel.test('2019-12-25 / 2020-03-??', new Date(2019, 11, 24)).should.be.false;
      Whenzel.test('2019-12-25 / 2020-03-??', new Date(2019, 11, 25)).should.be.true;
      Whenzel.test('2019-12-25 / 2020-03-??', new Date(2019, 11, 31)).should.be.true;
      Whenzel.test('2019-12-25 / 2020-03-??', new Date(2020, 0, 4)).should.be.true;
      Whenzel.test('2019-12-25 / 2020-03-??', new Date(2020, 2, 1)).should.be.true;
      Whenzel.test('2019-12-25 / 2020-03-??', new Date(2020, 2, 31)).should.be.true;
      Whenzel.test('2019-12-25 / 2020-03-??', new Date(2020, 3, 1)).should.be.false;
      Whenzel.test('2019-12-25 / 2020-03-??', new Date(2020, 11, 25)).should.be.false;
      Whenzel.test('2019-12-25 / 2020-03-??', new Date(2025, 11, 25)).should.be.false;

      Whenzel.test('2019-??-25 / ????-04-26', new Date(2019, 0, 24)).should.be.false;
      Whenzel.test('2019-??-25 / ????-04-26', new Date(2019, 0, 25)).should.be.true;
      Whenzel.test('2019-??-25 / ????-04-26', new Date(2025, 8, 1)).should.be.false;

      Whenzel.test('2019-03-?? / 2019-??-10', new Date(2019, 1, 1)).should.be.false;
      Whenzel.test('2019-03-?? / 2019-??-10', new Date(2019, 2, 1)).should.be.true;
      Whenzel.test('2019-03-?? / 2019-??-10', new Date(2019, 2, 4)).should.be.true;
      Whenzel.test('2019-03-?? / 2019-??-10', new Date(2019, 11, 11)).should.be.false;
      Whenzel.test('2019-03-?? / 2019-??-10', new Date(2019, 5, 7)).should.be.true;
      Whenzel.test('2019-03-?? / 2019-??-10', new Date(2020, 0, 1)).should.be.false;
    });

    it('should fail if either of the dates are invalid', () => {
      const callingWith = (pattern) => (() => Whenzel.test(pattern));
      callingWith('2019-12-25 / 2019-13-25').should.throw();
      callingWith('2019-13-25 / 2019-12-25').should.throw();
      callingWith('2019-01-50 / 2019-12-25').should.throw();
      callingWith('2019-01-50 / 2019-20-25').should.throw();
      callingWith('2019-01-50 / 2019-20-38').should.throw();
    });

    it('should fail if the pattern syntax is wrong', () => {
      const callingWith = (pattern) => (() => Whenzel.test(pattern));
      callingWith('12019-13-25 / 2019-22-25').should.throw();
      callingWith('???-12-25 / 2019-12-25').should.throw();
      callingWith('2019-12-25 / 2019-???-25').should.throw();
      callingWith('2019-12-25 / ?-01-25').should.throw();
      callingWith('/ 2019-12-25').should.throw();
      callingWith('2019-12-25 /').should.throw();
      callingWith('2019-12-25 / ????').should.throw();
      callingWith('2019-12-25 / -').should.throw();
      callingWith('2019-12-25 / 2019').should.throw();
    });
  });
});

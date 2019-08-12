require('chai').should();
const Whenzel = require('../');

describe('Whenzel', () => {
  describe('when testing filters', () => {
    it('should handle days of the week', () => {
      Whenzel.test('#monday', new Date(2019, 7, 12)).should.be.true;
      Whenzel.test('#monday', new Date(2019, 7, 11)).should.be.false;
      Whenzel.test('#monday', new Date(2019, 7, 10)).should.be.false;
      Whenzel.test('#monday', new Date(2019, 7, 9)).should.be.false;
      Whenzel.test('#monday', new Date(2019, 7, 8)).should.be.false;
      Whenzel.test('#monday', new Date(2019, 7, 7)).should.be.false;
      Whenzel.test('#monday', new Date(2019, 7, 6)).should.be.false;

      Whenzel.test('#tuesday', new Date(2019, 7, 13)).should.be.true;
      Whenzel.test('#wednesday', new Date(2019, 7, 14)).should.be.true;
      Whenzel.test('#thursday', new Date(2019, 7, 15)).should.be.true;
      Whenzel.test('#friday', new Date(2019, 7, 16)).should.be.true;
      Whenzel.test('#saturday', new Date(2019, 7, 17)).should.be.true;
      Whenzel.test('#sunday', new Date(2019, 7, 18)).should.be.true;
    });

    it('should handle parts of the week', () => {
      Whenzel.test('#weekday', new Date(2019, 7, 12)).should.be.true;
      Whenzel.test('#weekday', new Date(2019, 7, 13)).should.be.true;
      Whenzel.test('#weekday', new Date(2019, 7, 14)).should.be.true;
      Whenzel.test('#weekday', new Date(2019, 7, 15)).should.be.true;
      Whenzel.test('#weekday', new Date(2019, 7, 16)).should.be.true;
      Whenzel.test('#weekend', new Date(2019, 7, 17)).should.be.true;
      Whenzel.test('#weekend', new Date(2019, 7, 18)).should.be.true;
    });

    it('should handle weeks of the month', () => {
      Whenzel.test('#week1', new Date(2019, 7, 1)).should.be.true;
      Whenzel.test('#week1', new Date(2019, 7, 2)).should.be.true;
      Whenzel.test('#week1', new Date(2019, 7, 3)).should.be.true;
      Whenzel.test('#week1', new Date(2019, 7, 4)).should.be.false;

      Whenzel.test('#week2', new Date(2019, 7, 4)).should.be.true;
      Whenzel.test('#week2', new Date(2019, 7, 5)).should.be.true;
      Whenzel.test('#week2', new Date(2019, 7, 10)).should.be.true;
      Whenzel.test('#week2', new Date(2019, 7, 11)).should.be.false;

      Whenzel.test('#week3', new Date(2019, 7, 11)).should.be.true;
      Whenzel.test('#week3', new Date(2019, 7, 14)).should.be.true;
      Whenzel.test('#week3', new Date(2019, 7, 17)).should.be.true;

      Whenzel.test('#week4', new Date(2019, 7, 18)).should.be.true;
      Whenzel.test('#week4', new Date(2019, 7, 22)).should.be.true;
      Whenzel.test('#week4', new Date(2019, 7, 24)).should.be.true;

      Whenzel.test('#week5', new Date(2019, 7, 25)).should.be.true;
      Whenzel.test('#week5', new Date(2019, 7, 30)).should.be.true;
      Whenzel.test('#week5', new Date(2019, 7, 31)).should.be.true;
      Whenzel.test('#week5', new Date(2019, 10, 30)).should.be.true;

      Whenzel.test('#week6', new Date(2019, 7, 31)).should.be.false;

      Whenzel.test('#week1', new Date(2019, 5, 1)).should.be.true;
      Whenzel.test('#week1', new Date(2019, 5, 2)).should.be.false;

      Whenzel.test('#week6', new Date(2019, 5, 29)).should.be.false;
      Whenzel.test('#week6', new Date(2019, 5, 30)).should.be.true;
      Whenzel.test('#week6', new Date(2019, 6, 1)).should.be.false;
    });

    it('should handle days of the month', () => {
      Whenzel.test('#firstDayOfMonth', new Date(2019, 11, 1)).should.be.true;
      Whenzel.test('#firstDayOfMonth', new Date(2019, 11, 2)).should.be.false;
      Whenzel.test('#lastDayOfMonth', new Date(2019, 7, 30)).should.be.false;
      Whenzel.test('#lastDayOfMonth', new Date(2019, 7, 31)).should.be.true;
      Whenzel.test('#lastDayOfMonth', new Date(2019, 8, 30)).should.be.true;
      Whenzel.test('#lastDayOfMonth', new Date(2019, 1, 28)).should.be.true;
      Whenzel.test('#lastDayOfMonth', new Date(2020, 1, 28)).should.be.false;
      Whenzel.test('#lastDayOfMonth', new Date(2020, 1, 29)).should.be.true;
    });

    it('should handle leap days', () => {
      Whenzel.test('#leapDay', new Date(2019, 11, 24)).should.be.false;
      Whenzel.test('#leapDay', new Date(2020, 1, 28)).should.be.false;
      Whenzel.test('#leapDay', new Date(2020, 1, 29)).should.be.true;
    });

    it('should handle the pythagoras day', () => {
      Whenzel.test('#pythagoras', new Date(2019, 11, 24)).should.be.false;
      Whenzel.test('#pythagoras', new Date(2017, 7, 15)).should.be.true;
      Whenzel.test('#pythagoras', new Date(2017, 7, 14)).should.be.false;
      Whenzel.test('#pythagoras', new Date(2017, 7, 16)).should.be.false;

      Whenzel.test('#pythagoras', new Date(2020, 11, 16)).should.be.true;
      Whenzel.test('#pythagoras', new Date(2025, 6, 24)).should.be.true;
    });

    it('should handle several filters at once', () => {
      Whenzel.test('#monday #week1', new Date(2019, 7, 12)).should.be.false;
      Whenzel.test('#monday #week2', new Date(2019, 7, 12)).should.be.false;
      Whenzel.test('#monday #week3', new Date(2019, 7, 12)).should.be.true;

      Whenzel.test('#monday #weekday #week3', new Date(2019, 7, 12)).should.be.true;

      Whenzel.test('#monday #weekday', new Date(2019, 7, 12)).should.be.true;
      Whenzel.test('#monday #weekend', new Date(2019, 7, 12)).should.be.false;
      Whenzel.test('#monday #tuesday', new Date(2019, 7, 12)).should.be.false;
    });

    it('should handle filters combined with dates', () => {
      Whenzel.test('2019-08-12 #monday #week3', new Date(2019, 7, 12)).should.be.true;
      Whenzel.test('2019-08-?? #monday #week3', new Date(2019, 7, 12)).should.be.true;
      Whenzel.test('2019-??-?? #monday #week3', new Date(2019, 7, 12)).should.be.true;
      Whenzel.test('????-08-12 #monday #week3', new Date(2019, 7, 12)).should.be.true;

      Whenzel.test('2019-08-13 #monday #week3', new Date(2019, 7, 12)).should.be.false;
      Whenzel.test('2019-09-12 #monday #week3', new Date(2019, 7, 12)).should.be.false;

      Whenzel.test('2019-08-?? #weekday', new Date(2019, 7, 10)).should.be.false;
      Whenzel.test('2019-08-?? #weekday', new Date(2019, 7, 11)).should.be.false;
      Whenzel.test('2019-08-?? #weekday', new Date(2019, 7, 12)).should.be.true;
      Whenzel.test('2019-08-?? #weekday', new Date(2019, 7, 13)).should.be.true;
    });

    it('should handle filters combined with date ranges', () => {
      Whenzel.test('????-12-24 / ????-12-26 #weekday', new Date(2019, 11, 25)).should.be.true;
      Whenzel.test('????-12-24 / ????-12-26 #wednesday', new Date(2019, 11, 25)).should.be.true;
      Whenzel.test('????-12-24 / ????-12-26 #wednesday #weekday', new Date(2019, 11, 25)).should.be.true;

      Whenzel.test('????-12-24 / ????-12-26 #weekday', new Date(2019, 11, 22)).should.be.false;
      Whenzel.test('????-12-24 / ????-12-26 #weekday', new Date(2019, 11, 23)).should.be.false;
      Whenzel.test('????-12-24 / ????-12-26 #thursday', new Date(2019, 11, 25)).should.be.false;
      Whenzel.test('????-12-24 / ????-12-26 #weekend #thursday', new Date(2019, 11, 25)).should.be.false;

      Whenzel.test('2018-12-24 / 2018-12-26 #weekday', new Date(2019, 11, 25)).should.be.false;
      Whenzel.test('2019-12-24 / 2019-12-26 #weekday', new Date(2019, 11, 25)).should.be.true;
      Whenzel.test('2019-12-24 / 2019-12-26 #weekday #wednesday', new Date(2019, 11, 25)).should.be.true;
      Whenzel.test('2019-12-24 / 2019-12-26 #weekday #tuesday', new Date(2019, 11, 24)).should.be.true;
      Whenzel.test('2019-12-24 / 2019-12-26 #weekday #thursday', new Date(2019, 11, 26)).should.be.true;
      Whenzel.test('2019-12-24 / 2019-12-26 #weekday #wednesday', new Date(2019, 11, 26)).should.be.false;
      Whenzel.test('2019-12-24 / 2019-12-26 #weekday #friday', new Date(2019, 11, 27)).should.be.false;
    });

    it('should handle filters combined with symbolic days', () => {
      Whenzel.test('@christmas #wednesday', new Date(2019, 11, 25)).should.be.true;
      Whenzel.test('@christmas #wednesday #weekday', new Date(2019, 11, 25)).should.be.true;
      Whenzel.test('@christmasEve / @christmas  #wednesday', new Date(2019, 11, 25)).should.be.true;

      Whenzel.test('@christmas #wednesday', new Date(2019, 11, 24)).should.be.false;
      Whenzel.test('@christmas #thursday', new Date(2019, 11, 25)).should.be.false;

      Whenzel.test('@easter #saturday', new Date(2019, 3, 21)).should.be.false;
      Whenzel.test('@easter #sunday', new Date(2019, 3, 21)).should.be.true;
      Whenzel.test('@easter / @easter+2 #monday', new Date(2019, 3, 22)).should.be.true;
      Whenzel.test('@easter / @easter+2 #monday', new Date(2019, 3, 24)).should.be.false;
    });

    it('should handle the boolean filters', () => {
      Whenzel.test('#always', new Date(2019, 11, 25)).should.be.true;
      Whenzel.test('#always', new Date(2019, 11, 24)).should.be.true;
      Whenzel.test('@christmas #wednesday #always', new Date(2019, 11, 25)).should.be.true;
      Whenzel.test('@christmas #tuesday #always', new Date(2019, 11, 25)).should.be.false;

      Whenzel.test('#never', new Date(2019, 11, 25)).should.be.false;
      Whenzel.test('#never', new Date(2019, 11, 24)).should.be.false;
      Whenzel.test('@christmas #wednesday #never', new Date(2019, 11, 25)).should.be.false;
      Whenzel.test('@christmas #tuesday #never', new Date(2019, 11, 25)).should.be.false;

      Whenzel.test('#always #never', new Date(2019, 11, 25)).should.be.false;
      Whenzel.test('#never #always', new Date(2019, 11, 25)).should.be.false;
    });

    it('should thrown an error on syntax errors', () => {
      const callingWith = (pattern) => (() => Whenzel.test(pattern));
      callingWith('#').should.throw();
      callingWith('#monday error').should.throw();
      callingWith('#weekday 2019-08-??').should.throw();
      callingWith('2019-08-25 / 2019-09-20 #').should.throw();
      callingWith('2019-08-25 / 2019-09-20 wrong').should.throw();
      callingWith('2019-08-25 / 2019-09-20 #monday #').should.throw();
      callingWith('2019-08-25 / 2019-09-20 ##monday').should.throw();
      callingWith('2019-08-25 / #monday').should.throw();
      callingWith('@christmas #').should.throw();
      callingWith('@christmas ##monday').should.throw();
      callingWith('@christmas #monday error').should.throw();
    });

    it('should thrown an error on invalid filters', () => {
      const callingWith = (pattern) => (() => Whenzel.test(pattern));
      callingWith('@christmas #frodo').should.throw();
      callingWith('#thisShouldFail').should.throw();
    });
  });
});

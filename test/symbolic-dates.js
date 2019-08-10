require('chai').should();
const Whenzel = require('../');

describe('Whenzel', () => {
  describe('when testing symbolic dates', () => {
    it('should support standalone symbols', () => {
      Whenzel.test('@christmasEve', new Date(1984, 11, 24)).should.be.true;
      Whenzel.test('@christmasEve', new Date(2019, 11, 24)).should.be.true;
      Whenzel.test('@christmasEve', new Date(2040, 11, 24)).should.be.true;
      Whenzel.test('@christmasEve', new Date(2019, 11, 23)).should.be.false;
      Whenzel.test('@christmasEve', new Date(2019, 10, 24)).should.be.false;
      Whenzel.test('@christmasEve', new Date(2019, 11, 25)).should.be.false;

      Whenzel.test('@christmas', new Date(1984, 11, 25)).should.be.true;
      Whenzel.test('@christmas', new Date(2019, 11, 25)).should.be.true;
      Whenzel.test('@christmas', new Date(2040, 11, 25)).should.be.true;
      Whenzel.test('@christmas', new Date(2019, 11, 24)).should.be.false;
      Whenzel.test('@christmas', new Date(2019, 10, 25)).should.be.false;
      Whenzel.test('@christmas', new Date(2019, 11, 26)).should.be.false;

      Whenzel.test('@boxingDay', new Date(1984, 11, 26)).should.be.true;
      Whenzel.test('@boxingDay', new Date(2019, 11, 26)).should.be.true;
      Whenzel.test('@boxingDay', new Date(2040, 11, 26)).should.be.true;
      Whenzel.test('@boxingDay', new Date(2019, 11, 25)).should.be.false;
      Whenzel.test('@boxingDay', new Date(2019, 10, 26)).should.be.false;
      Whenzel.test('@boxingDay', new Date(2019, 11, 27)).should.be.false;

      Whenzel.test('@newYearsEve', new Date(1984, 11, 31)).should.be.true;
      Whenzel.test('@newYearsEve', new Date(2019, 11, 31)).should.be.true;
      Whenzel.test('@newYearsEve', new Date(2040, 11, 31)).should.be.true;
      Whenzel.test('@newYearsEve', new Date(2019, 11, 30)).should.be.false;
      Whenzel.test('@newYearsEve', new Date(2019, 0, 1)).should.be.false;
      Whenzel.test('@newYearsEve', new Date(2019, 10, 31)).should.be.false;

      Whenzel.test('@newYear', new Date(1984, 0, 1)).should.be.true;
      Whenzel.test('@newYear', new Date(2019, 0, 1)).should.be.true;
      Whenzel.test('@newYear', new Date(2040, 0, 1)).should.be.true;
      Whenzel.test('@newYear', new Date(2019, 0, 2)).should.be.false;
      Whenzel.test('@newYear', new Date(2019, 11, 31)).should.be.false;
      Whenzel.test('@newYear', new Date(2019, 1, 1)).should.be.false;

      Whenzel.test('@halloween', new Date(2030, 9, 31)).should.be.true;
      Whenzel.test('@halloween', new Date(2019, 5, 7)).should.be.false;

      Whenzel.test('@allSaintsDay', new Date(2019, 10, 1)).should.be.true;
      Whenzel.test('@allSaintsDay', new Date(2019, 0, 1)).should.be.false;

      Whenzel.test('@aprilFools', new Date(2019, 3, 1)).should.be.true;
      Whenzel.test('@aprilFools', new Date(2019, 8, 1)).should.be.false;

      Whenzel.test('@earthDay', new Date(2019, 3, 22)).should.be.true;
      Whenzel.test('@earthDay', new Date(2019, 9, 1)).should.be.false;

      Whenzel.test('@valentinesDay', new Date(2019, 1, 14)).should.be.true;
      Whenzel.test('@valentinesDay', new Date(2019, 9, 14)).should.be.false;

      Whenzel.test('@stPatrick', new Date(2019, 2, 17)).should.be.true;
      Whenzel.test('@stPatrick', new Date(2019, 4, 1)).should.be.false;

      Whenzel.test('@laborDay', new Date(2019, 4, 1)).should.be.true;
      Whenzel.test('@laborDay', new Date(2019, 4, 9)).should.be.false;

      Whenzel.test('@piDay', new Date(2019, 2, 14)).should.be.true;
      Whenzel.test('@piDay', new Date(2019, 7, 1)).should.be.false;
    });

    it('should support ranges that have symbols', () => {
      Whenzel.test('@christmasEve / @christmas', new Date(1984, 11, 23)).should.be.false;
      Whenzel.test('@christmasEve / @christmas', new Date(1984, 11, 24)).should.be.true;
      Whenzel.test('@christmasEve / @christmas', new Date(1984, 11, 25)).should.be.true;
      Whenzel.test('@christmasEve / @christmas', new Date(1984, 11, 26)).should.be.false;

      Whenzel.test('@christmasEve / @boxingDay', new Date(1984, 11, 24)).should.be.true;
      Whenzel.test('@christmasEve / @boxingDay', new Date(1984, 11, 26)).should.be.true;
      Whenzel.test('@christmasEve / @boxingDay', new Date(1984, 11, 27)).should.be.false;
    });

    it('should support mixed use of symbols and patterns', () => {
      Whenzel.test('2019-10-15 / @halloween', new Date(2019, 9, 14)).should.be.false;
      Whenzel.test('2019-10-15 / @halloween', new Date(2019, 9, 15)).should.be.true;
      Whenzel.test('2019-10-15 / @halloween', new Date(2019, 9, 24)).should.be.true;
      Whenzel.test('2019-10-15 / @halloween', new Date(2019, 9, 31)).should.be.true;
      Whenzel.test('2019-10-15 / @halloween', new Date(2019, 10, 1)).should.be.false;
      Whenzel.test('2019-10-15 / @halloween', new Date(2020, 2, 15)).should.be.true;
      Whenzel.test('2019-10-15 / @halloween', new Date(2020, 9, 31)).should.be.true;

      Whenzel.test('????-10-15 / @halloween', new Date(2019, 9, 14)).should.be.false;
      Whenzel.test('????-10-15 / @halloween', new Date(2019, 9, 15)).should.be.true;
      Whenzel.test('????-10-15 / @halloween', new Date(2019, 9, 24)).should.be.true;
      Whenzel.test('????-10-15 / @halloween', new Date(2019, 9, 31)).should.be.true;
      Whenzel.test('????-10-15 / @halloween', new Date(2019, 10, 1)).should.be.false;
      Whenzel.test('????-10-15 / @halloween', new Date(2020, 9, 18)).should.be.true;
      Whenzel.test('????-10-15 / @halloween', new Date(2020, 9, 31)).should.be.true;

      Whenzel.test('@laborDay / 2019-05-05', new Date(2016, 2, 0)).should.be.false;
      Whenzel.test('@laborDay / 2019-05-05', new Date(2018, 4, 1)).should.be.true;
      Whenzel.test('@laborDay / 2019-05-05', new Date(2019, 4, 1)).should.be.true;
      Whenzel.test('@laborDay / 2019-05-05', new Date(2019, 4, 5)).should.be.true;
      Whenzel.test('@laborDay / 2019-05-05', new Date(2019, 4, 6)).should.be.false;

      Whenzel.test('@laborDay / ????-05-05', new Date(2018, 4, 1)).should.be.true;
      Whenzel.test('@laborDay / ????-05-05', new Date(2019, 4, 1)).should.be.true;
      Whenzel.test('@laborDay / ????-05-05', new Date(2019, 4, 5)).should.be.true;
      Whenzel.test('@laborDay / ????-05-05', new Date(2019, 4, 6)).should.be.false;
      Whenzel.test('@laborDay / ????-05-05', new Date(2025, 2, 4)).should.be.false;
      Whenzel.test('@laborDay / ????-05-05', new Date(2025, 4, 4)).should.be.true;
      Whenzel.test('@laborDay / ????-05-05', new Date(2025, 4, 6)).should.be.false;
    });

    it('should support standalone symbols with deltas', () => {
      debugger;
      Whenzel.test('@valentinesDay-4', new Date(2019, 1, 9)).should.be.false;
      Whenzel.test('@valentinesDay-4', new Date(2019, 1, 10)).should.be.true;
      Whenzel.test('@valentinesDay-4', new Date(2019, 1, 11)).should.be.false;
      Whenzel.test('@valentinesDay-4', new Date(2019, 1, 14)).should.be.false;

      Whenzel.test('@christmas-30', new Date(2019, 10, 24)).should.be.false;
      Whenzel.test('@christmas-30', new Date(2019, 10, 25)).should.be.true;
      Whenzel.test('@christmas-30', new Date(2019, 10, 26)).should.be.false;

      Whenzel.test('@piDay+1', new Date(2019, 2, 14)).should.be.false;
      Whenzel.test('@piDay+1', new Date(2019, 2, 15)).should.be.true;
      Whenzel.test('@piDay+1', new Date(2019, 2, 16)).should.be.false;
    });

    it('should support ranges based on symbols with deltas', () => {

      Whenzel.test('@halloween-15 / @halloween', new Date(2019, 9, 15)).should.be.false;
      Whenzel.test('@halloween-15 / @halloween', new Date(2025, 9, 16)).should.be.true;
      Whenzel.test('@halloween-15 / @halloween', new Date(2019, 9, 26)).should.be.true;
      Whenzel.test('@halloween-15 / @halloween', new Date(2019, 9, 31)).should.be.true;
      Whenzel.test('@halloween-15 / @halloween', new Date(2019, 10, 1)).should.be.false;

      Whenzel.test('@christmasEve-30 / @boxingDay+1', new Date(2019, 10, 23)).should.be.false;
      Whenzel.test('@christmasEve-30 / @boxingDay+1', new Date(2019, 10, 24)).should.be.true;
      Whenzel.test('@christmasEve-30 / @boxingDay+1', new Date(2019, 11, 10)).should.be.true;
      Whenzel.test('@christmasEve-30 / @boxingDay+1', new Date(2019, 11, 26)).should.be.true;
      Whenzel.test('@christmasEve-30 / @boxingDay+1', new Date(2019, 11, 27)).should.be.true;
      Whenzel.test('@christmasEve-30 / @boxingDay+1', new Date(2019, 11, 28)).should.be.false;
    });

    it('should fail if the symbol is not valid', () => {
      const callingWith = (pattern) => (() => Whenzel.test(pattern));
      callingWith('@smellyPoopDay').should.throw();
      callingWith('2019-01-01 / @smellyPoopDay').should.throw();
    });

    it('should fail if the syntax is not valid', () => {
      const callingWith = (pattern) => (() => Whenzel.test(pattern));
      callingWith('@christmas /').should.throw();
      callingWith('@@christmas /').should.throw();
      callingWith('/ @christmas').should.throw();
      callingWith('@christmas+').should.throw();
      callingWith('@christmas++').should.throw();
      callingWith('@christmas+-9').should.throw();
      callingWith('@christmas-').should.throw();
    });
  });
});

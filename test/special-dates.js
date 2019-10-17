require('chai').should();
const Whenzel = require('../');

describe('Whenzel', () => {
  describe('when testing special symbolic dates', () => {
    it('should support @easter', () => {
      Whenzel.test('@easter', new Date(2010, 0, 1)).should.be.false;
      Whenzel.test('@easter', new Date(2010, 3, 4)).should.be.true;
      Whenzel.test('@easter', new Date(2010, 3, 5)).should.be.false;
      Whenzel.test('@easter', new Date(2010, 4, 4)).should.be.false;

      Whenzel.test('@easter-2', new Date(2010, 3, 2)).should.be.true;
      Whenzel.test('@easter-2', new Date(2010, 3, 4)).should.be.false;

      Whenzel.test('@easter', new Date(2018, 3, 1)).should.be.true;
      Whenzel.test('@easter', new Date(2018, 3, 2)).should.be.false;

      Whenzel.test('@easter', new Date(2019, 3, 21)).should.be.true;
      Whenzel.test('@easter', new Date(2020, 3, 12)).should.be.true;
      Whenzel.test('@easter', new Date(2021, 3, 4)).should.be.true;
      Whenzel.test('@easter', new Date(2022, 3, 17)).should.be.true;
      Whenzel.test('@easter', new Date(2023, 3, 9)).should.be.true;
      Whenzel.test('@easter', new Date(2024, 2, 31)).should.be.true;

      Whenzel.test('@easter', new Date(2020, 6, 5)).should.be.false;
      Whenzel.test('@easter', new Date(2024, 8, 5)).should.be.false;

      Whenzel.test('@easter-2 / @easter+2', new Date(2019, 3, 18)).should.be.false;
      Whenzel.test('@easter-2 / @easter+2', new Date(2019, 3, 19)).should.be.true;
      Whenzel.test('@easter-2 / @easter+2', new Date(2019, 3, 20)).should.be.true;
      Whenzel.test('@easter-2 / @easter+2', new Date(2019, 3, 21)).should.be.true;
      Whenzel.test('@easter-2 / @easter+2', new Date(2019, 3, 22)).should.be.true;
      Whenzel.test('@easter-2 / @easter+2', new Date(2019, 3, 23)).should.be.true;
      Whenzel.test('@easter-2 / @easter+2', new Date(2019, 3, 24)).should.be.false;
    });

    it('should support @chineseNewYear', () => {
      Whenzel.test('@chineseNewYear', new Date(2019, 1, 4)).should.be.false;
      Whenzel.test('@chineseNewYear', new Date(2019, 1, 5)).should.be.true;
      Whenzel.test('@chineseNewYear', new Date(2019, 1, 6)).should.be.false;

      Whenzel.test('@chineseNewYear', new Date(2020, 0, 25)).should.be.true;
      Whenzel.test('@chineseNewYear', new Date(2021, 1, 12)).should.be.true;
      Whenzel.test('@chineseNewYear', new Date(2022, 1, 1)).should.be.true;
      Whenzel.test('@chineseNewYear', new Date(2023, 0, 22)).should.be.true;

      Whenzel.test('@chineseNewYear-2', new Date(2023, 0, 19)).should.be.false;
      Whenzel.test('@chineseNewYear-2', new Date(2023, 0, 20)).should.be.true;
      Whenzel.test('@chineseNewYear-2', new Date(2023, 0, 22)).should.be.false;
      Whenzel.test('@chineseNewYear-2', new Date(2023, 0, 23)).should.be.false;

      Whenzel.test('@chineseNewYear-3 / @chineseNewYear+2 ', new Date(2023, 0, 18)).should.be.false;
      Whenzel.test('@chineseNewYear-3 / @chineseNewYear+2 ', new Date(2023, 0, 19)).should.be.true;
      Whenzel.test('@chineseNewYear-3 / @chineseNewYear+2 ', new Date(2023, 0, 24)).should.be.true;
      Whenzel.test('@chineseNewYear-3 / @chineseNewYear+2 ', new Date(2023, 0, 25)).should.be.false;
    }).timeout(10000);

    it('should support @roshHashanah', () => {
      Whenzel.test('@roshHashanah', new Date(2018, 8, 9)).should.be.false;
      Whenzel.test('@roshHashanah', new Date(2018, 8, 10)).should.be.true;
      Whenzel.test('@roshHashanah', new Date(2018, 8, 11)).should.be.false;
      Whenzel.test('@roshHashanah', new Date(2019, 8, 30)).should.be.true;
      Whenzel.test('@roshHashanah', new Date(2020, 8, 19)).should.be.true;
      Whenzel.test('@roshHashanah', new Date(2021, 8, 7)).should.be.true;

      Whenzel.test('@roshHashanah-2 / @roshHashanah+1', new Date(2021, 8, 4)).should.be.false;
      Whenzel.test('@roshHashanah-2 / @roshHashanah+1', new Date(2021, 8, 5)).should.be.true;
      Whenzel.test('@roshHashanah-2 / @roshHashanah+1', new Date(2021, 8, 6)).should.be.true;
      Whenzel.test('@roshHashanah-2 / @roshHashanah+1', new Date(2021, 8, 8)).should.be.true;
      Whenzel.test('@roshHashanah-2 / @roshHashanah+1', new Date(2021, 8, 9)).should.be.false;
    }).timeout(10000);

    it('should support @hanukkah', () => {
      Whenzel.test('@hanukkahStart', new Date(2019, 11, 22)).should.be.false;
      Whenzel.test('@hanukkahStart', new Date(2019, 11, 23)).should.be.true;
      Whenzel.test('@hanukkahStart', new Date(2019, 11, 24)).should.be.false;
      Whenzel.test('@hanukkahStart', new Date(2019, 11, 31)).should.be.false;
      Whenzel.test('@hanukkahStart', new Date(2020, 0, 1)).should.be.false;
    }).timeout(10000);

    it('should support @hanukkah as a range', () => {
      Whenzel.test('@hanukkahStart / @hanukkahEnd', new Date(2021, 10, 28)).should.be.false;
      Whenzel.test('@hanukkahStart / @hanukkahEnd', new Date(2021, 10, 29)).should.be.true;
      Whenzel.test('@hanukkahStart / @hanukkahEnd', new Date(2021, 10, 30)).should.be.true;
      Whenzel.test('@hanukkahStart / @hanukkahEnd', new Date(2021, 11, 6)).should.be.true;
      Whenzel.test('@hanukkahStart / @hanukkahEnd', new Date(2021, 11, 7)).should.be.false;
    }).timeout(10000);

    it('should support @hanukkah as a range when it crosses over', () => {
      Whenzel.test('@hanukkahStart / @hanukkahEnd', new Date(2024, 11, 26)).should.be.true;
      Whenzel.test('@hanukkahStart / @hanukkahEnd', new Date(2024, 11, 31)).should.be.true;
      Whenzel.test('@hanukkahStart / @hanukkahEnd', new Date(2025, 0, 1)).should.be.true;
      Whenzel.test('@hanukkahStart / @hanukkahEnd', new Date(2025, 0, 2)).should.be.true;
      Whenzel.test('@hanukkahStart / @hanukkahEnd', new Date(2025, 0, 3)).should.be.false;
    }).timeout(10000);
  });
});

const easter = require('./special-dates/easter').easter;
const chineseNewYear = require('./special-dates/chinese').chineseNewYear;
const hebrew = require('./special-dates/hebrew');

const symbols = {
  christmasEve: '????-12-24',
  christmas: '????-12-25',
  boxingDay: '????-12-26',
  newYearsEve: '????-12-31',
  newYear: '????-01-01',
  halloween: '????-10-31',
  allSaintsDay: '????-11-01',
  aprilFools: '????-04-01',
  earthDay: '????-04-22',
  valentinesDay: '????-02-14',
  stPatrick: '????-03-17',
  laborDay: '????-05-01',
  piDay: '????-03-14',
  idm: '????-03-14',
  easter,
  chineseNewYear,
  roshHashanah: hebrew.roshHashanah,
  hanukkahStart: hebrew.hanukkahStart,
  hanukkahEnd: hebrew.hanukkahEnd,
};

function lookup(name, date) {
  const value = symbols[name];
  if (value === undefined) {
    throw new Error(`Unknown symbolic date '${name}'`);
  }

  if (typeof value === 'string') {
    return value;
  }
  if (typeof value === 'function') {
    return value(date);
  }

  throw new Error(`Internal error. Symbol '${name}' has an invalid type.`);
}

module.exports = {
  lookup
};

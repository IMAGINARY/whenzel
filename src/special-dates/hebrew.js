const Hebcal = require('hebcal');

function roshHashanahPattern(date) {
  const gdate = new Hebcal.GregYear(date.getFullYear());
  const newYear = gdate.hebyears[gdate.hebyears.length - 1];
  const gregorianDate = gdate.holidays[`1 Tishrei ${newYear}`][0].date.greg();
  return gregorianDate.toISOString().substr(0, 'xxxx-xx-xx'.length);
}

function hanukkahStartPattern(date) {
  // If the reference date is in the first half of the year we're checking for
  // the start of Hannukah from the previous year
  const gdate = new Hebcal.GregYear(date.getMonth() < 5
    ? date.getFullYear() - 1
    : date.getFullYear()
  );
  const newYear = gdate.hebyears[gdate.hebyears.length - 1];
  const gregorianDate = gdate.holidays[`25 Kislev ${newYear}`][0].date.greg();
  return gregorianDate.toISOString().substr(0, 'xxxx-xx-xx'.length);
}

function hanukkahEndPattern(date) {
  // If the reference date is in the first half of the year we're checking for
  // the end of Hannukah from the previous year
  const gdate = new Hebcal.GregYear(date.getMonth() < 5
    ? date.getFullYear() - 1
    : date.getFullYear()
  );
  const hyear = gdate.hebyears[gdate.hebyears.length - 1];

  const year = new Hebcal(hyear);
  // Hanukkah might end on 2 or 3 of Tevet depending on whether Kislev has 29 or 30 days
  const endDay = year.months[8].length === 30 ? 2 : 3;
  const gregorianDate = year.holidays[`${endDay} Tevet ${hyear}`][0].date.greg();
  return gregorianDate.toISOString().substr(0, 'xxxx-xx-xx'.length);
}

module.exports = {
  roshHashanah: roshHashanahPattern,
  hanukkahStart: hanukkahStartPattern,
  hanukkahEnd: hanukkahEndPattern,
};

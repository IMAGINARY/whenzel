const CalendarChinese = require('date-chinese').CalendarChinese;

function chineseNewYearPattern(date) {
  const cal = new CalendarChinese();
  const newYear = cal.fromJDE(cal.newYear(date.getFullYear())).toGregorian();
  const asDate = new Date(newYear.year, newYear.month - 1, newYear.day);
  return asDate.toISOString().substr(0, 'xxxx-xx-xx'.length);
}

module.exports = {
  chineseNewYear: chineseNewYearPattern
};

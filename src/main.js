function validateDatePattern(pattern, context='') {
  const matches = pattern.match(/^(\?\?\?\?|\d\d\d\d)-(\?\?|\d\d)-(\?\?|\d\d)$/);
  if (matches === null) {
    throw new Error(`Invalid test pattern '${pattern}'${context}`);
  }
  if (Number(matches[2]) < 1 || Number(matches[2]) > 12) {
    throw new Error(`Invalid month in ISO date '${pattern}'${context}`);
  }
  if (Number(matches[3]) < 1 || Number(matches[3]) > 31) {
    throw new Error(`Invalid day in ISO date '${pattern}'${context}`);
  }
}

function buildBounds(patternFrom, patternTo, date) {
  const YEAR=0, MONTH=1, DAY=2;
  const isoDate = date.toISOString().substr(0, 'xxxx-xx-xx'.length);
  const dateParts = isoDate.split('-');
  const fromParts = patternFrom.split('-');
  const toParts = patternTo.split('-');
  const lowerParts = ['', '', ''];
  const upperParts = ['', '', ''];

  const monthRollover = (fromParts[DAY] !== '??' && toParts[DAY] !== '??' && fromParts[DAY] > toParts[DAY]);
  const yearRollover = (fromParts[MONTH] !== '??' && toParts[MONTH] !== '??'
    && (
      fromParts[MONTH] > toParts[MONTH]
      || (fromParts[MONTH] === toParts[MONTH] && monthRollover)
    )
  );

  const fromDate = new Date(date);
  const toDate = new Date(date);
  if (yearRollover) {
    if (dateParts[MONTH] < fromParts[MONTH]
      || (dateParts[MONTH] === fromParts[MONTH] && fromParts[DAY] !== '??' && dateParts[DAY] < fromParts[DAY])) {
      fromDate.setFullYear(fromDate.getFullYear() - 1);
    } else {
      toDate.setFullYear(toDate.getFullYear() + 1);
    }
  } else if (monthRollover) {
    if (dateParts[DAY] < fromParts[DAY]) {
      fromDate.setMonth( fromDate.getMonth() - 1);
    } else {
      toDate.setMonth( toDate.getMonth() + 1);
    }
  }

  const isoToDate = toDate.toISOString().substr(0, 'xxxx-xx-xx'.length);
  const toDatePars = isoToDate.split('-');
  const isoFromDate = fromDate.toISOString().substr(0, 'xxxx-xx-xx'.length);
  const fromDatePars = isoFromDate.split('-');

  lowerParts[DAY] = (fromParts[DAY] === '??' ? fromDatePars[DAY] : fromParts[DAY]);
  lowerParts[MONTH] = (fromParts[MONTH] === '??' ? fromDatePars[MONTH] : fromParts[MONTH]);
  lowerParts[YEAR] = (fromParts[YEAR] === '????' ? fromDatePars[YEAR] : fromParts[YEAR]);

  upperParts[DAY] = (toParts[DAY] === '??' ? toDatePars[DAY] : toParts[DAY]);
  upperParts[MONTH] = (toParts[MONTH] === '??' ? toDatePars[MONTH] : toParts[MONTH]);
  upperParts[YEAR] = (toParts[YEAR] === '????' ? toDatePars[YEAR] : toParts[YEAR]);

  return [lowerParts.join('-'), upperParts.join('-')];
}

function testDate(pattern, date = new Date()) {
  validateDatePattern(pattern);
  const re = new RegExp(`^${pattern}$`.replace(/\?/g, '\\d'));

  const isoDate = date.toISOString().substr(0, 'xxxx-xx-xx'.length);
  return isoDate.match(re) !== null;
}

function testDateRange(patternFrom, patternTo, date = new Date()) {

  validateDatePattern(patternFrom, ' on left side of date range');
  validateDatePattern(patternTo, ' on right side of date range');

  const bounds = buildBounds(patternFrom, patternTo, date);

  const isoDate = date.toISOString().substr(0, 'xxxx-xx-xx'.length);
  return isoDate >= bounds[0] && isoDate <= bounds[1];
}

function test(pattern, date = new Date()) {
  const rangeParts = pattern.split('/');
  if (rangeParts.length === 1) {
    return testDate(pattern.trim(), date);
  } else {
    return testDateRange(rangeParts[0].trim(), rangeParts[1].trim(), date);
  }
}

module.exports = {
  test
};

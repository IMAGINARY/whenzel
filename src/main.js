const WhenzelSymbols = require('./symbols');
const WhenzelFilters = require('./filters');

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

function resolveExpression(expression, date) {
  if (expression.length < 2) {
    return expression;
  }

  if (expression[0] === '@') {
    const matches = expression.match(/^@([a-zA-Z0-9]+)\s*([\+\-]\s*\d{1,3})?$/);
    if (matches === null) {
      throw new Error(`Invalid expression: '${expression}'`)
    }
    let deltaSign = 1;
    let delta = 0;
    if (matches[2] !== undefined) {
      deltaSign = (matches[2][0] === '-' ? -1 : 1);
      delta = Number(matches[2].substr(1));
    }

    return resolveSymbol(matches[1], date, deltaSign * delta);
  }

  return expression;
}

function resolveSymbol(name, date, delta) {

  let pattern = WhenzelSymbols.lookup(name, date);
  if (delta !== 0) {
    const patternParts = pattern.split('-');
    const shiftedDate = new Date(date);
    if (patternParts[0] !== '????') {
      shiftedDate.setFullYear(Number(patternParts[0]));
    }
    if (patternParts[1] !== '??') {
      shiftedDate.setMonth(Number(patternParts[1]) - 1);
    }
    if (patternParts[2] !== '??') {
      shiftedDate.setDate(Number(patternParts[2]));
    }
    shiftedDate.setDate(shiftedDate.getDate() + delta);
    const isoDate = shiftedDate.toISOString().substr(0, 'xxxx-xx-xx'.length);
    const isoDateParts = isoDate.split('-');
    return [
      patternParts[0] === '????' ? patternParts[0] : isoDateParts[0],
      isoDateParts[1] === '??' ? patternParts[1] : isoDateParts[1],
      isoDateParts[2] === '??' ? patternParts[2] : isoDateParts[2],
    ].join('-')
  }
  return pattern;
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

function dateSelector(pattern, date) {
  const rangeParts = pattern.split('/');
  if (rangeParts.length === 1) {
    return testDate(
      resolveExpression(pattern.trim(), date),
      date
    );
  } else {
    return testDateRange(
      resolveExpression(rangeParts[0].trim(), date),
      resolveExpression(rangeParts[1].trim(), date),
      date
    );
  }
}

function test(pattern, date = new Date()) {
  const patternParts = pattern.match(/^([^#]*)?\s*(#.+)?$/);
  if (patternParts === null) {
    throw new Error(`Invalid test pattern '${pattern}'`);
  }
  const selectors = [];
  if (patternParts[1] !== undefined) {
    selectors.push((d) => { return dateSelector(patternParts[1].trim(), d); });
  }
  if (patternParts[2] !== undefined) {
    const filterSelectors = patternParts[2].trim(). split(/\s+/);
    filterSelectors.forEach((filterSelector) => {
      if (filterSelector.substr(0, 1) !== '#') {
        throw new Error(`Unexpected '${filterSelector}' in pattern`);
      }
      const filter = WhenzelFilters.lookup(filterSelector.substr(1));
      selectors.push(d => filter(d));
    });
  }

  return selectors.every(selector => selector(date));
}

module.exports = {
  test
};

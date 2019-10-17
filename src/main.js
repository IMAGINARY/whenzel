const WhenzelSymbols = require('./symbols');
const WhenzelFilters = require('./filters');

const YEAR=0, MONTH=1, DAY=2;

/**
 * Checks whether a date pattern is valid and throws exceptions if it isn't
 *
 * @param {string} pattern
 * @param {string} context
 *   Context in which the check is being performed, which will be added to the
 *   exception error message.
 * @throws {Error}
 */
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

/**
 * Replaces the parts of a parsed ISO date that contain wildcards to the
 * actual year, month or day of the passed date.
 *
 * @param {[string, string, string]} patternParts
 *  An array containing year, month and day from a parsed ISO date or wildcards.
 * @param {Date} date
 * @return {string}
 *  A date in ISO format (yyyy-mm-dd)
 */
function replaceWildcards(patternParts, date) {
  const isoDate = date.toISOString().substr(0, 'xxxx-xx-xx'.length);
  const dateParts = isoDate.split('-');

  const resultParts = ['', '', ''];
  resultParts[DAY] = (patternParts[DAY] === '??' ? dateParts[DAY] : patternParts[DAY]);
  resultParts[MONTH] = (patternParts[MONTH] === '??' ? dateParts[MONTH] : patternParts[MONTH]);
  resultParts[YEAR] = (patternParts[YEAR] === '????' ? dateParts[YEAR] : patternParts[YEAR]);

  return resultParts.join('-');
}

/**
 * Converts to date patterns into actual bounds relative to a date.
 *
 * Patterns with wildcards can specify bounds that roll over to the next or previous
 * year (e.g. ????-12-01 / ????-03-01) or month (????-??-30 / ????-??-05). This function
 * checks if the patterns roll over and modifies the patterns with wildcards to
 * actual lower and upper bound dates relative to the date being checked to allow for
 * straightforward testing.
 *
 * @param {string} patternFrom
 * @param {string} patternTo
 * @param {Date} date
 * @return {[string, string]}
 * @throws {Error}
 *  An array where the first element is the lower bound and the second is the upper bound.
 */
function buildBounds(patternFrom, patternTo, date) {
  const isoDate = date.toISOString().substr(0, 'xxxx-xx-xx'.length);
  const dateParts = isoDate.split('-');
  const fromParts = patternFrom.split('-');
  const toParts = patternTo.split('-');

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
  } else if (monthRollover && fromParts[MONTH] === '??' && toParts[MONTH] === '??') {
    if (dateParts[DAY] < fromParts[DAY]) {
      fromDate.setMonth( fromDate.getMonth() - 1);
    } else {
      toDate.setMonth( toDate.getMonth() + 1);
    }
  }

  return [replaceWildcards(fromParts, fromDate), replaceWildcards(toParts, toDate)];
}

/**
 * Expands an expression by processing any symbols in it
 *
 * @param {string} expression
 * @param {Date} date
 * @return {string}
 * @throws {Error}
 */
function resolveExpression(expression, date) {
  if (expression.length < 2) {
    return expression;
  }

  if (expression[0] === '@') {
    const matches = expression.match(/^@([a-zA-Z0-9]+)\s*([+\-]\s*\d{1,3})?$/);
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

/**
 * Converts a symbolic date to a date pattern.
 *
 * Looks up the symbolic date in the table and converts it to a date pattern by applying
 * the specified delta.
 *
 * @param {string} name
 *  Name of the symbol
 * @param {Date} date
 * @param {Number} delta
 *  Number of days to deviate from the symbolic date
 * @return {string}
 * @throws {Error}
 */
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

/**
 * Returns true if the date matches the date pattern
 *
 * @param {string} pattern
 * @param {Date} date
 * @return {boolean}
 * @throws {Error}
 */
function testDate(pattern, date = new Date()) {
  validateDatePattern(pattern);
  const re = new RegExp(`^${pattern}$`.replace(/\?/g, '\\d'));

  const isoDate = date.toISOString().substr(0, 'xxxx-xx-xx'.length);
  return isoDate.match(re) !== null;
}

/**
 * Returns true if a date is within a range defined by two date patterns
 *
 * @param {string} patternFrom
 * @param {string} patternTo
 * @param {Date} date
 * @return {boolean}
 * @throws {Error}
 */
function testDateRange(patternFrom, patternTo, date = new Date()) {

  validateDatePattern(patternFrom, ' on left side of date range');
  validateDatePattern(patternTo, ' on right side of date range');

  const bounds = buildBounds(patternFrom, patternTo, date);

  const isoDate = date.toISOString().substr(0, 'xxxx-xx-xx'.length);
  return isoDate >= bounds[0] && isoDate <= bounds[1];
}

/**
 * Returns true if a date matches a date selector pattern (date, symbolic date or date range)
 *
 * @param {string} pattern
 * @param {Date} date
 * @return {boolean}
 * @throws {Error}
 */
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

/**
 * Returns true if date matches a selector pattern
 *
 * See README for pattern syntax.
 *
 * @param {string} pattern
 * @param {Date} date
 * @return {boolean}
 * @throws {Error}
 */
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

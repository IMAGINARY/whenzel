(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Whenzel = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

function validateDatePattern(pattern) {
  var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var matches = pattern.match(/^(\?\?\?\?|\d\d\d\d)-(\?\?|\d\d)-(\?\?|\d\d)$/);

  if (matches === null) {
    throw new Error("Invalid test pattern '".concat(pattern, "'").concat(context));
  }

  if (Number(matches[2]) < 1 || Number(matches[2]) > 12) {
    throw new Error("Invalid month in ISO date '".concat(pattern, "'").concat(context));
  }

  if (Number(matches[3]) < 1 || Number(matches[3]) > 31) {
    throw new Error("Invalid day in ISO date '".concat(pattern, "'").concat(context));
  }
}

function buildBounds(patternFrom, patternTo, date) {
  var YEAR = 0,
      MONTH = 1,
      DAY = 2;
  var isoDate = date.toISOString().substr(0, 'xxxx-xx-xx'.length);
  var dateParts = isoDate.split('-');
  var fromParts = patternFrom.split('-');
  var toParts = patternTo.split('-');
  var lowerParts = ['', '', ''];
  var upperParts = ['', '', ''];
  var monthRollover = fromParts[DAY] !== '??' && toParts[DAY] !== '??' && fromParts[DAY] > toParts[DAY];
  var yearRollover = fromParts[MONTH] !== '??' && toParts[MONTH] !== '??' && (fromParts[MONTH] > toParts[MONTH] || fromParts[MONTH] === toParts[MONTH] && monthRollover);
  var fromDate = new Date(date);
  var toDate = new Date(date);

  if (yearRollover) {
    if (dateParts[MONTH] < fromParts[MONTH] || dateParts[MONTH] === fromParts[MONTH] && fromParts[DAY] !== '??' && dateParts[DAY] < fromParts[DAY]) {
      fromDate.setFullYear(fromDate.getFullYear() - 1);
    } else {
      toDate.setFullYear(toDate.getFullYear() + 1);
    }
  } else if (monthRollover) {
    if (dateParts[DAY] < fromParts[DAY]) {
      fromDate.setMonth(fromDate.getMonth() - 1);
    } else {
      toDate.setMonth(toDate.getMonth() + 1);
    }
  }

  var isoToDate = toDate.toISOString().substr(0, 'xxxx-xx-xx'.length);
  var toDatePars = isoToDate.split('-');
  var isoFromDate = fromDate.toISOString().substr(0, 'xxxx-xx-xx'.length);
  var fromDatePars = isoFromDate.split('-');
  lowerParts[DAY] = fromParts[DAY] === '??' ? fromDatePars[DAY] : fromParts[DAY];
  lowerParts[MONTH] = fromParts[MONTH] === '??' ? fromDatePars[MONTH] : fromParts[MONTH];
  lowerParts[YEAR] = fromParts[YEAR] === '????' ? fromDatePars[YEAR] : fromParts[YEAR];
  upperParts[DAY] = toParts[DAY] === '??' ? toDatePars[DAY] : toParts[DAY];
  upperParts[MONTH] = toParts[MONTH] === '??' ? toDatePars[MONTH] : toParts[MONTH];
  upperParts[YEAR] = toParts[YEAR] === '????' ? toDatePars[YEAR] : toParts[YEAR];
  return [lowerParts.join('-'), upperParts.join('-')];
}

function testDate(pattern) {
  var date = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Date();
  validateDatePattern(pattern);
  var re = new RegExp("^".concat(pattern, "$").replace(/\?/g, '\\d'));
  var isoDate = date.toISOString().substr(0, 'xxxx-xx-xx'.length);
  return isoDate.match(re) !== null;
}

function testDateRange(patternFrom, patternTo) {
  var date = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new Date();
  validateDatePattern(patternFrom, ' on left side of date range');
  validateDatePattern(patternTo, ' on right side of date range');
  var bounds = buildBounds(patternFrom, patternTo, date);
  var isoDate = date.toISOString().substr(0, 'xxxx-xx-xx'.length);
  return isoDate >= bounds[0] && isoDate <= bounds[1];
}

function test(pattern) {
  var date = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Date();
  var rangeParts = pattern.split('/');

  if (rangeParts.length === 1) {
    return testDate(pattern.trim(), date);
  } else {
    return testDateRange(rangeParts[0].trim(), rangeParts[1].trim(), date);
  }
}

module.exports = {
  test: test
};

},{}]},{},[1])(1)
});

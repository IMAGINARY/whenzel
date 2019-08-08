(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Whenzel = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

function test(pattern) {
  var date = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Date();
  var isoDate = date.toISOString();
  var matches = pattern.match(/^(\d\d\d\d)-(\d\d)-(\d\d)$/);

  if (matches === null) {
    throw new Error("Invalid ISO date '".concat(pattern, "'"));
  }

  if (Number(matches[2]) < 1 || Number(matches[2]) > 12) {
    throw new Error("Invalid month in ISO date '".concat(pattern, "'"));
  }

  if (Number(matches[3]) < 1 || Number(matches[3]) > 31) {
    throw new Error("Invalid day in ISO date '".concat(pattern, "'"));
  }

  return isoDate.substr(0, pattern.length) === pattern;
}

module.exports = {
  test: test
};

},{}]},{},[1])(1)
});

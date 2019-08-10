var easter = require('date-easter')

function easterPattern(date) {
  return easter.easter(date.getFullYear()).toString();
}

module.exports = {
  easter: easterPattern
};

function test(pattern, date = new Date()) {
  const isoDate = date.toISOString().substr(0, 'xxxx-xx-xx'.length);

  const matches = pattern.match(/^(\?\?\?\?|\d\d\d\d)-(\?\?|\d\d)-(\?\?|\d\d)$/);
  if (matches === null) {
    throw new Error(`Invalid test pattern '${pattern}'`);
  }
  if (Number(matches[2]) < 1 || Number(matches[2]) > 12) {
    throw new Error(`Invalid month in ISO date '${pattern}'`);
  }
  if (Number(matches[3]) < 1 || Number(matches[3]) > 31) {
    throw new Error(`Invalid day in ISO date '${pattern}'`);
  }

  const re = new RegExp(`^${pattern}$`.replace(/\?/g, '\\d'));

  return isoDate.match(re) !== null;
}

module.exports = {
  test
};

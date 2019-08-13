const Whenzel = require('../');

const defaultConfig = {
  background: 'blue',
  picture: 'bird',
  song: 'happyBirthday',
  character: 'mario',
};

const cfgOverrides = [
  {
    when: '????-12-01 / ????-12-31',
    picture: 'flower',
    background: 'pink',
  },
  {
    when: '@christmas',
    song: 'jingleBells',
    picture: 'tree',
  },
  {
    when: '@easter',
    character: 'rabbit',
    picture: 'egg'
  },
];

const today = new Date(2019, 11, 25); // Christmas

const activeOverrides = cfgOverrides.filter(override => Whenzel.test(override.when, today));
const config = Object.assign({}, defaultConfig, ...activeOverrides);
console.log(config);

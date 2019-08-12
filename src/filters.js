function saturdaysBefore(d) {
  const i = new Date(d);
  let saturdays = 0;
  i.setDate(i.getDate() - 1);
  while(i.getMonth() === d.getMonth()) {
    if (i.getDay() === 6) {
      saturdays += 1;
    }
    i.setDate(i.getDate() - 1);
  }
  return saturdays;
}

const filters = {
  monday: d => d.getDay() === 1,
  tuesday: d => d.getDay() === 2,
  wednesday: d => d.getDay() === 3,
  thursday: d => d.getDay() === 4,
  friday: d => d.getDay() === 5,
  saturday: d => d.getDay() === 6,
  sunday: d => d.getDay() === 0,
  weekday: d => d.getDay() !== 6 && d.getDay() !== 0,
  weekend: d => d.getDay() === 6 || d.getDay() === 0,
  week1: d => saturdaysBefore(d) === 0,
  week2: d => saturdaysBefore(d) === 1,
  week3: d => saturdaysBefore(d) === 2,
  week4: d => saturdaysBefore(d) === 3,
  week5: d => saturdaysBefore(d) === 4,
  week6: d => saturdaysBefore(d) === 5,
  firstDayOfMonth: d => d.getDate() === 1,
  lastDayOfMonth: d => {
    const next = new Date(d);
    next.setDate(next.getDate() + 1);
    return next.getDate() === 1;
  },
  leapDay: d => d.getMonth() === 1 && d.getDate() === 29,
  pythagoras: d => Math.pow(d.getFullYear() % 100, 2) === Math.pow(d.getDate(), 2) + Math.pow(d.getMonth() + 1, 2),
  always: d => true,
  never: d => false
};

function lookup(name) {
  const value = filters[name];
  if (value === undefined) {
    throw new Error(`Unknown filter '${name}'`);
  }

  return value;
}

module.exports = {
  lookup
};

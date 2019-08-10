# whenzel
A JS library for checking dates of recurring events and holidays

The purpose of this library is allowing to filter data that is associated with specific dates,
partial dates (e.g. month-year), holidays, days of the week, etc. by checking against particular
dates. It was developed for filtering lists of MOTDs, special announcements and config files
that override settings depending on the time of the year.

## How to use it

Whenzel can be used in node.js:

```
const Whenzel = require('whenzel');
```

or in a browser via the global `Whenzel`.

## Checking dates

### Exact dates

```
const todayIsChristmas2019 = Whenzel.test('2019-12-25');
``` 

## Recurring dates

```
const todayIsChristmas = Whenzel.test('????-12-25');
const todayIsTheFirst = Whenzel.test('????-??-01');
``` 

You can replace any (or all) of the parts of the date by question marks to match any year, month or day. You
must use four question marks for the year (`????`) or two question marks for the month or day (`??`). It's not
possible to use a partial pattern such as `20??` or `1?`.

## Date ranges

```
const inSummer2018 = Whenzel.test('2019-06-21 / 2018-09-23');
const inSummer = Whenzel.test('????-06-21 / ????-09-23');
const inJanuary = Whenzel.test('????-01-01 / ????-01-31');
const first5Days = Whenzel.test('????-??-01 / ????-??-05');
```

Use `/` to separate two dates (complete or partial) to match either of them  or any day in between.

It's also possible to match any date below or over a date:

```
const beforeChristmas2019 = Whenzel.test('????-??-?? / 2019-12-25');
const afterChristmas2019 = Whenzel.test('2019-12-26 / ????-??-??');
const 2019BeforeMay =  Whenzel.test('2019-??-?? / 2019-05-01');
```

Range matching supports rollover:

```
const itsWinter = Whenzel.test('????-12-21 / ????-03-21');
const not5to10 = Whenzel.test('????-??-10 / ????-??-05');
```

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

## Symbolic dates

The library allows using symbolic names for certain holidays and moments of the year:

```
const todayIsChristmas = Whenzel.test('@christmas');
```

A delta (in days) can also be specified:

```
const aroundChristmas = Whenzel.test('@christmas-3 / @christmas+3');
```

**NOTE**: Deltas are calculated based on the year being checked, which might cause a difference depending on
whether it's a leap year or not. Thus, it's possible to get a range that's off by one when using deltas in 
ranges that begin on one year and end on the next. Don't use this library to operate nuclear facilities, 
petroleum extraction platforms, yada yada yada.

The list of available symbols is:

- @christmasEve
- @christmas
- @boxingDay

- @newYearsEve
- @newYear

- @halloween
- @allSaintsDay
- @aprilFools
- @earthDay
- @valentinesDay
- @stPatrick
- @laborDay
- @piDay (3/14)
- @idm (International Day of Mathematics)

and even some events that change date every year (these are calculated according to the date being checked):

- @easter
- @chineseNewYear
- @roshHashanah
- @hanukkahStart
- @hanukkahEnd

**NOTE**: Although these symbolic names can be used in ranges, they're resolved against the date
being checked: so ranges that wrap around from one year to the next will be considered empty. When
checking hannukkah use `@hannukahStart / @hannukahEnd` instead of a delta for this very reason.

## Filters

Filters allow seeing if the date matches special conditions that go beyond what patterns and ranges can
express. They can be used on their own or combined with other patterns. Place filters separated by
spaces after any pattern.

```
const itsMonday = Whenzel.test('#monday');
const firstSunday = Whenzel.test('#sunday #week1');
const mondaysInJanuary =  Whenzel.test('????-01-01 / ????-01-31 #monday');
```

Available filters are:

- #monday
- #tuesday
- #wednesday
- #thursday
- #friday
- #saturday
- #sunday

- #weekday
- #weekend

- #week1
- #week2
- #week3
- #week4
- #week5
- #week6

- #firstDayOfMonth
- #lastDayOfMonth

- #leapDay (matches the 29th of february)
- #pythagoras (matches if year^2 = month^2 + day^2)

- #always
- #never

### Errors

If Whenzel finds an error in the expression being tested it'll throw an exception with a description of the
problem found. 

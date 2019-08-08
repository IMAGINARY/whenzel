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
const todayIsChristmas = Whenzel.test('2019-12-25');
``` 

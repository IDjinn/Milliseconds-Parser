# Milliseconds-Parser

Easily convert durations to milliseconds.

## Example

```js
const ms = require('milliseconds-parser')();

let duration = ms.parse('3 hours and 25 minutes');
```

### Feat: Languages

You can add support to others languages, need only give aliases in your language for default milliseconds keys
```json
{
    "year": ["year", "years", "y"],
    "month": ["month", "months"],
    "week": ["week", "weeks", "w"],
    "day": ["day", "days", "d"],
    "hour": ["hour", "hours", "h"],
    "minute": ["minute", "minutes", "min", "mins", "m"],
    "second": ["second", "seconds", "sec", "secs", "s"],
    "millisecond": ["millisecond", "milliseconds", "milli", "millis", "ms"]
}
```

Example custom language:
```js
const json = null; // you json here...
const ms = require('milliseconds-parser')(json);

let duration = ms.parse('3 hours and 25 minutes');
```
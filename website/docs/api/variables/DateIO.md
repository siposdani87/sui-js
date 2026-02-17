# Variable: DateIO

> `const` **DateIO**: `object`

Defined in: [utils/dateio.ts:114](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/utils/dateio.ts#L114)

Locale-aware date utility namespace wrapping date-fns functions.

All formatting operations respect the locale set via
[setDateIOLocale](../functions/setDateIOLocale.md). Legacy format tokens are automatically
converted through [convertToISOFormat](../functions/convertToISOFormat.md).

## Type Declaration

### addDays()

> **addDays**: (`date`, `amount`) => `Date`

Adds the specified number of days to the given date.

#### Parameters

##### date

`Date`

The original date.

##### amount

`number`

The number of days to add.

#### Returns

`Date`

A new Date with the days added.

### addHours()

> **addHours**: (`date`, `amount`) => `Date`

Adds the specified number of hours to the given date.

#### Parameters

##### date

`Date`

The original date.

##### amount

`number`

The number of hours to add.

#### Returns

`Date`

A new Date with the hours added.

### addMinutes()

> **addMinutes**: (`date`, `amount`) => `Date`

Adds the specified number of minutes to the given date.

#### Parameters

##### date

`Date`

The original date.

##### amount

`number`

The number of minutes to add.

#### Returns

`Date`

A new Date with the minutes added.

### addMonths()

> **addMonths**: (`date`, `amount`) => `Date`

Adds the specified number of months to the given date.

#### Parameters

##### date

`Date`

The original date.

##### amount

`number`

The number of months to add.

#### Returns

`Date`

A new Date with the months added.

### addYears()

> **addYears**: (`date`, `amount`) => `Date`

Adds the specified number of years to the given date.

#### Parameters

##### date

`Date`

The original date.

##### amount

`number`

The number of years to add.

#### Returns

`Date`

A new Date with the years added.

### endOfMonth()

> **endOfMonth**: (`date`) => `Date`

Returns the end of the month for the given date.

#### Parameters

##### date

`Date`

The reference date.

#### Returns

`Date`

A new Date set to the last moment of the month.

### format()

> **format**: (`date`, `formatString?`) => `string`

Formats a `Date` object into a string.

When `formatString` is provided, the date is formatted using the
current locale and that pattern. Otherwise, returns an ISO 8601 string.

#### Parameters

##### date

`Date`

The date to format.

##### formatString?

`string`

Optional format pattern (e.g. `'yyyy-MM-dd'`).

#### Returns

`string`

The formatted date string.

#### Example

```ts
DateIO.format(new Date(), 'yyyy-MM-dd'); // '2024-06-15'
DateIO.format(new Date()); // '2024-06-15T12:00:00+02:00'
```

### getDate()

> **getDate**: (`date`) => `number`

Returns the day-of-month of the given date.

#### Parameters

##### date

`Date`

The date to extract the day from.

#### Returns

`number`

The day of the month (1-31).

### getDay()

> **getDay**: (`date`) => `number`

Returns the day of the week for the given date.

#### Parameters

##### date

`Date`

The date to extract the weekday from.

#### Returns

`number`

The day of the week (0 = Sunday, 6 = Saturday).

### getDaysInMonth()

> **getDaysInMonth**: (`date`) => `number`

Returns the number of days in the month of the given date.

#### Parameters

##### date

`Date`

The reference date.

#### Returns

`number`

The total number of days in that month.

### getHours()

> **getHours**: (`date`) => `number`

Returns the hours of the given date.

#### Parameters

##### date

`Date`

The date to extract hours from.

#### Returns

`number`

The hours component (0-23).

### getISOWeek()

> **getISOWeek**: (`date`) => `number`

Returns the ISO week number for the given date.

#### Parameters

##### date

`Date`

The reference date.

#### Returns

`number`

The ISO 8601 week number (1-53).

### getMinutes()

> **getMinutes**: (`date`) => `number`

Returns the minutes of the given date.

#### Parameters

##### date

`Date`

The date to extract minutes from.

#### Returns

`number`

The minutes component (0-59).

### getMonth()

> **getMonth**: (`date`) => `number`

Returns the month of the given date (0-indexed).

#### Parameters

##### date

`Date`

The date to extract the month from.

#### Returns

`number`

The month (0 = January, 11 = December).

### getWeek()

> **getWeek**: (`date`) => `number`

Returns the locale-aware week number for the given date.

#### Parameters

##### date

`Date`

The reference date.

#### Returns

`number`

The week number according to locale rules.

### getYear()

> **getYear**: (`date`) => `number`

Returns the full year of the given date.

#### Parameters

##### date

`Date`

The date to extract the year from.

#### Returns

`number`

The four-digit year.

### isAfter()

> **isAfter**: (`date`, `dateToCompare`) => `boolean`

Tests whether `date` is after `dateToCompare`.

#### Parameters

##### date

`Date`

The date to check.

##### dateToCompare

`Date`

The date to compare against.

#### Returns

`boolean`

`true` if `date` is after `dateToCompare`.

### isBefore()

> **isBefore**: (`date`, `dateToCompare`) => `boolean`

Tests whether `date` is before `dateToCompare`.

#### Parameters

##### date

`Date`

The date to check.

##### dateToCompare

`Date`

The date to compare against.

#### Returns

`boolean`

`true` if `date` is before `dateToCompare`.

### parse()

> **parse**: (`dateString`, `formatString?`) => `Date`

Parses a date string into a `Date` object.

When `formatString` is provided, the string is parsed according to
that format (with legacy token conversion). Otherwise, the string is
parsed as an ISO 8601 date. Returns the current date if parsing fails.

#### Parameters

##### dateString?

The date value to parse. Defaults to the current
  ISO timestamp.

`string` | `number`

##### formatString?

`string`

Optional format pattern (e.g. `'yyyy-MM-dd'`).

#### Returns

`Date`

The parsed Date, or the current date on error.

#### Example

```ts
DateIO.parse('2024-06-15');
DateIO.parse('15/06/2024', 'dd/MM/yyyy');
```

### setDate()

> **setDate**: (`date`, `day`) => `Date`

Sets the day-of-month on the given date, returning a new Date.

#### Parameters

##### date

`Date`

The original date.

##### day

`number`

The day-of-month value to set (1-31).

#### Returns

`Date`

A new Date with the updated day.

### setHours()

> **setHours**: (`date`, `hours`) => `Date`

Sets the hours on the given date, returning a new Date.

#### Parameters

##### date

`Date`

The original date.

##### hours

`number`

The hours value to set (0-23).

#### Returns

`Date`

A new Date with the updated hours.

### setMinutes()

> **setMinutes**: (`date`, `minutes`) => `Date`

Sets the minutes on the given date, returning a new Date.

#### Parameters

##### date

`Date`

The original date.

##### minutes

`number`

The minutes value to set (0-59).

#### Returns

`Date`

A new Date with the updated minutes.

### setMonth()

> **setMonth**: (`date`, `month`) => `Date`

Sets the month on the given date, returning a new Date.

#### Parameters

##### date

`Date`

The original date.

##### month

`number`

The month value to set (0 = January, 11 = December).

#### Returns

`Date`

A new Date with the updated month.

### setYear()

> **setYear**: (`date`, `years`) => `Date`

Sets the year on the given date, returning a new Date.

#### Parameters

##### date

`Date`

The original date.

##### years

`number`

The year value to set.

#### Returns

`Date`

A new Date with the updated year.

### startOfWeek()

> **startOfWeek**: (`date`) => `Date`

Returns the start of the week for the given date.

#### Parameters

##### date

`Date`

The reference date.

#### Returns

`Date`

A new Date set to the start of the week.

### subDays()

> **subDays**: (`date`, `amount`) => `Date`

Subtracts the specified number of days from the given date.

#### Parameters

##### date

`Date`

The original date.

##### amount

`number`

The number of days to subtract.

#### Returns

`Date`

A new Date with the days subtracted.

### subHours()

> **subHours**: (`date`, `amount`) => `Date`

Subtracts the specified number of hours from the given date.

#### Parameters

##### date

`Date`

The original date.

##### amount

`number`

The number of hours to subtract.

#### Returns

`Date`

A new Date with the hours subtracted.

### subMinutes()

> **subMinutes**: (`date`, `amount`) => `Date`

Subtracts the specified number of minutes from the given date.

#### Parameters

##### date

`Date`

The original date.

##### amount

`number`

The number of minutes to subtract.

#### Returns

`Date`

A new Date with the minutes subtracted.

### subMonths()

> **subMonths**: (`date`, `amount`) => `Date`

Subtracts the specified number of months from the given date.

#### Parameters

##### date

`Date`

The original date.

##### amount

`number`

The number of months to subtract.

#### Returns

`Date`

A new Date with the months subtracted.

### subYears()

> **subYears**: (`date`, `amount`) => `Date`

Subtracts the specified number of years from the given date.

#### Parameters

##### date

`Date`

The original date.

##### amount

`number`

The number of years to subtract.

#### Returns

`Date`

A new Date with the years subtracted.

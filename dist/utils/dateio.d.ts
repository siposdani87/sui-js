/**
 * @module dateio
 *
 * Locale-aware date utility module built on top of date-fns.
 *
 * Provides a unified {@link DateIO} namespace for parsing, formatting,
 * comparing, and manipulating dates while respecting a globally configured
 * locale. Legacy format tokens (e.g. `YYYY`, `D`) are automatically
 * converted to date-fns-compatible equivalents.
 *
 * @category Utility
 */
/**
 * Sets the global locale used by all {@link DateIO} formatting and
 * parsing methods.
 *
 * Call this once during application bootstrap to ensure dates are
 * rendered in the correct language and regional format.
 *
 * @param newLocale - BCP 47 locale identifier (e.g. `'hu-HU'`, `'en-US'`).
 * @category Utility
 *
 * @example
 * setDateIOLocale('hu-HU');
 */
export declare const setDateIOLocale: (newLocale: string) => void;
/**
 * Converts legacy date format tokens to date-fns-compatible format strings.
 *
 * Replaces `YYYY` with `yyyy` and every `D` with `d` so that format strings
 * authored for Moment.js or similar libraries work with date-fns.
 *
 * @param formatString - A date format string that may contain legacy tokens.
 * @returns The format string with legacy tokens replaced.
 * @category Utility
 *
 * @example
 * convertToISOFormat('YYYY-MM-DD'); // 'yyyy-MM-dd'
 */
export declare const convertToISOFormat: (formatString: string) => string;
/**
 * Locale-aware date utility namespace wrapping date-fns functions.
 *
 * All formatting operations respect the locale set via
 * {@link setDateIOLocale}. Legacy format tokens are automatically
 * converted through {@link convertToISOFormat}.
 *
 * @category Utility
 */
export declare const DateIO: {
    /**
     * Parses a date string into a `Date` object.
     *
     * When `formatString` is provided, the string is parsed according to
     * that format (with legacy token conversion). Otherwise, the string is
     * parsed as an ISO 8601 date. Returns the current date if parsing fails.
     *
     * @param dateString - The date value to parse. Defaults to the current
     *   ISO timestamp.
     * @param formatString - Optional format pattern (e.g. `'yyyy-MM-dd'`).
     * @returns The parsed Date, or the current date on error.
     *
     * @example
     * DateIO.parse('2024-06-15');
     * DateIO.parse('15/06/2024', 'dd/MM/yyyy');
     */
    parse: (dateString?: number | string, formatString?: string) => Date;
    /**
     * Formats a `Date` object into a string.
     *
     * When `formatString` is provided, the date is formatted using the
     * current locale and that pattern. Otherwise, returns an ISO 8601 string.
     *
     * @param date - The date to format.
     * @param formatString - Optional format pattern (e.g. `'yyyy-MM-dd'`).
     * @returns The formatted date string.
     *
     * @example
     * DateIO.format(new Date(), 'yyyy-MM-dd'); // '2024-06-15'
     * DateIO.format(new Date()); // '2024-06-15T12:00:00+02:00'
     */
    format: (date: Date, formatString?: string) => string;
    /**
     * Tests whether `date` is before `dateToCompare`.
     *
     * @param date - The date to check.
     * @param dateToCompare - The date to compare against.
     * @returns `true` if `date` is before `dateToCompare`.
     */
    isBefore: (date: Date, dateToCompare: Date) => boolean;
    /**
     * Tests whether `date` is after `dateToCompare`.
     *
     * @param date - The date to check.
     * @param dateToCompare - The date to compare against.
     * @returns `true` if `date` is after `dateToCompare`.
     */
    isAfter: (date: Date, dateToCompare: Date) => boolean;
    /** Returns the minutes of the given date.
     * @param date - The date to extract minutes from.
     * @returns The minutes component (0-59).
     */
    getMinutes: (date: Date) => number;
    /** Sets the minutes on the given date, returning a new Date.
     * @param date - The original date.
     * @param minutes - The minutes value to set (0-59).
     * @returns A new Date with the updated minutes.
     */
    setMinutes: (date: Date, minutes: number) => Date;
    /** Adds the specified number of minutes to the given date.
     * @param date - The original date.
     * @param amount - The number of minutes to add.
     * @returns A new Date with the minutes added.
     */
    addMinutes: (date: Date, amount: number) => Date;
    /** Subtracts the specified number of minutes from the given date.
     * @param date - The original date.
     * @param amount - The number of minutes to subtract.
     * @returns A new Date with the minutes subtracted.
     */
    subMinutes: (date: Date, amount: number) => Date;
    /** Returns the hours of the given date.
     * @param date - The date to extract hours from.
     * @returns The hours component (0-23).
     */
    getHours: (date: Date) => number;
    /** Sets the hours on the given date, returning a new Date.
     * @param date - The original date.
     * @param hours - The hours value to set (0-23).
     * @returns A new Date with the updated hours.
     */
    setHours: (date: Date, hours: number) => Date;
    /** Adds the specified number of hours to the given date.
     * @param date - The original date.
     * @param amount - The number of hours to add.
     * @returns A new Date with the hours added.
     */
    addHours: (date: Date, amount: number) => Date;
    /** Subtracts the specified number of hours from the given date.
     * @param date - The original date.
     * @param amount - The number of hours to subtract.
     * @returns A new Date with the hours subtracted.
     */
    subHours: (date: Date, amount: number) => Date;
    /** Returns the day-of-month of the given date.
     * @param date - The date to extract the day from.
     * @returns The day of the month (1-31).
     */
    getDate: (date: Date) => number;
    /** Sets the day-of-month on the given date, returning a new Date.
     * @param date - The original date.
     * @param day - The day-of-month value to set (1-31).
     * @returns A new Date with the updated day.
     */
    setDate: (date: Date, day: number) => Date;
    /** Returns the day of the week for the given date.
     * @param date - The date to extract the weekday from.
     * @returns The day of the week (0 = Sunday, 6 = Saturday).
     */
    getDay: (date: Date) => number;
    /** Adds the specified number of days to the given date.
     * @param date - The original date.
     * @param amount - The number of days to add.
     * @returns A new Date with the days added.
     */
    addDays: (date: Date, amount: number) => Date;
    /** Subtracts the specified number of days from the given date.
     * @param date - The original date.
     * @param amount - The number of days to subtract.
     * @returns A new Date with the days subtracted.
     */
    subDays: (date: Date, amount: number) => Date;
    /** Returns the month of the given date (0-indexed).
     * @param date - The date to extract the month from.
     * @returns The month (0 = January, 11 = December).
     */
    getMonth: (date: Date) => number;
    /** Sets the month on the given date, returning a new Date.
     * @param date - The original date.
     * @param month - The month value to set (0 = January, 11 = December).
     * @returns A new Date with the updated month.
     */
    setMonth: (date: Date, month: number) => Date;
    /** Adds the specified number of months to the given date.
     * @param date - The original date.
     * @param amount - The number of months to add.
     * @returns A new Date with the months added.
     */
    addMonths: (date: Date, amount: number) => Date;
    /** Subtracts the specified number of months from the given date.
     * @param date - The original date.
     * @param amount - The number of months to subtract.
     * @returns A new Date with the months subtracted.
     */
    subMonths: (date: Date, amount: number) => Date;
    /** Returns the full year of the given date.
     * @param date - The date to extract the year from.
     * @returns The four-digit year.
     */
    getYear: (date: Date) => number;
    /** Sets the year on the given date, returning a new Date.
     * @param date - The original date.
     * @param years - The year value to set.
     * @returns A new Date with the updated year.
     */
    setYear: (date: Date, years: number) => Date;
    /** Adds the specified number of years to the given date.
     * @param date - The original date.
     * @param amount - The number of years to add.
     * @returns A new Date with the years added.
     */
    addYears: (date: Date, amount: number) => Date;
    /** Subtracts the specified number of years from the given date.
     * @param date - The original date.
     * @param amount - The number of years to subtract.
     * @returns A new Date with the years subtracted.
     */
    subYears: (date: Date, amount: number) => Date;
    /** Returns the start of the week for the given date.
     * @param date - The reference date.
     * @returns A new Date set to the start of the week.
     */
    startOfWeek: (date: Date) => Date;
    /** Returns the end of the month for the given date.
     * @param date - The reference date.
     * @returns A new Date set to the last moment of the month.
     */
    endOfMonth: (date: Date) => Date;
    /** Returns the number of days in the month of the given date.
     * @param date - The reference date.
     * @returns The total number of days in that month.
     */
    getDaysInMonth: (date: Date) => number;
    /** Returns the ISO week number for the given date.
     * @param date - The reference date.
     * @returns The ISO 8601 week number (1-53).
     */
    getISOWeek: (date: Date) => number;
    /** Returns the locale-aware week number for the given date.
     * @param date - The reference date.
     * @returns The week number according to locale rules.
     */
    getWeek: (date: Date) => number;
};

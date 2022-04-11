import {
    parseISO,
    parse,
    format,
    isAfter,
    Locale,
    addMinutes,
    addHours,
    subHours,
    subMinutes,
    setMinutes,
    setHours,
    addDays,
    subDays,
    setMonth,
    addMonths,
    subMonths,
    setYear,
    addYears,
    subYears,
    startOfWeek,
    getYear,
    getMonth,
    getHours,
    getMinutes,
    getDaysInMonth,
    endOfMonth,
    formatISO,
    setDate,
    getDate,
    getDay,
    isBefore,
    getISOWeek,
    getWeek,
} from 'date-fns';
import { hu, enUS } from 'date-fns/locale';

const getLocaleFrom = (newLocale: string): Locale => {
    switch (newLocale) {
        case 'hu-HU':
            return hu;
        default:
            return enUS;
    }
};

let locale: Locale = getLocaleFrom('en-US');

export const setDateIOLocale = (newLocale: string): void => {
    locale = getLocaleFrom(newLocale);
};

const convertToISOFormat = (formatString: string): string => {
    return formatString.replace('YYYY', 'yyyy').replaceAll('D', 'd');
};

export const DateIO = {
    parse: (
        dateString: string = new Date().toISOString(),
        formatString?: string,
    ): Date => {
        if (formatString) {
            return parse(dateString, formatString, new Date());
        }
        return parseISO(dateString);
    },
    format: (date: Date, formatString?: string): string => {
        if (formatString) {
            return format(date, convertToISOFormat(formatString), {
                locale,
            });
        }
        return formatISO(date);
    },
    isBefore: (date: Date, dateToCompare: Date): boolean => {
        return isBefore(date, dateToCompare);
    },
    isAfter: (date: Date, dateToCompare: Date): boolean => {
        return isAfter(date, dateToCompare);
    },
    getMinutes: (date: Date): number => {
        return getMinutes(date);
    },
    setMinutes: (date: Date, minutes: number): Date => {
        return setMinutes(date, minutes);
    },
    addMinutes: (date: Date, amount: number): Date => {
        return addMinutes(date, amount);
    },
    subMinutes: (date: Date, amount: number): Date => {
        return subMinutes(date, amount);
    },
    getHours: (date: Date): number => {
        return getHours(date);
    },
    setHours: (date: Date, hours: number): Date => {
        return setHours(date, hours);
    },
    addHours: (date: Date, amount: number): Date => {
        return addHours(date, amount);
    },
    subHours: (date: Date, amount: number): Date => {
        return subHours(date, amount);
    },
    getDate: (date: Date): number => {
        return getDate(date);
    },
    setDate: (date: Date, day: number): Date => {
        return setDate(date, day);
    },
    getDay: (date: Date): number => {
        return getDay(date);
    },
    addDays: (date: Date, amount: number): Date => {
        return addDays(date, amount);
    },
    subDays: (date: Date, amount: number): Date => {
        return subDays(date, amount);
    },
    getMonth: (date: Date): number => {
        return getMonth(date);
    },
    setMonth: (date: Date, month: number): Date => {
        return setMonth(date, month);
    },
    addMonths: (date: Date, amount: number): Date => {
        return addMonths(date, amount);
    },
    subMonths: (date: Date, amount: number): Date => {
        return subMonths(date, amount);
    },
    getYear: (date: Date): number => {
        return getYear(date);
    },
    setYear: (date: Date, years: number): Date => {
        return setYear(date, years);
    },
    addYears: (date: Date, amount: number): Date => {
        return addYears(date, amount);
    },
    subYears: (date: Date, amount: number): Date => {
        return subYears(date, amount);
    },
    startOfWeek: (date: Date): Date => {
        return startOfWeek(date);
    },
    endOfMonth: (date: Date): Date => {
        return endOfMonth(date);
    },
    getDaysInMonth: (date: Date): number => {
        return getDaysInMonth(date);
    },
    getISOWeek: (date: Date): number => {
        return getISOWeek(date);
    },
    getWeek: (date: Date): number => {
        return getWeek(date);
    },
};

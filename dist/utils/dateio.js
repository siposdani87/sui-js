import { parseISO, parse, format, isAfter, addMinutes, addHours, subHours, subMinutes, setMinutes, setHours, addDays, subDays, setMonth, addMonths, subMonths, setYear, addYears, subYears, startOfWeek, getYear, getMonth, getHours, getMinutes, getDaysInMonth, endOfMonth, formatISO, setDate, getDate, getDay, isBefore, getISOWeek, getWeek, } from 'date-fns';
import { hu, enUS } from 'date-fns/locale';
let locale = enUS;
const convertToISOFormat = (formatString) => {
    return formatString.replace('YYYY', 'yyyy').replaceAll('D', 'd');
};
const getLocaleFrom = (newLocale) => {
    console.log(newLocale);
    switch (newLocale) {
        case 'hu-HU':
            return hu;
        default:
            return enUS;
    }
};
export const setDateIOLocale = (newLocale) => {
    locale = getLocaleFrom(newLocale);
};
export const DateIO = {
    parse: (dateString = new Date().toISOString(), formatString) => {
        if (formatString) {
            return parse(dateString, formatString, new Date());
        }
        return parseISO(dateString);
    },
    format: (date, formatString) => {
        if (formatString) {
            return format(date, convertToISOFormat(formatString), {
                locale,
            });
        }
        return formatISO(date);
    },
    isBefore: (date, dateToCompare) => {
        return isBefore(date, dateToCompare);
    },
    isAfter: (date, dateToCompare) => {
        return isAfter(date, dateToCompare);
    },
    getMinutes: (date) => {
        return getMinutes(date);
    },
    setMinutes: (date, minutes) => {
        return setMinutes(date, minutes);
    },
    addMinutes: (date, amount) => {
        return addMinutes(date, amount);
    },
    subMinutes: (date, amount) => {
        return subMinutes(date, amount);
    },
    getHours: (date) => {
        return getHours(date);
    },
    setHours: (date, hours) => {
        return setHours(date, hours);
    },
    addHours: (date, amount) => {
        return addHours(date, amount);
    },
    subHours: (date, amount) => {
        return subHours(date, amount);
    },
    getDate: (date) => {
        return getDate(date);
    },
    setDate: (date, day) => {
        return setDate(date, day);
    },
    getDay: (date) => {
        return getDay(date);
    },
    addDays: (date, amount) => {
        return addDays(date, amount);
    },
    subDays: (date, amount) => {
        return subDays(date, amount);
    },
    getMonth: (date) => {
        return getMonth(date);
    },
    setMonth: (date, month) => {
        return setMonth(date, month);
    },
    addMonths: (date, amount) => {
        return addMonths(date, amount);
    },
    subMonths: (date, amount) => {
        return subMonths(date, amount);
    },
    getYear: (date) => {
        return getYear(date);
    },
    setYear: (date, years) => {
        return setYear(date, years);
    },
    addYears: (date, amount) => {
        return addYears(date, amount);
    },
    subYears: (date, amount) => {
        return subYears(date, amount);
    },
    startOfWeek: (date) => {
        return startOfWeek(date);
    },
    endOfMonth: (date) => {
        return endOfMonth(date);
    },
    getDaysInMonth: (date) => {
        return getDaysInMonth(date);
    },
    getISOWeek: (date) => {
        return getISOWeek(date);
    },
    getWeek: (date) => {
        return getWeek(date);
    },
};

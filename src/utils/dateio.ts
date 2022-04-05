import { parseISO, parse, format, isAfter, Locale } from 'date-fns';
import { hu, enUS } from 'date-fns/locale';

let locale: Locale = enUS;

const convertToISOFormat = (f: string): string => {
    return f.replace('YYYY', 'yyyy').replaceAll('D', 'd');
};

const getLocaleFrom = (language: string): Locale => {
    switch (language) {
        case 'hu':
            return hu;
        default:
            return enUS;
    }
};

export const setDateIOLocale = (language: string): void => {
    locale = getLocaleFrom(language);
};

export const DateIO = {
    parse: (v: string = new Date().toISOString(), f?: string): Date => {
        if (f) {
            return parse(v, f, new Date());
        }
        return parseISO(v);
    },
    format: (v: Date, f: string): string => {
        return format(v, convertToISOFormat(f), {
            locale,
        });
    },
    isAfter: (v: Date, va: Date): boolean => {
        return isAfter(v, va);
    },
};

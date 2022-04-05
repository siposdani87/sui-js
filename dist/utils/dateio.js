import { parseISO, parse, format, isAfter } from 'date-fns';
import { hu, enUS } from 'date-fns/locale';
let locale = enUS;
const convertToISOFormat = (f) => {
    return f.replace('YYYY', 'yyyy').replaceAll('D', 'd');
};
const getLocaleFrom = (language) => {
    switch (language) {
        case 'hu':
            return hu;
        default:
            return enUS;
    }
};
export const setDateIOLocale = (language) => {
    locale = getLocaleFrom(language);
};
export const DateIO = {
    parse: (v = new Date().toISOString(), f) => {
        if (f) {
            return parse(v, f, new Date());
        }
        return parseISO(v);
    },
    format: (v, f) => {
        return format(v, convertToISOFormat(f), {
            locale,
        });
    },
    isAfter: (v, va) => {
        return isAfter(v, va);
    },
};

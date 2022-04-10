export declare const setDateIOLocale: (newLocale: string) => void;
export declare const DateIO: {
    parse: (dateString?: string, formatString?: string) => Date;
    format: (date: Date, formatString: string) => string;
    isBefore: (date: Date, dateToCompare: Date) => boolean;
    isAfter: (date: Date, dateToCompare: Date) => boolean;
    getMinutes: (date: Date) => number;
    setMinutes: (date: Date, minutes: number) => Date;
    addMinutes: (date: Date, amount: number) => Date;
    subMinutes: (date: Date, amount: number) => Date;
    getHours: (date: Date) => number;
    setHours: (date: Date, hours: number) => Date;
    addHours: (date: Date, amount: number) => Date;
    subHours: (date: Date, amount: number) => Date;
    getDate: (date: Date) => number;
    setDate: (date: Date, day: number) => Date;
    getDay: (date: Date) => number;
    addDays: (date: Date, amount: number) => Date;
    subDays: (date: Date, amount: number) => Date;
    getMonth: (date: Date) => number;
    setMonth: (date: Date, month: number) => Date;
    addMonths: (date: Date, amount: number) => Date;
    subMonths: (date: Date, amount: number) => Date;
    getYear: (date: Date) => number;
    setYear: (date: Date, years: number) => Date;
    addYears: (date: Date, amount: number) => Date;
    subYears: (date: Date, amount: number) => Date;
    startOfWeek: (date: Date) => Date;
    endOfMonth: (date: Date) => Date;
    getDaysInMonth: (date: Date) => number;
};

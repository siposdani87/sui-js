export declare const setDateIOLocale: (language: string) => void;
export declare const DateIO: {
    parse: (v?: string, f?: string) => Date;
    format: (v: Date, f: string) => string;
    isAfter: (v: Date, va: Date) => boolean;
};

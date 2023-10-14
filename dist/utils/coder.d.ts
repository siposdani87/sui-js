export declare const encodeBase64: (text: string) => string;
export declare const decodeBase64: (encodedText: string) => string;
export declare const encrypt: (value: any, passPhrase: string) => string;
export declare const decrypt: (item: string, passPhrase: string) => any;
export declare const md5: (str: string) => string;
export declare const guid: () => string;
export declare const generateId: (name: string) => string;
export declare const uuid: () => string;

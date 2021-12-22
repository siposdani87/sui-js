export = SUI;
export as namespace SUI;

declare namespace SUI {

  const noop: any;

  function format(str: string, opt_params?: any, opt_prefix?: string, opt_postfix?: string): string;

  function guid(): string;

  function contain(str: string, subStr: string): boolean;

  function capitalize(str: string): string;

  function HEXToHSV(str: string): number[];

  function HEXToRGB(str: string): number[];

  function colorContrast(hexColor: string, opt_diff?: number): string;

  function getExtensionName(filename: string): string;

  function isString(data: any): boolean;

  function isNumber(data: any): boolean;

  function isObject(data: any): boolean;

  function isNull(data: any): boolean;

  function isFunction(data: any): boolean;

  function isUndefined(data: any): boolean;

  function eq(data: any, value: any): boolean;

  function generateId(key: string): string;

  function urlWithQueryString(url: string, opt_params?: any): string;

  function inArray(items: any[], item: any): boolean;

  function pluck(items: any[], attribute: string): any[];

  function eachArray<T>(items: T[], next: (v: T, i: number) => void, opt_start?: number, opt_end?: number): void;

  class Object {
    [key: string]: any;

    constructor(obj?: any);

    merge(data: any): any;

    get<T>(opt_attribute: string, opt_defaultValue?: any, opt_isSafe?: boolean): T;

    set(attribute: string, value: any): void;

    setRaw(attribute: string, value: any, opt_isSafe?: boolean): void;
  }

  class Collection<T> {

    constructor(items?: T[]);

    getItems(): T[];
  }
}
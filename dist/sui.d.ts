import { isFunctionDeclaration } from "typescript";

export = SUI;
export as namespace SUI;

declare namespace SUI {

  const noop: any;
  
  function capitalize(str: string): string;

  function HEXToHSV(str: string): string[];

  function getExtensionName(filename: string): string;

  function isNumber(data: any): boolean;

  function isObject(data: any): boolean;

  function isNull(data: any): boolean;

  function isFunction(data: any): boolean;

  function eq(data: any, value: any): boolean;

  function generatedId(key: string): string;

  declare class Object {
    constructor(obj?: any);

    merge(data: any): any;
  }
}

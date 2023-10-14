import { Objekt } from '../core/objekt';
import { BaseModal } from './baseModal';
export declare class Confirm extends BaseModal {
    options: Objekt;
    constructor(opt_options?: Object | undefined);
    private _setOptions;
    private _init;
    load(message: string, okText: string, opt_cancelText?: string | undefined, opt_title?: string | undefined, opt_type?: string | undefined): void;
}

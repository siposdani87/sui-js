import { Objekt } from '../core/objekt';
import { BaseModal } from './baseModal';
export declare class Viewer extends BaseModal {
    options: Objekt;
    constructor(opt_options?: object | undefined);
    private _setOptions;
    private _init;
    loadImage(imageUrl: string, opt_title?: string | undefined): void;
    private _setImage;
}

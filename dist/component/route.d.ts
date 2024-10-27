import { Objekt } from '../core/objekt';
export declare class Route extends Objekt {
    constructor(id: string, title: string, url: string, controller: string, opt_template?: string | undefined, opt_params?: object | undefined);
}

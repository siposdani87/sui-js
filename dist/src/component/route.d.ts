import { Objekt } from '../core/objekt';
/**
 * @class
 * @extends {Objekt}
 */
export declare class Route extends Objekt {
    /**
     * @param {string} id
     * @param {string} title
     * @param {string} url
     * @param {string} controller
     * @param {string=} opt_template
     * @param {!Object=} opt_params
     */
    constructor(id: string, title: string, url: string, controller: string, opt_template?: string | undefined, opt_params?: Object | undefined);
}

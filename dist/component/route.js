import { Objekt } from '../core/objekt';
/**
 * @class
 * @extends {Objekt}
 */
export class Route extends Objekt {
    /**
     * @param {string} id
     * @param {string} title
     * @param {string} url
     * @param {string} controller
     * @param {string=} opt_template
     * @param {!Object=} opt_params
     */
    constructor(id, title, url, controller, opt_template = '', opt_params = {}) {
        super();
        this.merge(opt_params);
        this.set('id', id);
        this.set('title', title);
        this.set('url', url);
        this.set('controller', controller);
        this.set('template', opt_template);
    }
}

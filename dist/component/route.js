import { Objekt } from '../core/objekt';
/**
 * @class
 */
export class Route {
    /**
     * @param {string} id
     * @param {string} title
     * @param {string} url
     * @param {string} controller
     * @param {string=} opt_template
     * @param {!Object=} opt_params
     */
    constructor(id, title, url, controller, opt_template = '', opt_params = {}) {
        const state = new Objekt(opt_params);
        state.set('id', id);
        state.set('title', title);
        state.set('url', url);
        state.set('controller', controller);
        state.set('template', opt_template);
        this.state = state;
    }
}

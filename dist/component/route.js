import { Objekt } from '../core/objekt';
export class Route extends Objekt {
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

import { Objekt } from '../core/objekt';

export class Route extends Objekt {
    constructor(
        id: string,
        title: string,
        url: string,
        controller: string,
        opt_template: string | undefined = '',
        opt_params: Object | undefined = {},
    ) {
        super();

        this.merge(opt_params);
        this.set('id', id);
        this.set('title', title);
        this.set('url', url);
        this.set('controller', controller);
        this.set('template', opt_template);
    }
}

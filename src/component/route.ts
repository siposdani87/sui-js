import { Objekt } from '../core/objekt';

/**
 * @description Route configuration value object that extends {@link Objekt}. Stores route
 * metadata including id, title, URL pattern, controller name, and optional template path.
 *
 * @example
 * const route = new Route('home', 'Home Page', '/', 'HomeController', '/templates/home.html');
 *
 * @see {@link Application} for the application that manages routes
 * @see {@link Module} for route-based module resolution
 *
 * @category Component
 */
export class Route extends Objekt {
    /**
     * @description Creates a new Route with the given configuration values.
     * @param {string} id - Unique route identifier.
     * @param {string} title - Human-readable page title.
     * @param {string} url - URL pattern for route matching.
     * @param {string} controller - Name of the controller class to instantiate.
     * @param {string} [opt_template] - Path to the HTML template file.
     * @param {object} [opt_params] - Additional route parameters to merge.
     */
    constructor(
        id: string,
        title: string,
        url: string,
        controller: string,
        opt_template: string | undefined = '',
        opt_params: object | undefined = {},
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

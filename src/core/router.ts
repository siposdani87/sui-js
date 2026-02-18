import { Params } from '../utils';
import {
    isArray,
    typeCast,
    contain,
    urlWithQueryString,
} from '../utils/operation';

/**
 * Handles URL pattern matching and parameter extraction for client-side
 * routing. A Router instance compiles a route pattern string into a regular
 * expression that can be tested against URL paths, and provides methods
 * to extract named parameters from matching URLs or to build URLs from
 * a pattern and parameter values.
 *
 * Route patterns support two placeholder types:
 * - `:param` matches a single URL segment (everything except `/`)
 * - `*param` matches any remaining path (including `/` characters)
 *
 * @example
 * const router = new Router('/users/:userId/posts/:postId');
 *
 * // Test if a URL matches the pattern
 * const matches = router.getMatches('/users/42/posts/7');
 * // matches !== null
 *
 * // Extract named parameters from a URL
 * const params = router.parse('/users/42/posts/7');
 * // { userId: 42, postId: 7 }
 *
 * // Build a URL from parameters
 * const url = router.stringify({ userId: 42, postId: 7 });
 * // '/users/42/posts/7'
 *
 * @see {@link State}
 * @see {@link Params}
 * @category Core
 */
export class Router {
    route: string;
    param: RegExp;
    escape: RegExp;
    paramNames!: string[];
    regex!: RegExp;

    /**
     * Creates a new Router for the given route pattern. The pattern is
     * compiled into a regular expression during construction, and
     * placeholder names are extracted for later parameter parsing.
     *
     * @param opt_route Route pattern string containing `:param` or `*param`
     *     placeholders. Defaults to an empty string.
     */
    constructor(opt_route: string | undefined = '') {
        this.route = opt_route;
        this.param = /([:*])(\w+)/g;
        this.escape = /[-[]{}()+?.,]/g;

        this._init();
    }

    /**
     * Compiles the route pattern into a regular expression. Escapes special
     * regex characters in the pattern, replaces `:param` placeholders with
     * single-segment capture groups and `*param` placeholders with greedy
     * capture groups, and stores the extracted parameter names.
     */
    private _init(): void {
        this.paramNames = [];
        let route = this.route;
        route = route.replace(this.escape, '\\$&');
        route = route.replace(this.param, (_param, mode, paramName) => {
            this.paramNames.push(paramName);
            return mode === ':' ? '([^/]*)' : '(.*)';
        });
        this.regex = new RegExp('^' + route + '$');
    }

    /**
     * Builds a URL string from the route pattern by substituting parameter
     * values into placeholders. Any parameters that do not correspond to
     * placeholders in the pattern are appended as query string parameters.
     * Unused placeholders are removed from the result.
     *
     * @param opt_params Key-value pairs to substitute into the route
     *     pattern. Keys matching `:param` or `*param` names are inserted
     *     inline; remaining keys become query string parameters.
     * @returns The constructed URL with parameters substituted and
     *     optional query string appended.
     * @example
     * const router = new Router('/search/:category');
     * const url = router.stringify({ category: 'books', page: '2' });
     * // '/search/books?page=2'
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    stringify(opt_params: Record<string, any> | undefined = {}): string {
        let route = this.route;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const params: Record<string, any> = {};
        for (const key in opt_params) {
            if (opt_params.hasOwnProperty(key)) {
                const param = opt_params[key];
                const regex = new RegExp('[:*]' + key + '\\b');
                if (regex.test(route)) {
                    route = route.replace(regex, param);
                } else {
                    params[key] = opt_params[key];
                }
            }
        }
        route = urlWithQueryString(route, params);

        route = route.replace(this.param, '');
        return route[route.length - 1] === '?'
            ? route.substring(0, route.length - 1)
            : route;
    }

    /**
     * Tests whether a URL path matches the compiled route pattern. The
     * query string portion of the URL (if present) is stripped before
     * matching.
     *
     * @param url URL path to test against the route pattern.
     * @returns A `RegExpMatchArray` if the URL matches the pattern, or
     *     `null` if it does not match.
     * @example
     * const router = new Router('/users/:id');
     * router.getMatches('/users/42');    // RegExpMatchArray
     * router.getMatches('/posts/42');    // null
     */
    getMatches(url: string): RegExpMatchArray | null {
        const questionMark = url.indexOf('?');
        if (questionMark !== -1) {
            url = url.substring(0, questionMark);
        }
        return url.match(this.regex);
    }

    /**
     * Extracts named parameters from a URL that matches the route pattern.
     * Combines both path-segment parameters (from `:param` and `*param`
     * placeholders) and query string parameters into a single object.
     * Values are automatically type-cast (e.g., numeric strings become
     * numbers).
     *
     * @param url URL path to extract parameters from.
     * @returns An object mapping parameter names to their extracted and
     *     type-cast values. Returns an empty object if the URL does not
     *     match the pattern.
     * @example
     * const router = new Router('/items/:id');
     * const params = router.parse('/items/99?sort=name');
     * // { id: 99, sort: 'name' }
     */
    parse(url: string): object {
        const matches = this.getMatches(url);
        if (!matches) {
            return {};
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const params: Record<string, any> = this._parseParams(url);
        for (let i = 0; i < this.paramNames.length; i++) {
            const key = this.paramNames[i];
            params[key] = typeCast(matches[i + 1]);
        }
        return params;
    }

    /**
     * Parses query string parameters from a URL into a key-value object.
     * Handles URI-decoded keys and values, array parameters denoted by
     * `[]` suffix, and escaped `==` sequences within values.
     *
     * @param url URL containing a query string to parse.
     * @returns A {@link Params} object of decoded query string parameters.
     */
    private _parseParams(url: string): Params {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const params: Record<string, any> = {};
        const question = url.indexOf('?');
        if (question !== -1) {
            const pieces = url.substring(question + 1).split('&');
            for (const piece of pieces) {
                const parts = piece.replace('==', '&&').split('=');
                if (parts.length < 2) {
                    parts.push('');
                }
                const key = window.decodeURIComponent(parts[0]);
                const value = typeCast(
                    window.decodeURIComponent(parts[1].replace('&&', '==')),
                );
                if (contain(key, '[]')) {
                    const realKey = key.replace('[]', '');
                    if (!isArray(params[realKey])) {
                        params[realKey] = [value];
                    } else {
                        params[realKey].push(value);
                    }
                } else {
                    params[key] = value;
                }
            }
        }
        return params;
    }
}

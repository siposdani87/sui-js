/**
 * @typedef {function(Element, Event)} Listener
 */
export type Listener = (this: Element, ev: Event) => any;

/**
 * @typedef {!Object} Params
 */
export type Params = {
    [key: string]: string;
};

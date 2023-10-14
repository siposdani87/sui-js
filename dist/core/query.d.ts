import { Collection } from './collection';
import { Knot } from './knot';
export declare class Query<T extends HTMLElement = HTMLElement> extends Collection<Knot<T>> {
    constructor(selector: string, opt_element?: HTMLElement | Knot);
    getKnot(): Knot<T>;
    getKnots(): Knot[];
}

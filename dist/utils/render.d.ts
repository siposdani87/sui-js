import { Item } from '../core';
import { ClassRef } from './types';
/**
 * @export
 * @param {!Item|!Element=} opt_node
 * @param {boolean=} opt_forceDowngrade
 * @return {undefined}
 */
export declare const mdl: (opt_node?: Item | Element, opt_forceDowngrade?: boolean | undefined) => void;
/**
 * @export
 * @param {ClassRef} classRef
 * @param {!Object} props
 * @param {!Item} mountNode
 * @return {!Object}
 */
export declare const renderReact: (classRef: ClassRef, props: Object, mountNode: Item) => Object;
/**
 * @export
 * @param {!Item} mountNode
 * @return {undefined}
 */
export declare const unmountReact: (mountNode: Item) => void;

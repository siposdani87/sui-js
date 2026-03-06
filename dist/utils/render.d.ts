/**
 * @module render
 *
 * Rendering utilities for SUI custom behaviors.
 *
 * Provides helpers for applying SUI custom behaviors on DOM elements
 * so that dynamically inserted markup is properly enhanced.
 *
 * @category Utility
 */
import { Knot } from '../core';
/**
 * Applies SUI custom behaviors to a DOM element.
 *
 * Initializes textfield state management (focus/blur/input listeners)
 * on `.sui-textfield` elements within the given node. Uses a
 * `data-sui-init` guard to prevent duplicate initialization.
 *
 * Accepts either a {@link Knot} wrapper or a raw `HTMLElement`.
 *
 * @param node - The element to enhance. Pass a {@link Knot} instance or
 *   a raw `HTMLElement`.
 * @category Utility
 *
 * @example
 * // Enhance a Knot element with SUI behaviors
 * sui(myKnot);
 */
export declare function sui(node: Knot | HTMLElement): void;

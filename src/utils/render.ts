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
export function sui(node: Knot | HTMLElement): void {
    const element = node instanceof Knot ? node.getNode() : node;
    if (!element) {
        return;
    }
    const textfields = element.classList.contains('sui-textfield')
        ? [element]
        : Array.from(element.querySelectorAll<HTMLElement>('.sui-textfield'));
    for (const container of textfields) {
        if (container.dataset['suiInit']) {
            continue;
        }
        container.dataset['suiInit'] = '1';
        const input = container.querySelector<
            HTMLInputElement | HTMLTextAreaElement
        >('.sui-textfield__input');
        if (input) {
            if (input.value) {
                container.classList.add('is-dirty');
            }
            input.addEventListener('focus', () => {
                container.classList.add('is-focused');
            });
            input.addEventListener('blur', () => {
                container.classList.remove('is-focused');
            });
            input.addEventListener('input', () => {
                if (input.value) {
                    container.classList.add('is-dirty');
                } else {
                    container.classList.remove('is-dirty');
                }
            });
        }
    }
}

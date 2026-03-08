/**
 * Performs an animated smooth scroll to the specified coordinates.
 *
 * Uses `setInterval` to incrementally scroll the window toward the target
 * position over the given duration. Any previously active scroll animation
 * is cancelled before starting a new one.
 *
 * @param {number} x The target horizontal scroll position in pixels.
 * @param {number} y The target vertical scroll position in pixels.
 * @param {number} [opt_duration=500] Total animation duration in milliseconds.
 * @param {number} [opt_step=20] Interval between scroll increments in milliseconds.
 * @example
 * scrollTo(0, 500);        // Scroll to y=500 over 500ms
 * scrollTo(0, 0, 1000, 10); // Scroll to top over 1 second with 10ms steps
 * @category Utility
 */
let _scrollInterval: number | null = null;

export const scrollTo = (
    x: number,
    y: number,
    opt_duration: number | undefined = 500,
    opt_step: number | undefined = 20,
): void => {
    clearInterval(_scrollInterval!);
    let scrollStepX = -(window.scrollX - x) / (opt_duration / opt_step);
    let scrollStepY = -(window.scrollY - y) / (opt_duration / opt_step);
    _scrollInterval = setInterval(() => {
        if (
            (scrollStepX > 0 && window.scrollX + scrollStepX > x) ||
            (scrollStepX < 0 && window.scrollX + scrollStepX < x)
        ) {
            scrollStepX = x - window.scrollX;
        }
        if (
            (scrollStepY > 0 && window.scrollY + scrollStepY > y) ||
            (scrollStepY < 0 && window.scrollY + scrollStepY < y)
        ) {
            scrollStepY = y - window.scrollY;
        }
        if (window.scrollX !== x || window.scrollY !== y) {
            window.scrollBy(scrollStepX, scrollStepY);
        } else {
            clearInterval(_scrollInterval!);
        }
    }, opt_step);
};

/**
 * Performs an animated smooth scroll to a DOM element's position.
 *
 * Queries the DOM for the first element matching the given CSS selector,
 * then delegates to {@link scrollTo} using the element's offset position.
 *
 * @param {string} selector A CSS selector identifying the target element.
 * @param {number} [opt_duration=500] Total animation duration in milliseconds.
 * @param {number} [opt_step=20] Interval between scroll increments in milliseconds.
 * @example
 * scrollToElement('#section-2');
 * scrollToElement('.target', 1000);
 * @category Utility
 */
export const scrollToElement = (
    selector: string,
    opt_duration: number | undefined = 500,
    opt_step: number | undefined = 20,
): void => {
    const nodeList = document.querySelectorAll<HTMLElement>(selector);
    const element = nodeList[0]!;
    const x = element.offsetLeft;
    const y = element.offsetTop;
    scrollTo(x, y, opt_duration, opt_step);
};

/**
 * Scrolls a DOM element into view using the native `scrollIntoView` API.
 *
 * Queries the DOM for the first element matching the given CSS selector
 * and calls `scrollIntoView` with the specified scroll behavior.
 *
 * @param {string} selector A CSS selector identifying the target element.
 * @param {ScrollBehavior} [opt_behavior='smooth'] The scroll behavior
 *     (`'smooth'`, `'instant'`, or `'auto'`).
 * @example
 * scrollIntoView('#footer');
 * scrollIntoView('.section', 'instant');
 * @category Utility
 */
export const scrollIntoView = (
    selector: string,
    opt_behavior: ScrollBehavior | undefined = 'smooth',
): void => {
    document.querySelector(selector)!.scrollIntoView({
        behavior: opt_behavior,
    });
};

/**
 * Creates a debounced version of a function that delays invocation.
 *
 * The returned function postpones calling `func` until `opt_wait` milliseconds
 * have elapsed since the last invocation. If `opt_immediate` is `true`, the
 * function fires on the leading edge instead of the trailing edge.
 *
 * @param {(ev: Event) => void} func The function to debounce.
 * @param {number} [opt_wait=250] Delay in milliseconds before the function is invoked.
 * @param {boolean} [opt_immediate=false] If `true`, trigger the function on the
 *     leading edge instead of the trailing edge.
 * @returns {(this: Window, ev: Event) => void} The debounced function.
 * @example
 * const debouncedSearch = debounce((ev) => {
 *     performSearch(ev.target.value);
 * }, 300);
 * inputElement.addEventListener('input', debouncedSearch);
 * @category Utility
 */
export const debounce = (
    func: (ev: Event) => void,
    opt_wait: number | undefined = 250,
    opt_immediate: boolean | undefined = false,
): ((this: Window, ev: Event) => void) => {
    let timeout: number;
    return (...args) => {
        const later = () => {
            timeout = null as unknown as number;
            if (!opt_immediate) func(...args);
        };
        const callNow = opt_immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, opt_wait);
        if (callNow) func(...args);
    };
};

/**
 * Copies text to the system clipboard.
 *
 * Creates a hidden `<textarea>` element, sets its value to the given string,
 * selects it, and executes the `copy` command. The temporary element is
 * removed after the operation.
 *
 * @param {string} str The text to copy to the clipboard.
 * @category Utility
 */
export const copyToClipboard = (str: string): void => {
    if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(str);
    } else {
        const textareaElement = document.createElement('textarea');
        textareaElement.value = str;
        textareaElement.setAttribute('readonly', '');
        textareaElement.style.position = 'absolute';
        textareaElement.style.left = '-9999px';
        document.body.appendChild(textareaElement);
        textareaElement.select();
        document.execCommand('copy');
        document.body.removeChild(textareaElement);
    }
};

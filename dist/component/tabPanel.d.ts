import { Query } from '../core/query';
import { Knot } from '../core';
/**
 * @description Tab panel component that manages tab/panel activation with async change events.
 * Tabs are linked to panels by href attributes, and switching triggers an overridable
 * eventChange callback through the {@link Async} serial pipeline.
 *
 * @example
 * const tabPanel = new TabPanel(containerKnot, '.tab-panel', 'details');
 * tabPanel.eventChange = (panelId) => loadContent(panelId);
 * tabPanel.setActive('settings');
 *
 * @see {@link Async} for the async serial execution pipeline
 * @see {@link Deferred} for the promise-like deferred object
 *
 * @category Component
 */
export declare class TabPanel {
    tabPanel: Knot;
    options: {
        selected_tab: string;
        default_tab: string;
    };
    activeTab: string;
    tabs: Query;
    panels: Query;
    /**
     * @description Creates a new TabPanel bound to a DOM container.
     * @param {Knot} dom - The parent DOM element.
     * @param {string} [opt_selector] - CSS selector for the tab panel container.
     * @param {string} [opt_selectedTab] - ID of the initially selected tab.
     * @param {string} [opt_defaultTab] - Fallback tab ID when no match is found.
     */
    constructor(dom: Knot, opt_selector?: string | undefined, opt_selectedTab?: string | undefined, opt_defaultTab?: string | undefined);
    /**
     * @description Initializes tabs and panels, then activates the selected tab.
     */
    private _init;
    /**
     * @description Queries tab anchor elements, wires click handlers, and hides single tabs.
     */
    private _initTabs;
    /**
     * @description Queries panel elements within the tab panel container.
     */
    private _initPanels;
    /**
     * @description Activates the matching panel and tab, deactivating all others.
     * @param {string} panelId - The panel ID or class name to activate.
     */
    private _setActive;
    /**
     * @description Called when the active tab changes. Override to handle tab change events.
     * @param {string} panelId - The ID of the newly active panel.
     *
     * @example
     * tabPanel.eventChange = (panelId) => loadPanelContent(panelId);
     */
    eventChange(panelId: string): void;
    /**
     * @description Activates a tab/panel by ID and fires the eventChange callback asynchronously.
     * @param {string} panelId - The panel ID to activate.
     * @returns {Promize} A promise that resolves after the change event completes.
     *
     * @example
     * tabPanel.setActive('settings').then(() => console.log('Tab changed'));
     */
    setActive(panelId: string): import("../core").Promize<object, object>;
    /**
     * @description Returns the ID of the currently active tab/panel.
     * @returns {string} The active panel ID.
     *
     * @example
     * const activeId = tabPanel.getActive();
     */
    getActive(): string;
}

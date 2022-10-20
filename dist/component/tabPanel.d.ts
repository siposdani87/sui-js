import { Query } from '../core/query';
import { Knot, Promize } from '../core';
/**
 * @class
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
     * @param {!Knot} dom
     * @param {string=} opt_selector
     * @param {string=} opt_selectedTab
     * @param {string=} opt_defaultTab
     */
    constructor(dom: Knot, opt_selector?: string | undefined, opt_selectedTab?: string | undefined, opt_defaultTab?: string | undefined);
    /**
     * @private
     * @return {undefined}
     */
    private _init;
    /**
     * @private
     * @return {undefined}
     */
    private _initTabs;
    /**
     * @private
     * @return {undefined}
     */
    private _initPanels;
    /**
     * @private
     * @param {string} panelId
     * @return {undefined}
     */
    private _setActive;
    /**
     * @param {string} panelId
     * @return {undefined}
     */
    eventChange(panelId: string): void;
    /**
     * @param {string} panelId
     * @return {!Promize}
     */
    setActive(panelId: string): Promize;
    /**
     * @return {string}
     */
    getActive(): string;
}

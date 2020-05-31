goog.provide('SUI.TabPanel');

goog.require('SUI');
goog.require('SUI.Async');
goog.require('SUI.Deferred');
goog.require('SUI.Query');

/**
 * @constructor
 * @export
 * @this {SUI.TabPanel}
 * @param {!SUI.Node} dom
 * @param {string=} opt_selector
 * @param {string=} opt_selectedTab
 * @param {string=} opt_defaultTab
 */
SUI.TabPanel = function(dom, opt_selector = '.tab-panel', opt_selectedTab = '', opt_defaultTab = '') {
  this.tabPanel = new SUI.Query(opt_selector, dom).getItem();
  this.options = {
    selected_tab: opt_selectedTab,
    default_tab: opt_defaultTab || opt_selectedTab,
  };
  this._init();
};

/**
 * @private
 * @return {undefined}
 */
SUI.TabPanel.prototype._init = function() {
  this._initTabs();
  this._initPanels();

  this.activeTab = this.options.selected_tab;
  this._setActive(this.activeTab);
};

/**
 * @private
 * @return {undefined}
 */
SUI.TabPanel.prototype._initTabs = function() {
  this.tabs = new SUI.Query('.tabs a', this.tabPanel);
  this.tabs.each((tab) => {
    const panelId = tab.getAttribute('href').substr(1);
    if (this.tabs.size() === 1) {
      tab.addClass('hidden');
    }
    tab.setData('panel', panelId);
    tab.setAttribute('href', 'javascript:void(0)');
    tab.addEventListener('click', (_tabNode) => {
      this.setActive(panelId);
    });
  });
};

/**
 * @private
 * @return {undefined}
 */
SUI.TabPanel.prototype._initPanels = function() {
  this.panels = new SUI.Query('.panel', this.tabPanel);
};

/**
 * @private
 * @param {string} panelId
 * @return {undefined}
 */
SUI.TabPanel.prototype._setActive = function(panelId) {
  let activeTab = this.options.default_tab;

  this.panels.each((panel) => {
    panel.removeClass('active');
    if (panel.getId() === panelId || panel.hasClass(panelId)) {
      panel.addClass('active');
      activeTab = panelId;
    }
  });

  this.tabs.each((tab) => {
    tab.removeClass('active');
    if (tab.getData('panel') === panelId) {
      tab.addClass('active');
    }
  });

  this.activeTab = activeTab;
};

/**
 * @param {string} panelId
 * @return {undefined}
 */
SUI.TabPanel.prototype.eventChange = function(panelId) {
  console.warn('SUI.TabPanel.eventChange()', panelId);
};

/**
 * @param {string} panelId
 * @return {!SUI.Promise}
 */
SUI.TabPanel.prototype.setActive = function(panelId) {
  const deferred = new SUI.Deferred();
  if (!SUI.isNull(panelId)) {
    this._setActive(/** @type {string} */(panelId));
    const async = new SUI.Async();
    async.serial([() => {
      return this.eventChange(this.getActive());
    }]).defer(deferred);
  } else {
    deferred.reject();
  }
  return deferred.promise();
};

/**
 * @return {string}
 */
SUI.TabPanel.prototype.getActive = function() {
  return this.activeTab;
};

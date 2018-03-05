goog.provide('SUI.TabPanel');

goog.require('SUI');
goog.require('SUI.Async');
goog.require('SUI.Query');

/**
 * @constructor
 * @this {SUI.TabPanel}
 * @param {!SUI.Node} dom
 * @param {string} selected
 * @param {string=} opt_selector
 */
SUI.TabPanel = function(dom, selected, opt_selector = '.tab-panel') {
  this.tabpanel = new SUI.Query(opt_selector, dom).getItem();
  this.options = {
    selected: selected,
  };
  this._init();
};

/**
 * @private
 * @return {undefined}
 */
SUI.TabPanel.prototype._init = function() {
  this._initTabs();
  this._initContents();
  this._setActiveTab(this.options.selected);
};

/**
 * @private
 * @return {undefined}
 */
SUI.TabPanel.prototype._initTabs = function() {
  this.tabs = new SUI.Query('.tabs a', this.tabpanel);
  this.tabs.each((tab) => {
    let panelId = tab.getAttribute('href').substr(1);
    if (this.tabs.size() === 1) {
      tab.addClass('hidden');
    }
    tab.setData('panel', panelId);
    tab.setAttribute('href', 'javascript:void(0)');
    tab.addEventListener('click', (tabNode) => {
      const panelId = tab.getData('panel');
      this.setActive(panelId);
    });
  });
};

/**
 * @private
 * @return {undefined}
 */
SUI.TabPanel.prototype._initContents = function() {
  this.panels = new SUI.Query('.panel', this.tabpanel);
};

/**
 * @private
 * @param {string} panelId
 * @return {undefined}
 */
SUI.TabPanel.prototype._setActiveTab = function(panelId) {
  this.panels.each(function(panel) {
    panel.removeClass('active');
    if (panel.getId() === panelId || panel.hasClass(panelId)) {
      panel.addClass('active');
    }
  });

  this.tabs.each(function(tab) {
    tab.removeClass('active');
    if (tab.getData('panel') === panelId) {
      tab.addClass('active');
    }
  });
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
 * @return {undefined}
 */
SUI.TabPanel.prototype.setActive = function(panelId) {
  if (!SUI.isNull(panelId)) {
    let async = new SUI.Async();
    async.serial([() => {
      return this._setActiveTab(/** @type {string} */(panelId));
    }]).then(() => {
      this.eventChange(/** @type {string} */(panelId));
    });
  }
};

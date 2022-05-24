window['ES_PROD'] = false;

window['componentHandler'] = {
    upgradeDom: () => { },
    upgradeElement: (element: HTMLElement) => { },
    upgradeElements: (elements: HTMLCollection | HTMLElement | HTMLElement[] | NodeList) => { },
    upgradeAllRegistered: () => { },
    registerUpgradedCallback: (jsClass: string, callback: (element: HTMLElement) => any) => { },
    register: (config: any) => { },
    downgradeElements: (nodes: Node | Node[] | NodeList) => { }
};

let logSpy: jest.SpyInstance | null = null;
let errorSpy: jest.SpyInstance | null = null;
let infoSpy: jest.SpyInstance | null = null;

beforeAll(() => {
    logSpy = jest.spyOn(console, 'log').mockImplementation(() => {
        // Empty method
    });

    errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {
        // Empty method
    });

    infoSpy = jest.spyOn(console, 'info').mockImplementation(() => {
        // Empty method
    });

    document.body.innerHTML = `
<div class="flash-container">
  <div id="flashes"></div>
</div>
<div class="hidden" id="confirm">
  <div id="confirm-window">
    <div class="progress-bar"></div>
    <div class="modal-header">
      <h4 class="modal-title"></h4>
      <nav class="navigation">
        <button class="close">
          <em class="material-icons">close</em>
        </button>
      </nav>
    </div>
    <div class="modal-body"></div>
    <div class="modal-footer"></div>
  </div>
</div>
<div class="hidden" id="dialog">
  <div id="dialog-window">
    <div class="progress-bar"></div>
    <div class="modal-header">
      <h4 class="modal-title"></h4>
      <nav class="navigation">
        <button class="minimize hidden">
          <em class="material-icons">fullscreen_exit</em>
        </button>
        <button class="maximize hidden">
          <em class="material-icons">fullscreen</em>
        </button>
        <button class="close">
          <em class="material-icons">close</em>
        </button>
      </nav>
    </div>
    <div class="modal-body"></div>
    <div class="modal-footer"></div>
  </div>
</div>
<div class="hidden" id="viewer">
  <div id="viewer-window">
    <div class="modal-header">
      <h4 class="modal-title"></h4>
      <nav class="navigation">
        <button class="close">
          <em class="material-icons">close</em>
        </button>
      </nav>
    </div>
    <div class="modal-body"></div>
    <div class="modal-footer"></div>
  </div>
</div>
<div class="black" id="left-menu">
  <aside class="main-menu">
    <div class="header">
      <a id="close-left-menu">
        <em class="material-icons size-40">clear</em>
      </a>
      <h3></h3>
    </div>
    <div class="menu-container"></div>
  </aside>
  <aside class="sub-menu">
    <div class="header">
      <a id="close-sub-menu">
        <em class="material-icons size-40">arrow_back</em>
      </a>
      <h3></h3>
    </div>
    <div class="menu-container"></div>
  </aside>
</div>
<div class="main-container">
  <header class="hidden" id="header">
    <div class="menu">
      <a id="open-left-menu">
        <em class="material-icons size-40">menu</em>
      </a>
      <a class="brand">
        <img alt="SUI-JS" src="images/sui_2.png">
        <span class="app-title">SUI-JS</span>
      </a>
      <a id="toggle-top-menu">
        <em class="material-icons size-40">more_vert</em>
      </a>
    </div>
    <div id="top-menu">
      <a href="#"><span class="title">menu-1</span></a>
      <a href="#"><span class="title">menu-2</span></a>
    </div>
    <div class="progress-bar"></div>
  </header>
  <header class="nav-bar-header hidden">
    <div id="nav-bar"></div>
    <a id="toggle-nav-bar">
      <em class="material-icons size-40">menu</em>
    </a>
  </header>
  <div class="hidden" id="loader"></div>
  <div class="progress-bar"></div>
  <div class="flex-container">
    <div class="sidebar hidden" id="left-sidebar">
      <a>
        <em class="material-icons size-48">keyboard_arrow_right</em>
      </a>
      <div class="content">
        left-sidebar
      </div>
    </div>
    <div class="template-view" data-locale="en" data-template-url="/index.html">
    </div>
    <div class="sidebar hidden" id="right-sidebar">
      <a href="javascript:void(0)">
        <em class="material-icons size-48">keyboard_arrow_left</em>
      </a>
      <div class="content">
        right-sidebar
      </div>
    </div>
  </div>
  <footer class="hidden" id="footer">
    <a id="close-bottom-menu" href="javascript:void(0)">
      <em class="material-icons size-40">keyboard_arrow_down</em>
    </a>
    <div class="content"></div>
    <div class="locales"></div>
    <a id="open-bottom-menu" href="javascript:void(0)">
      <em class="material-icons size-40">keyboard_arrow_up</em>
    </a>
    <div id="bottom-menu"></div>
  </footer>
    `;
});

beforeEach(() => {
    // Empty method
});

afterEach(() => {
    // Empty method
});

afterAll(() => {
    logSpy?.mockRestore();
    errorSpy?.mockRestore();
    infoSpy?.mockRestore();
});
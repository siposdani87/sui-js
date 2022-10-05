import { initialize, mockInstances } from '@googlemaps/jest-mocks';
import { setReleaseMode } from './src/common/config';

setReleaseMode(false);

window['componentHandler'] = {
    upgradeDom: () => { },
    upgradeElement: (element: HTMLElement) => { },
    upgradeElements: (elements: HTMLCollection | HTMLElement | HTMLElement[] | NodeList) => { },
    upgradeAllRegistered: () => { },
    registerUpgradedCallback: (jsClass: string, callback: (element: HTMLElement) => any) => { },
    register: (config: any) => { },
    downgradeElements: (nodes: Node | Node[] | NodeList) => { }
};

window['MapLabel'] = function(options) {
    console.log(options);
};

window['MapLabel'].prototype.bindTo = function(attribute, value) {

}

let logSpy: jest.SpyInstance | null = null;
let errorSpy: jest.SpyInstance | null = null;
let infoSpy: jest.SpyInstance | null = null;

beforeAll(() => {
    initialize();

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
        <div class="map"></div>
        <div class="progress-status"></div>
        <div class="pagination">
            <div class="pager"></div>
            <div class="pager-statistics"></div>
        </div>
        <div class="card-collection">
            <template>
                <div class="card">
                </div>
            </template>
        </div>
        <form>
            <div class="input-block field-text">
                <label for="field-text">Text</label>
                <input type="text" value="text" name="field[text]" id="field-text" />
            </div>
            <div class="input-block field-email">
                <label for="field-email">E-mail</label>
                <input type="email" value="example@email.com" name="field[email]" id="field-email" />
            </div>
            <div class="input-block field-tel">
                <label for="field-tel">Tel</label>
                <input type="tel" value="" name="field[tel]" id="field-tel" />
            </div>
            <div class="input-block field-radio">
                <label data-label="Field Radio" for="field-radio-1">Radio1</label>
                <input type="radio" value="value1" checked="checked" name="field[radio]" id="field-radio-1" />
            </div>
            <div class="input-block field-radio">
                 <label for="field-radio-2">Radio2</label>
                 <input type="radio" value="value2" name="field[radio]" id="field-radio-2" />
            </div>
            <div class="input-block field-checkbox">
                <label for="field-checkbox">Checkbox</label>
                <input type="hidden" name="field[checkbox]" value="false" />
                <input type="checkbox" value="true" checked="checked" name="field[checkbox]" id="field-checkbox" />
            </div>
            <div class="input-block field-icon-toggle">
                <label for="field-icon-toggle">Icon Toggle</label>
                <input type="hidden" name="field[icon-toggle]" value="false" />
                <input type="checkbox" value="true" checked="checked" name="field[icon-toggle]" id="field-icon-toggle" data-type="icon-toggle" data-checked="mood"
                data-unchecked="mood_bad" />
            </div>
            <div class="input-block field-switch">
                <label for="field-switch">Switch</label>
                <input type="hidden" name="field[switch]" value="false" />
                <input type="checkbox" value="true" checked="checked" name="field[icon-switch]" id="field-switch" data-type="switch" />
            </div>
            <div class="input-block field-number">
                <label for="field-number">Number</label>
                <input type="number" value="" name="field[number]" id="field-number" />
            </div>
            <div class="input-block field-url">
                <label for="field-url">Url</label>
                <input type="url" value="" name="field[url]" id="field-url" />
            </div>
            <div class="input-block field-range">
                <label for="field-range">Range</label>
                <input type="range" value="" name="field[range]" id="field-range" />
            </div>
            <div class="input-block field-color">
                <label for="field-color">Color</label>
                <input type="color" value="" name="field[color]" id="field-color" />
            </div>
            <div class="input-block field-search">
                <label for="field-search">Search</label>
                <input type="search" value="" name="field[search]" id="field-search" />
            </div>
            <div class="input-block field-file">
                <label for="field-file">File</label>
                <input type="file" value="" accept=".jpg,.png" name="field[file]" id="field-file" />
            </div>
            <div class="input-block field-location">
                <label for="field-location">Location</label>
                <input data-value="{&quot;latitude&quot;:47.7256,&quot;longitude&quot;:17.4900,&quot;address&quot;:&quot;9153 Öttevény&quot;}"
                    data-type="location"
                    data-icon="{&quot;url&quot;:&quot;example/images/location.png&quot;,&quot;size&quot;:[48,48],&quot;origin&quot;:[0,0],&quot;anchor&quot;:[24,48],&quot;coords&quot;:[0,0,0,48,48,48,48,0]}"
                    data-latitude="latitude" data-longitude="longitude" type="text"
                    name="field[location]" id="field-location" />
            </div>
            <div class="input-block field-datetime">
                <label for="field-datetime">Datetime</label>
                <input id="field-datetime" name="field[datetime]" type="datetime"
                    data-format="DD/MM/YYYY HH:mm" value="2019-06-10T10:45:21Z" />
            </div>
            <div class="input-block field-textarea">
                <label for="field-textarea">Textarea</label>
                <textarea name="field[textarea]" id="field-textarea"></textarea>
            </div>
            <div class="input-block field-autocomplete">
                <label for="field-autocomplete">AutoComplete</label>
                <input type="text" value="" name="field[autocomplete]" id="field-autocomplete" />
            </div>
            <div class="input-block field-select">
                <label for="field-select">Select</label>
                <select id="field-select" name="field[select]">
                  <option value="">default</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                </select>
            </div>
            <input type="hidden" value="1" name="field[hidden]" id="field-hidden" />
            <button name="btn-submit" type="submit">Submit</button>
            <button name="btn-button" type="button">Button</button>
            <button name="btn-reset" type="reset">Reset</button>
        </form>
        <div class="table-responsive">
            <table class="users-table">
                <thead>
                    <tr>
                        <th>username</th>
                        <th></th>
                    </tr>
                </thead>
            </table>
        </div>
        <div class="tab-panel">
            <div class="tabs">
                <a href="#panel-1">Panel1</a>
                <a href="#panel-2">Panel2</a>
            </div>
            <div id="panel-1" class="panel"></div>
            <div id="panel-2" class="panel"></div>
        </div>
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
    mockInstances.clearAll();
});

afterEach(() => {
    // Empty method
});

afterAll(() => {
    logSpy?.mockRestore();
    errorSpy?.mockRestore();
    infoSpy?.mockRestore();
});
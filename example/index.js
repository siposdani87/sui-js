const lightThemeKnot = new SUI.Query('#form-panel .light-theme').getKnot();
const darkThemeKnot = new SUI.Query('#form-panel .dark-theme').getKnot();
darkThemeKnot.setHtml(lightThemeKnot.getHtml(true).replace(/light-/g, 'dark-'));

const config = new SUI.Objekt({
    app_id: 'sui-js',
    title: 'application.name',
    locale: 'hu-HU', // 'en-GB',
    backend: window.location.origin,
    production: SUI.releaseMode,
    secret: '484xlj8y4jjöyéö57hk5ghrkleéjx',
    theme_color: '#3f51b5'
});
const app = new SUI.Application(config, SUI.coreResources);

class Service1 {
    name = 'Service1';
    constructor(service2) {
        console.info(this.name);
        console.log({
            service2Name: service2.getName(),
        });
    }

    enter() {
        console.log('Service1.enter()', {
            name: this.name
        });
    }
}

const service1 = app.service('Service1', ['Service2'], Service1);

class Service2 {
    name = 'Service2';
    constructor() {
        console.info(this.name);
    }

    getName() {
        return this.name;
    }
}

const service2 = app.service('Service2', [], Service2);

class Controller1 {
    name = 'Contoller1'
    constructor(instances) {
        console.info(this.name);
        console.log({
            instances
        });
    }

    enter() {
        console.log('Controller1.enter()', {
            name: this.name
        });
    }
}

const controller1 = app.controller('Controller1', ['instances', 'Service1'], Controller1);

const routes = [
    new SUI.Route('page1', 'Page-1', '/page1', controller1),
];

const providers = [
    service1,
    service2,
];

app.setRootState('page1');
app.run(routes, providers);

const form = new SUI.Form();
const inputField = form.findByModel('light-input-text-default');
console.log(inputField.getName());

const tabPanel = new SUI.TabPanel(document, '.tab-panel', 'form-panel');

// --- Components Tab ---

// Table
const componentsKnot = new SUI.Query('#components-panel').getKnot();
const table = new SUI.Table(componentsKnot, '.demo-table', {
    columns: ['name', 'email', 'role', 'actions'],
    sorted: ['name:asc', 'email'],
    row_count: 5,
    calculations: {
        name: function (item) {
            return item.get('name');
        },
        email: function (item) {
            return item.get('email');
        },
        role: function (item) {
            return item.get('role');
        },
    },
});
table.setActions([
    {
        style: function () {
            return ['edit', 'Edit', false, false];
        },
        click: function (item) {
            console.log('Edit:', item.get('name'));
        },
    },
    {
        style: function () {
            return ['delete', 'Delete', false, false];
        },
        click: function (item) {
            console.log('Delete:', item.get('name'));
        },
    },
]);
table.on('action', function (params) {
    console.log('Table action:', params);
    loadTableData();
});
table.render();

function loadTableData() {
    const users = [
        { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin' },
        { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Editor' },
        { id: 3, name: 'Carol White', email: 'carol@example.com', role: 'Viewer' },
        { id: 4, name: 'David Brown', email: 'david@example.com', role: 'Editor' },
        { id: 5, name: 'Eve Davis', email: 'eve@example.com', role: 'Admin' },
        { id: 6, name: 'Frank Miller', email: 'frank@example.com', role: 'Viewer' },
        { id: 7, name: 'Grace Wilson', email: 'grace@example.com', role: 'Editor' },
        { id: 8, name: 'Henry Taylor', email: 'henry@example.com', role: 'Viewer' },
    ];
    const items = users.map(function (u) {
        return new SUI.Objekt(u);
    });
    table.setCount(items.length);
    table.setData(items);
}

// Calendar
const calendarKnot = new SUI.Query('#calendar-container').getKnot();
const calendar = new SUI.Calendar(calendarKnot, {
    date: new Date(),
    type: 'date',
});
calendar.on('click', function (date) {
    console.log('Calendar selected:', date);
});
calendar.draw();

// Clock
const clockKnot = new SUI.Query('#clock-container').getKnot();
const clock = new SUI.Clock(clockKnot, {
    time: new Date(),
    type: 'hour',
});
clock.on('click', function (date) {
    console.log('Clock selected:', date);
});
clock.draw();

// Card Collection
const cardCollectionKnot = new SUI.Query('#card-collection').getKnot();
const cardCollection = new SUI.CardCollection(componentsKnot, '#card-collection', null, {
    row_count: 6,
});
cardCollection.on('action', function (params) {
    console.log('CardCollection action:', params);
    loadCardData();
});
cardCollection.on('cardKnot', function (cardKnot, item) {
    console.log('Card rendered:', item.get('title'));
});
cardCollection.render();

function loadCardData() {
    const cards = [
        { title: 'Getting Started', description: 'Learn the basics of SUI-JS framework.' },
        { title: 'Components', description: 'Explore the built-in UI components.' },
        { title: 'Theming', description: 'Customize with CSS custom properties.' },
        { title: 'Forms', description: 'Build forms with 18+ field types.' },
        { title: 'Routing', description: 'Client-side routing with State.' },
        { title: 'DI Container', description: 'Automatic dependency injection.' },
    ];
    const items = cards.map(function (c) {
        return new SUI.Objekt(c);
    });
    cardCollection.setCount(items.length);
    cardCollection.setData(items);
}

// Progress Status
const progressSuccessKnot = new SUI.Query('#progress-success').getKnot();
const progressSuccess = new SUI.ProgressStatus(componentsKnot, '#progress-success');
progressSuccess.setSuccess('Operation completed successfully.', 'check_circle');

const progressInfoKnot = new SUI.Query('#progress-info').getKnot();
const progressInfo = new SUI.ProgressStatus(componentsKnot, '#progress-info');
progressInfo.setInfo('Processing your request...', 'info');

const progressWarningKnot = new SUI.Query('#progress-warning').getKnot();
const progressWarning = new SUI.ProgressStatus(componentsKnot, '#progress-warning');
progressWarning.setWarning('Disk space is running low.', 'warning');

const progressErrorKnot = new SUI.Query('#progress-error').getKnot();
const progressError = new SUI.ProgressStatus(componentsKnot, '#progress-error');
progressError.setError('Failed to connect to server.', 'error');

// Canvas
const canvasContainer = document.getElementById('canvas-container');
const canvas = new SUI.Canvas();
canvas.setSize(300, 200);
canvasContainer.appendChild(canvas.canvasKnot.getNode());
canvas.drawRectangle(20, 20, 100, 60, 0, {
    fillStyle: '#3f51b5',
    strokeStyle: '#303f9f',
    lineWidth: 2,
});
canvas.drawRectangle(160, 20, 80, 80, 15, {
    fillStyle: '#ff9800',
    strokeStyle: '#f57c00',
    lineWidth: 2,
});
canvas.drawPolygon(80, 150, 30, 6, 0, {
    fillStyle: '#4caf50',
    strokeStyle: '#388e3c',
    lineWidth: 2,
});
canvas.drawPolygon(200, 140, 25, 3, 0, {
    fillStyle: '#e91e63',
    strokeStyle: '#c2185b',
    lineWidth: 2,
});

// Tooltip
var tooltipTopKnot = new SUI.Query('#tooltip-top').getKnot();
var tooltipTop = new SUI.Tooltip(tooltipTopKnot, 'TOP');
tooltipTop.render('Tooltip on top');

var tooltipBottomKnot = new SUI.Query('#tooltip-bottom').getKnot();
var tooltipBottom = new SUI.Tooltip(tooltipBottomKnot, 'BOTTOM');
tooltipBottom.render('Tooltip on bottom');

var tooltipLeftKnot = new SUI.Query('#tooltip-left').getKnot();
var tooltipLeft = new SUI.Tooltip(tooltipLeftKnot, 'LEFT');
tooltipLeft.render('Tooltip on left');

var tooltipRightKnot = new SUI.Query('#tooltip-right').getKnot();
var tooltipRight = new SUI.Tooltip(tooltipRightKnot, 'RIGHT');
tooltipRight.render('Tooltip on right');

// DateTime (year picker)
var datetimeKnot = new SUI.Query('#datetime-container').getKnot();
var dateTime = new SUI.DateTime(datetimeKnot, {
    type: 'year',
    value: new Date().getFullYear().toString(),
});
dateTime.on('click', function (value) {
    console.log('DateTime selected:', value);
});
dateTime.draw();

// Navigation
var navigationKnot = new SUI.Query('#navigation-container').getKnot();
var navigation = new SUI.Navigation(null, {});
navigation.addIcon('nav-home', 'home', 'Home', function () {
    console.log('Navigation: Home clicked');
});
navigation.addIcon('nav-settings', 'settings', 'Settings', function () {
    console.log('Navigation: Settings clicked');
});
navigation.addIcon('nav-search', 'search', 'Search', function () {
    console.log('Navigation: Search clicked');
});
navigation.addIcon('nav-notifications', 'notifications', 'Notifications', function () {
    console.log('Navigation: Notifications clicked');
});
navigation.bindToContainer(navigationKnot);
navigation.setActive('nav-home');

// Dropdown
var dropdownKnot = new SUI.Query('#dropdown-container').getKnot();
var dropdown = new SUI.Dropdown(dropdownKnot);
var dropdownItem = new SUI.Objekt({ id: 1, name: 'Demo Item' });
dropdown.setActions([
    {
        style: function () {
            return ['edit', 'Edit', false, false];
        },
        click: function (item) {
            console.log('Dropdown: Edit', item.get('name'));
        },
    },
    {
        style: function () {
            return ['delete', 'Delete', false, false];
        },
        click: function (item) {
            console.log('Dropdown: Delete', item.get('name'));
        },
    },
    {
        style: function () {
            return ['content_copy', 'Duplicate', false, false];
        },
        click: function (item) {
            console.log('Dropdown: Duplicate', item.get('name'));
        },
    },
    {
        style: function () {
            return ['share', 'Share', false, false];
        },
        click: function (item) {
            console.log('Dropdown: Share', item.get('name'));
        },
    },
], dropdownItem);

// Popup
var popupContainerKnot = new SUI.Query('#popup-container').getKnot();
var popupContent = new SUI.Knot('div');
popupContent.setHtml('<p style="padding: 16px;">This is a popup with a close button.</p>');
var popup = new SUI.Popup(popupContent, popupContainerKnot, true);
popup.on('close', function () {
    console.log('Popup closed');
});

document.getElementById('btn-popup-toggle').addEventListener('click', function (e) {
    e.stopPropagation();
    popup.toggle();
});

// ContentHandler
var contentContainerKnot = new SUI.Query('#content-handler-container').getKnot();
var contentHandler = new SUI.ContentHandler(contentContainerKnot, {
    image_url: 'images/sui_2.png',
    text: 'No items to display.',
});
contentHandler.hide();

document.getElementById('btn-content-show').addEventListener('click', function () {
    contentHandler.show();
});
document.getElementById('btn-content-hide').addEventListener('click', function () {
    contentHandler.hide();
});

// --- Modals & Feedback Tab ---

const flash = app.getInstance('flash');
const confirm = app.getInstance('confirm');
const dialog = app.getInstance('dialog');
const viewer = app.getInstance('viewer');
const loader = app.getInstance('loader');

// Dialog
document.getElementById('btn-open-dialog').addEventListener('click', function () {
    dialog.modalTitle.setHtml('Example Dialog');
    dialog.modalBody.setHtml('<p>This is a dialog with custom content.</p><p>Dialogs can load templates from the server or display inline HTML.</p>');
    dialog.open();
});

// Confirm variants
function openConfirm(type) {
    var titles = {
        normal: 'Confirm Action',
        info: 'Information',
        warning: 'Warning',
        error: 'Error Occurred',
        success: 'Success',
        choice: 'Make a Choice',
    };
    confirm.load(
        'Are you sure you want to proceed with this ' + type + ' action?',
        'OK',
        'Cancel',
        titles[type],
        type,
    );
    confirm.open();
}

document.getElementById('btn-confirm-normal').addEventListener('click', function () {
    openConfirm('normal');
});
document.getElementById('btn-confirm-info').addEventListener('click', function () {
    openConfirm('info');
});
document.getElementById('btn-confirm-warning').addEventListener('click', function () {
    openConfirm('warning');
});
document.getElementById('btn-confirm-error').addEventListener('click', function () {
    openConfirm('error');
});
document.getElementById('btn-confirm-success').addEventListener('click', function () {
    openConfirm('success');
});
document.getElementById('btn-confirm-choice').addEventListener('click', function () {
    openConfirm('choice');
});

// Viewer
document.getElementById('btn-open-viewer').addEventListener('click', function () {
    viewer.loadImage('images/sui_2.png', 'SUI-JS Logo');
});

// Flash messages
document.getElementById('btn-flash-success').addEventListener('click', function () {
    flash.addSuccess('This is a success message.');
});
document.getElementById('btn-flash-info').addEventListener('click', function () {
    flash.addInfo('This is an informational message.');
});
document.getElementById('btn-flash-warning').addEventListener('click', function () {
    flash.addWarning('This is a warning message.');
});
document.getElementById('btn-flash-error').addEventListener('click', function () {
    flash.addError('This is an error message.');
});

// Loader
document.getElementById('btn-loader-show').addEventListener('click', function () {
    loader.show();
    setTimeout(function () {
        loader.hide();
    }, 2000);
});

// Progress Bar
const progressBar = app.getInstance('progressBar');

document.getElementById('btn-progress-indeterminate').addEventListener('click', function () {
    progressBar.show();
    setTimeout(function () {
        progressBar.hide();
    }, 3000);
});

document.getElementById('btn-progress-determinate').addEventListener('click', function () {
    var progress = 0;
    var interval = setInterval(function () {
        progress += 5;
        progressBar.setProgress(progress);
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(function () {
                progressBar.hide(true);
            }, 500);
        }
    }, 100);
});

document.getElementById('btn-progress-buffer').addEventListener('click', function () {
    var progress = 0;
    var buffer = 0;
    var interval = setInterval(function () {
        buffer = Math.min(buffer + 8, 100);
        progress = Math.min(progress + 5, 100);
        progressBar.setBuffer(buffer);
        progressBar.setProgress(progress);
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(function () {
                progressBar.hide(true);
            }, 500);
        }
    }, 100);
});

// --- Header: TopMenu & LeftMenu ---
var header = app.getInstance('header');
var topMenu = app.getInstance('topMenu');
var leftMenu = app.getInstance('leftMenu');

// Populate Left Menu with navigation items
var leftMenuContainer = leftMenu.getMainContainer();
var menuItems = [
    { icon: 'home', label: 'Home' },
    { icon: 'dashboard', label: 'Dashboard' },
    { icon: 'settings', label: 'Settings' },
    { icon: 'person', label: 'Profile' },
    { icon: 'info', label: 'About' },
];
menuItems.forEach(function (item) {
    var link = new SUI.Knot('a');
    link.setAttribute('href', '#');
    if (item.label === 'Settings') {
        link.addEventListener('click', function () {
            leftMenu.openSubMenu('Settings');
        });
    } else {
        link.addEventListener('click', function () {
            console.log('Left menu:', item.label);
            leftMenu.close();
        });
    }
    var imageDiv = new SUI.Knot('div');
    imageDiv.addClass('image');
    var icon = new SUI.Knot('em');
    icon.addClass('material-icons');
    icon.setHtml(item.icon);
    imageDiv.appendChild(icon);
    link.appendChild(imageDiv);
    var span = new SUI.Knot('span');
    span.addClass('title');
    span.setHtml(item.label);
    link.appendChild(span);
    leftMenuContainer.appendChild(link);
});

// Populate Left Sub-Menu
var subMenuContainer = leftMenu.getSubContainer();
var subMenuItems = [
    { icon: 'palette', label: 'Theme' },
    { icon: 'language', label: 'Language' },
    { icon: 'notifications', label: 'Notifications' },
];
subMenuItems.forEach(function (item) {
    var link = new SUI.Knot('a');
    link.setAttribute('href', '#');
    link.addEventListener('click', function () {
        console.log('Sub menu:', item.label);
    });
    var imageDiv = new SUI.Knot('div');
    imageDiv.addClass('image');
    var icon = new SUI.Knot('em');
    icon.addClass('material-icons');
    icon.setHtml(item.icon);
    imageDiv.appendChild(icon);
    link.appendChild(imageDiv);
    var span = new SUI.Knot('span');
    span.addClass('title');
    span.setHtml(item.label);
    link.appendChild(span);
    subMenuContainer.appendChild(link);
});

// --- Services Tab ---

// Depot
const depot = new SUI.Depot('LOCAL', { prefix: 'demo', secret: 'demo-secret' });
const depotLog = document.getElementById('depot-log');

document.getElementById('btn-depot-set').addEventListener('click', function () {
    var key = document.getElementById('depot-key').value;
    var value = document.getElementById('depot-value').value;
    depot.set(key, value);
    depotLog.textContent = 'Set "' + key + '" = "' + value + '"';
});
document.getElementById('btn-depot-get').addEventListener('click', function () {
    var key = document.getElementById('depot-key').value;
    var value = depot.get(key);
    depotLog.textContent = 'Get "' + key + '" → ' + JSON.stringify(value);
});
document.getElementById('btn-depot-remove').addEventListener('click', function () {
    var key = document.getElementById('depot-key').value;
    depot.remove(key);
    depotLog.textContent = 'Removed "' + key + '"';
});

// Cookie
const cookie = new SUI.Cookie({ prefix: 'demo' });
const cookieLog = document.getElementById('cookie-log');

document.getElementById('btn-cookie-set').addEventListener('click', function () {
    var key = document.getElementById('cookie-key').value;
    var value = document.getElementById('cookie-value').value;
    cookie.set(key, value);
    cookieLog.textContent = 'Set "' + key + '" = "' + value + '"';
});
document.getElementById('btn-cookie-get').addEventListener('click', function () {
    var key = document.getElementById('cookie-key').value;
    var value = cookie.get(key);
    cookieLog.textContent = 'Get "' + key + '" → ' + JSON.stringify(value);
});
document.getElementById('btn-cookie-remove').addEventListener('click', function () {
    var key = document.getElementById('cookie-key').value;
    cookie.remove(key);
    cookieLog.textContent = 'Removed "' + key + '"';
});

// EventBus
const eventBus = new SUI.EventBus();
const eventBusLog = document.getElementById('eventbus-log');
var eventBusCounter = 0;
var eventBusCallback = null;

document.getElementById('btn-eventbus-subscribe').addEventListener('click', function () {
    if (eventBusCallback) {
        eventBusLog.textContent += '\nAlready subscribed.';
        return;
    }
    eventBusCallback = eventBus.set('demo.event', function (data) {
        eventBusLog.textContent += '\nReceived: ' + JSON.stringify(data);
        eventBusLog.scrollTop = eventBusLog.scrollHeight;
    });
    eventBusLog.textContent += '\nSubscribed to "demo.event"';
});
document.getElementById('btn-eventbus-unsubscribe').addEventListener('click', function () {
    if (!eventBusCallback) {
        eventBusLog.textContent += '\nNot subscribed.';
        return;
    }
    eventBus.remove('demo.event', eventBusCallback);
    eventBusCallback = null;
    eventBusLog.textContent += '\nUnsubscribed from "demo.event"';
});
document.getElementById('btn-eventbus-publish').addEventListener('click', function () {
    eventBusCounter++;
    eventBus.call('demo.event', [{ message: 'Hello #' + eventBusCounter }]);
    if (!eventBusCallback) {
        eventBusLog.textContent += '\nPublished "demo.event" (no subscribers)';
    }
});

// Browser
var browser = new SUI.Browser();
var browserInfo = document.getElementById('browser-info');
var browserLines = [];
if (browser.isChrome()) browserLines.push('Browser: Chrome');
else if (browser.isFirefox()) browserLines.push('Browser: Firefox');
else if (browser.isSafari()) browserLines.push('Browser: Safari');
else if (browser.isEdge()) browserLines.push('Browser: Edge');
else if (browser.isOpera()) browserLines.push('Browser: Opera');
else browserLines.push('Browser: Other');

if (browser.isMacOS()) browserLines.push('OS: macOS');
else if (browser.isWindows()) browserLines.push('OS: Windows');
else if (browser.isLinux()) browserLines.push('OS: Linux');
else if (browser.isIOS()) browserLines.push('OS: iOS');
else if (browser.isAndroid()) browserLines.push('OS: Android');
else browserLines.push('OS: Other');

browserLines.push('Chromium: ' + browser.isChromium());
browserLines.push('WebKit: ' + browser.isWebkit());
browserInfo.textContent = browserLines.join('\n');

// Screen
var screen = new SUI.Screen({ delay: 250 });
var screenInfo = document.getElementById('screen-info');

function updateScreenInfo() {
    var lines = [];
    lines.push('Width: ' + screen.getWidth() + 'px');
    lines.push('Height: ' + screen.getHeight() + 'px');
    lines.push('Scroll top: ' + screen.getScrollTop() + 'px');
    lines.push('Orientation: ' + screen.getOrientation());
    lines.push('Color scheme: ' + (screen.isColorScheme('dark') ? 'dark' : 'light'));
    screenInfo.textContent = lines.join('\n');
}
updateScreenInfo();

screen.on('resize', function () {
    updateScreenInfo();
});
screen.on('scroll', function () {
    updateScreenInfo();
});
screen.on('orientationChange', function () {
    updateScreenInfo();
});
screen.on('colorSchemeChange', function () {
    updateScreenInfo();
});

// Http / Xhr (Fetch API)
var xhrLog = document.getElementById('xhr-log');

document.getElementById('btn-xhr-get').addEventListener('click', function () {
    var url = document.getElementById('xhr-url').value;
    xhrLog.textContent = 'GET ' + url + ' ...';
    var xhr = new SUI.Xhr();
    xhr.get(url).then(function (response, data) {
        xhrLog.textContent = 'GET ' + url + '\nStatus: ' + response.status + ' ' + response.statusText + '\n\n' + JSON.stringify(data.get(), null, 2);
    }, function (response, data) {
        xhrLog.textContent = 'GET ' + url + '\nError: ' + (response ? response.status : 'Network error') + '\n' + JSON.stringify(data ? data.get() : {}, null, 2);
    });
});

document.getElementById('btn-xhr-post').addEventListener('click', function () {
    var url = 'https://jsonplaceholder.typicode.com/posts';
    var body = { title: 'SUI-JS Demo', body: 'Testing Xhr POST request', userId: 1 };
    xhrLog.textContent = 'POST ' + url + ' ...';
    var xhr = new SUI.Xhr();
    xhr.post(url, body, undefined, { 'Content-Type': 'application/json' }).then(function (response, data) {
        xhrLog.textContent = 'POST ' + url + '\nStatus: ' + response.status + ' ' + response.statusText + '\n\n' + JSON.stringify(data.get(), null, 2);
    }, function (response, data) {
        xhrLog.textContent = 'POST ' + url + '\nError: ' + (response ? response.status : 'Network error') + '\n' + JSON.stringify(data ? data.get() : {}, null, 2);
    });
});

// Scheduler
var scheduler = new SUI.Scheduler();
var schedulerLog = document.getElementById('scheduler-log');
var schedulerTimeInput = document.getElementById('scheduler-time');

// Pre-fill with next minute
var nowDate = new Date();
nowDate.setMinutes(nowDate.getMinutes() + 1);
schedulerTimeInput.value =
    nowDate.getHours().toString().padStart(2, '0') + ':' +
    nowDate.getMinutes().toString().padStart(2, '0');

document.getElementById('btn-scheduler-add').addEventListener('click', function () {
    var time = schedulerTimeInput.value;
    if (!time || !/^\d{2}:\d{2}$/.test(time)) {
        schedulerLog.textContent += '\nInvalid time format (use HH:MM)';
        return;
    }
    scheduler.everyDay(time, function () {
        schedulerLog.textContent += '\n[' + new Date().toLocaleTimeString() + '] Task fired for ' + time;
        schedulerLog.scrollTop = schedulerLog.scrollHeight;
    });
    schedulerLog.textContent += '\nRegistered task for ' + time;
});

document.getElementById('btn-scheduler-stop').addEventListener('click', function () {
    scheduler.stop();
    schedulerLog.textContent += '\nScheduler stopped.';
});

// GeoLocation
var geoLocation = new SUI.GeoLocation();
var geoLog = document.getElementById('geo-log');

document.getElementById('btn-geo-position').addEventListener('click', function () {
    geoLog.textContent = 'Getting position...';
    geoLocation.getPosition().then(function (lat, lng) {
        geoLog.textContent = 'Position:\nLatitude: ' + lat + '\nLongitude: ' + lng;
    }, function () {
        geoLog.textContent = 'Failed to get position. Check browser permissions.';
    });
});

geoLocation.on('change', function (lat, lng, message) {
    geoLog.textContent = 'Watcher update:\nLatitude: ' + lat + '\nLongitude: ' + lng + (message ? '\n' + message : '');
});

geoLocation.on('error', function (message, code) {
    geoLog.textContent = 'Watcher error: ' + message + ' (code: ' + code + ')';
});

document.getElementById('btn-geo-watch').addEventListener('click', function () {
    geoLog.textContent = 'Watcher started...';
    geoLocation.setWatcher();
});

document.getElementById('btn-geo-clear').addEventListener('click', function () {
    geoLocation.clearWatcher();
    geoLog.textContent = 'Watcher stopped.';
});

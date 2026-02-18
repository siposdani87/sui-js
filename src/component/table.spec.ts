import { Knot } from '../core/knot';
import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
import { Table } from './table';
import { Action } from '../utils';

describe('Table', () => {
    let knot: Knot;
    let originalTableHTML: string;

    beforeAll(() => {
        const tableEl = document.querySelector('.users-table');
        if (tableEl) {
            originalTableHTML = tableEl.innerHTML;
        }
    });

    function resetTableDOM(): void {
        const tableEl = document.querySelector(
            '.users-table',
        ) as HTMLTableElement;
        if (tableEl) {
            tableEl.removeAttribute('id');
            tableEl.innerHTML = originalTableHTML;
            const parent = tableEl.closest('.table-responsive');
            if (parent) {
                parent
                    .querySelectorAll('.content-handler')
                    .forEach((el) => el.remove());
                parent
                    .querySelectorAll('.mdl-tooltip')
                    .forEach((el) => el.remove());
            }
        }
    }

    beforeEach(() => {
        resetTableDOM();
        knot = new Query('.template-view').getKnot();
    });

    function createTable(options: object = {}): Table {
        return new Table(knot, 'table', {
            columns: ['username', 'actions'],
            ...options,
        });
    }

    function createAction(
        icon: string,
        title: string,
        disabled: boolean,
        removed: boolean,
        clickFn?: jest.Mock,
    ): Action {
        return {
            style: jest.fn(
                () =>
                    [icon, title, disabled, removed] as [
                        string,
                        string,
                        boolean,
                        boolean,
                    ],
            ),
            click: clickFn || jest.fn(),
        };
    }

    describe('constructor & options', () => {
        it('should be instance of Table', () => {
            const table = createTable();
            expect(table).toBeInstanceOf(Table);
        });

        it('should set default options', () => {
            const table = createTable();
            expect(table.options.row_count).toBe(10);
            expect(table.options.pager_num).toBe(4);
            expect(table.options.sort.order).toBe('desc');
            expect(table.options.sort.column).toBeNull();
        });

        it('should merge custom options', () => {
            const table = createTable({
                row_count: 5,
                pager_num: 3,
            });
            expect(table.options.row_count).toBe(5);
            expect(table.options.pager_num).toBe(3);
        });
    });

    describe('structure initialization', () => {
        it('should create tbody element', () => {
            const table = createTable();
            expect(table.tbody).toBeDefined();
            expect(table.tbody.getNode().tagName).toBe('TBODY');
        });

        it('should create tfoot element', () => {
            const table = createTable();
            expect(table.tfoot).toBeDefined();
            expect(table.tfoot.getNode().tagName).toBe('TFOOT');
        });

        it('should create pager', () => {
            const table = createTable();
            expect(table.pager).toBeDefined();
        });

        it('should assign ID to table if none exists', () => {
            const table = createTable();
            const id = table.tableKnot.getId();
            expect(id).toBeTruthy();
            expect(id).toContain('table');
        });

        it('should create content handler', () => {
            const table = createTable();
            expect(table.contentHandler).toBeDefined();
        });

        it('should initialize header texts from th elements', () => {
            const table = createTable();
            expect(table.headerTexts.length).toBe(2);
            expect(table.headerTexts[0]).toContain('username');
        });

        it('should initialize empty collection', () => {
            const table = createTable();
            expect(table.collection.size()).toBe(0);
        });

        it('should initialize empty query string', () => {
            const table = createTable();
            expect(table.query).toBe('');
        });
    });

    describe('setData', () => {
        it('should show content handler when data is empty', () => {
            const table = createTable();
            const showSpy = jest.spyOn(table.contentHandler, 'show');
            table.setData([]);
            expect(showSpy).toHaveBeenCalled();
        });

        it('should hide content handler when data is provided', () => {
            const table = createTable();
            const hideSpy = jest.spyOn(table.contentHandler, 'hide');
            table.setData([{ username: 'alice' }]);
            expect(hideSpy).toHaveBeenCalled();
        });

        it('should reload collection with items', () => {
            const table = createTable();
            table.setData([{ username: 'alice' }, { username: 'bob' }]);
            expect(table.collection.size()).toBe(2);
        });

        it('should render rows in tbody', () => {
            const table = createTable();
            table.setData([{ username: 'alice' }]);
            const rows = table.tbody.getNode().querySelectorAll('tr');
            expect(rows.length).toBeGreaterThan(0);
        });

        it('should clear previous rows when setting new data', () => {
            const table = createTable();
            table.setData([{ username: 'alice' }, { username: 'bob' }]);
            table.setData([{ username: 'charlie' }]);
            const rows = table.tbody.getNode().querySelectorAll('tr');
            expect(rows.length).toBe(2);
        });
    });

    describe('setCount', () => {
        it('should set count on pager', () => {
            const table = createTable();
            const setCountSpy = jest.spyOn(table.pager, 'setCount');
            table.setCount(50);
            expect(setCountSpy).toHaveBeenCalledWith(50);
        });

        it('should call pager draw', () => {
            const table = createTable();
            const drawSpy = jest.spyOn(table.pager, 'draw');
            table.setCount(50);
            expect(drawSpy).toHaveBeenCalled();
        });
    });

    describe('row rendering', () => {
        it('should render header and data rows for each item', () => {
            const table = createTable();
            table.setData([{ username: 'alice' }]);
            const rows = table.tbody.getNode().querySelectorAll('tr');
            expect(rows.length).toBe(2);
        });

        it('should add header class to header rows', () => {
            const table = createTable();
            table.setData([{ username: 'alice' }]);
            const headerRow = table.tbody.getNode().querySelector('tr.header');
            expect(headerRow).not.toBeNull();
        });

        it('should add data class to data rows', () => {
            const table = createTable();
            table.setData([{ username: 'alice' }]);
            const dataRow = table.tbody.getNode().querySelector('tr.data');
            expect(dataRow).not.toBeNull();
        });

        it('should render item property values in data cells', () => {
            const table = createTable();
            table.setData([{ username: 'alice' }]);
            const dataRow = table.tbody.getNode().querySelector('tr.data');
            expect(dataRow?.textContent).toContain('alice');
        });

        it('should render multiple items as separate row pairs', () => {
            const table = createTable();
            table.setData([{ username: 'alice' }, { username: 'bob' }]);
            const headerRows = table.tbody
                .getNode()
                .querySelectorAll('tr.header');
            const dataRows = table.tbody.getNode().querySelectorAll('tr.data');
            expect(headerRows.length).toBe(2);
            expect(dataRows.length).toBe(2);
        });

        it('should use calculation functions for computed columns', () => {
            const calcFn = jest.fn((item: Objekt) =>
                item.get<string>('username', '').toUpperCase(),
            );
            const table = createTable({
                calculations: { username: calcFn },
            });
            table.setData([{ username: 'alice' }]);
            expect(calcFn).toHaveBeenCalled();
        });
    });

    describe('row styles', () => {
        it('should apply array of custom row styles', () => {
            const table = createTable({
                rowStyle: () => ['highlight', 'important'],
            });
            table.setData([{ username: 'alice' }]);
            const headerRow = table.tbody.getNode().querySelector('tr.header');
            expect(headerRow?.classList.contains('highlight')).toBe(true);
            expect(headerRow?.classList.contains('important')).toBe(true);
        });

        it('should apply single string row style', () => {
            const table = createTable({
                rowStyle: () => 'custom-style',
            });
            table.setData([{ username: 'alice' }]);
            const dataRow = table.tbody.getNode().querySelector('tr.data');
            expect(dataRow?.classList.contains('custom-style')).toBe(true);
        });

        it('should not add extra classes when rowStyle is not set', () => {
            const table = createTable();
            table.setData([{ username: 'alice' }]);
            const dataRow = table.tbody.getNode().querySelector('tr.data');
            expect(dataRow?.classList.contains('data')).toBe(true);
            expect(dataRow?.classList.length).toBe(1);
        });
    });

    describe('actions', () => {
        it('should store actions array', () => {
            const table = createTable();
            const actions = [createAction('edit', 'Edit', false, false)];
            table.setActions(actions);
            expect(table.actions).toEqual(actions);
        });

        it('should render action buttons when actions <= 3', () => {
            const table = createTable();
            table.setActions([
                createAction('edit', 'Edit', false, false),
                createAction('delete', 'Delete', false, false),
            ]);
            table.setData([{ username: 'alice' }]);
            const buttons = table.tbody
                .getNode()
                .querySelectorAll('td.actions button');
            expect(buttons.length).toBeGreaterThan(0);
        });

        it('should render dropdown when actions > 3', () => {
            const table = createTable();
            table.setActions([
                createAction('edit', 'Edit', false, false),
                createAction('delete', 'Delete', false, false),
                createAction('view', 'View', false, false),
                createAction('copy', 'Copy', false, false),
            ]);
            table.setData([{ username: 'alice' }]);
            const dropdowns = table.tbody
                .getNode()
                .querySelectorAll('.dropDown');
            expect(dropdowns.length).toBeGreaterThan(0);
        });

        it('should call action click handler on button click', () => {
            const clickFn = jest.fn();
            const table = createTable();
            table.setActions([
                createAction('edit', 'Edit', false, false, clickFn),
            ]);
            table.setData([{ username: 'alice' }]);
            const dataRow = table.tbody.getNode().querySelector('tr.data');
            const button = dataRow?.querySelector('td.actions button');
            button?.dispatchEvent(new Event('click'));
            expect(clickFn).toHaveBeenCalled();
        });

        it('should disable button when action style returns disabled', () => {
            const table = createTable();
            table.setActions([createAction('edit', 'Edit', true, false)]);
            table.setData([{ username: 'alice' }]);
            const dataRow = table.tbody.getNode().querySelector('tr.data');
            const button = dataRow?.querySelector('td.actions button');
            expect(button?.hasAttribute('disabled')).toBe(true);
        });

        it('should not render button when action style returns removed', () => {
            const table = createTable();
            table.setActions([createAction('edit', 'Edit', false, true)]);
            table.setData([{ username: 'alice' }]);
            const dataRow = table.tbody.getNode().querySelector('tr.data');
            const buttons = dataRow?.querySelectorAll('td.actions button');
            expect(buttons?.length).toBe(0);
        });
    });

    describe('sorting', () => {
        it('should add sort icons to sortable columns', () => {
            const table = createTable({
                columns: ['username', 'actions'],
                sorted: ['username'],
            });
            const icons = table.tableKnot
                .getNode()
                .querySelectorAll('thead th .icons');
            expect(icons.length).toBe(1);
        });

        it('should call eventAction on sortable column click', () => {
            const table = createTable({
                columns: ['username', 'actions'],
                sorted: ['username'],
            });
            const eventActionSpy = jest.fn();
            table.eventAction = eventActionSpy;

            const firstTh = table.tableKnot.getNode().querySelector('thead th');
            firstTh?.dispatchEvent(new Event('click'));

            expect(eventActionSpy).toHaveBeenCalled();
            const params = eventActionSpy.mock.calls[0][0];
            expect(params.get('column')).toBe('username');
        });

        it('should alternate sort direction on repeated clicks', () => {
            const table = createTable({
                columns: ['username', 'actions'],
                sorted: ['username'],
            });
            const eventActionSpy = jest.fn();
            table.eventAction = eventActionSpy;

            const firstTh = table.tableKnot.getNode().querySelector('thead th');

            firstTh?.dispatchEvent(new Event('click'));
            const firstOrder = eventActionSpy.mock.calls[0][0].get('order');

            firstTh?.dispatchEvent(new Event('click'));
            const secondOrder = eventActionSpy.mock.calls[1][0].get('order');

            expect(firstOrder).not.toBe(secondOrder);
        });

        it('should mark active sort icon', () => {
            const table = createTable({
                columns: ['username', 'actions'],
                sorted: ['username'],
            });
            table.eventAction = jest.fn();

            const firstTh = table.tableKnot.getNode().querySelector('thead th');
            firstTh?.dispatchEvent(new Event('click'));

            const activeIcon = table.tableKnot
                .getNode()
                .querySelector('thead th .icons em.active');
            expect(activeIcon).not.toBeNull();
        });
    });

    describe('search', () => {
        it('should create search input when last column is search', () => {
            const table = createTable({
                columns: ['username', 'search'],
            });
            const searchInput = table.tableKnot
                .getNode()
                .querySelector('#table-search');
            expect(searchInput).not.toBeNull();
        });

        it('should not create search input when last column is not search', () => {
            const table = createTable({
                columns: ['username', 'actions'],
            });
            const searchInput = table.tableKnot
                .getNode()
                .querySelector('#table-search');
            expect(searchInput).toBeNull();
        });

        it('should update query and refresh on Enter key', () => {
            const table = createTable({
                columns: ['username', 'search'],
            });
            const eventActionSpy = jest.fn();
            table.eventAction = eventActionSpy;

            const searchInput = table.tableKnot
                .getNode()
                .querySelector('#table-search') as HTMLInputElement;
            searchInput.value = 'test query';
            searchInput.dispatchEvent(
                new KeyboardEvent('keypress', { keyCode: 13 }),
            );

            expect(table.query).toBe('test query');
            expect(eventActionSpy).toHaveBeenCalled();
        });
    });

    describe('refresh', () => {
        it('should call eventAction with query params', () => {
            const table = createTable();
            const eventActionSpy = jest.fn();
            table.eventAction = eventActionSpy;

            table.refresh();

            expect(eventActionSpy).toHaveBeenCalled();
            const params = eventActionSpy.mock.calls[0][0];
            expect(params.get('query')).toBe('');
            expect(params.get('limit')).toBe(10);
        });

        it('should set page on pager when page > -1', () => {
            const table = createTable();
            const setPageSpy = jest.spyOn(table.pager, 'setPage');
            table.eventAction = jest.fn();

            table.refresh(2);

            expect(setPageSpy).toHaveBeenCalledWith(2);
        });

        it('should not set page when page is -1', () => {
            const table = createTable();
            const setPageSpy = jest.spyOn(table.pager, 'setPage');
            table.eventAction = jest.fn();

            table.refresh();

            expect(setPageSpy).not.toHaveBeenCalled();
        });
    });

    describe('render', () => {
        it('should call eventAction via updateSorting', () => {
            const table = createTable({
                columns: ['username', 'actions'],
                sorted: ['username'],
            });
            const eventActionSpy = jest.fn();
            table.eventAction = eventActionSpy;

            table.render();

            expect(eventActionSpy).toHaveBeenCalled();
        });
    });
});

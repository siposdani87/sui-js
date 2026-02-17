import { Depot } from './depot';

describe('Depot', () => {
    describe('LOCAL storage', () => {
        let depot: Depot;

        beforeEach(() => {
            window.localStorage.clear();
            depot = new Depot('LOCAL', { prefix: 'test', secret: 'key' });
        });

        afterEach(() => {
            window.localStorage.clear();
        });

        it('should be instance of Depot', () => {
            expect(depot).toBeInstanceOf(Depot);
        });

        it('should use localStorage', () => {
            expect(depot.type).toBe('LOCAL');
        });

        it('should set and get a string value', () => {
            depot.set('name', 'hello');
            expect(depot.get('name')).toBe('hello');
        });

        it('should set and get a numeric value', () => {
            depot.set('count', 42);
            expect(depot.get('count')).toBe(42);
        });

        it('should set and get an object value', () => {
            const obj = { key: 'value' };
            depot.set('data', obj);
            expect(depot.get('data')).toEqual(obj);
        });

        it('should return null for non-existent key', () => {
            expect(depot.get('missing')).toBeNull();
        });

        it('should remove a key', () => {
            depot.set('toRemove', 'data');
            depot.remove('toRemove');
            expect(depot.get('toRemove')).toBeNull();
        });

        it('should clear all items', () => {
            depot.set('a', '1');
            depot.set('b', '2');
            depot.clear();
            expect(depot.get('a')).toBeNull();
            expect(depot.get('b')).toBeNull();
        });

        it('should set item with custom expiry', () => {
            depot.set('expiring', 'data', 48);
            expect(depot.get('expiring')).toBe('data');
        });

        it('should use prefix for property names', () => {
            depot.set('key', 'val');
            const keys = Object.keys(window.localStorage);
            expect(keys.some((k) => k.startsWith('test.'))).toBe(true);
        });
    });

    describe('SESSION storage', () => {
        let depot: Depot;

        beforeEach(() => {
            window.sessionStorage.clear();
            depot = new Depot('SESSION', { prefix: 'sess', secret: 'key' });
        });

        afterEach(() => {
            window.sessionStorage.clear();
        });

        it('should use sessionStorage', () => {
            expect(depot.type).toBe('SESSION');
        });

        it('should set and get a value', () => {
            depot.set('item', 'test');
            expect(depot.get('item')).toBe('test');
        });

        it('should remove a value', () => {
            depot.set('item', 'test');
            depot.remove('item');
            expect(depot.get('item')).toBeNull();
        });
    });
});

import { Knot, Query, Collection, Objekt, Router, Deferred } from './core';
import { EventBus } from './module/eventBus';
import { Depot } from './module/depot';
import { Cookie } from './module/cookie';
import { GeoLocation } from './module/geoLocation';
import { DateIO } from './utils/dateio';

describe('Error scenarios and failure modes', () => {
    describe('Query with missing DOM element', () => {
        it('should return empty Knot for non-existent selector', () => {
            const query = new Query('#nonexistent-element');
            const knot = query.getKnot();
            expect(knot.isEmpty()).toBe(true);
        });

        it('should handle getKnots with no matches', () => {
            const query = new Query('.no-match-class');
            const knots = query.getKnots();
            expect(knots).toEqual([]);
        });
    });

    describe('Knot null/undefined operations', () => {
        it('should handle operations on empty Knot gracefully', () => {
            const query = new Query('#nonexistent');
            const knot = query.getKnot();
            expect(knot.isEmpty()).toBe(true);
        });

        it('should create Knot from tag name', () => {
            const knot = new Knot('div');
            expect(knot.isEmpty()).toBe(false);
        });

        it('should handle getAttribute on valid element', () => {
            const knot = new Knot('div');
            const attr = knot.getAttribute('data-missing');
            expect(attr).toBeFalsy();
        });
    });

    describe('Router with malformed URLs', () => {
        it('should handle empty string URL', () => {
            const router = new Router('');
            expect(router).toBeDefined();
        });

        it('should handle URL with no parameters', () => {
            const router = new Router('/simple/path');
            const result = router.stringify({});
            expect(result).toBe('/simple/path');
        });

        it('should handle URL with missing parameter values', () => {
            const router = new Router('/users/:id');
            const result = router.stringify({});
            expect(result).toContain('/users/');
        });

        it('should return null matches for non-matching path', () => {
            const router = new Router('/users/:id');
            const matches = router.getMatches('/completely/different');
            expect(matches).toBeNull();
        });
    });

    describe('Collection operations on empty collection', () => {
        it('should handle get on empty collection', () => {
            const collection = new Collection([], Objekt);
            expect(collection.get(0)).toBeNull();
        });

        it('should handle get with out-of-bounds index', () => {
            const collection = new Collection([], Objekt);
            expect(collection.get(999)).toBeNull();
        });

        it('should handle each on empty collection', () => {
            const collection = new Collection([], Objekt);
            const spy = jest.fn();
            collection.each(spy);
            expect(spy).not.toHaveBeenCalled();
        });

        it('should handle clear on empty collection', () => {
            const collection = new Collection([], Objekt);
            expect(() => collection.clear()).not.toThrow();
        });

        it('should handle size on empty collection', () => {
            const collection = new Collection([], Objekt);
            expect(collection.size()).toBe(0);
        });
    });

    describe('EventBus handler errors', () => {
        it('should handle calling event with no subscribers', () => {
            const eventBus = new EventBus();
            expect(() => eventBus.call('no-event')).not.toThrow();
        });

        it('should handle removing non-existent event', () => {
            const eventBus = new EventBus();
            expect(() => eventBus.remove('no-event', jest.fn())).not.toThrow();
        });

        it('should handle popping from non-existent event', () => {
            const eventBus = new EventBus();
            expect(() => eventBus.pop('no-event')).not.toThrow();
        });
    });

    describe('Depot storage errors', () => {
        it('should handle getting non-existent key from LOCAL depot', () => {
            const depot = new Depot('LOCAL', { prefix: 'err-test' });
            const value = depot.get('nonexistent');
            expect(value).toBeNull();
        });

        it('should handle getting non-existent key from SESSION depot', () => {
            const depot = new Depot('SESSION', { prefix: 'err-test' });
            const value = depot.get('nonexistent');
            expect(value).toBeNull();
        });

        it('should handle removing non-existent key', () => {
            const depot = new Depot('LOCAL', { prefix: 'err-test' });
            expect(() => depot.remove('nonexistent')).not.toThrow();
        });

        it('should handle clearing empty depot', () => {
            const depot = new Depot('LOCAL', { prefix: 'err-test' });
            expect(() => depot.clear()).not.toThrow();
        });
    });

    describe('Cookie edge cases', () => {
        it('should handle getting non-existent cookie', () => {
            const cookie = new Cookie({ prefix: 'err-test' });
            const value = cookie.get('nonexistent');
            expect(value).toBeNull();
        });

        it('should handle removing non-existent cookie', () => {
            const cookie = new Cookie({ prefix: 'err-test' });
            expect(() => cookie.remove('nonexistent')).not.toThrow();
        });

        it('should handle hasKey for non-existent key', () => {
            const cookie = new Cookie({ prefix: 'err-test' });
            expect(cookie.hasKey('nonexistent')).toBe(false);
        });
    });

    describe('DateIO edge cases', () => {
        it('should handle null date input', () => {
            const result = DateIO.parse(null as any);
            expect(result).toBeDefined();
        });

        it('should handle undefined date input', () => {
            const result = DateIO.parse(undefined as any);
            expect(result).toBeDefined();
        });

        it('should handle empty string date input', () => {
            const result = DateIO.parse('');
            expect(result).toBeDefined();
        });

        it('should format valid date without error', () => {
            const date = DateIO.parse('2024-01-15');
            expect(() => DateIO.format(date, 'yyyy-MM-dd')).not.toThrow();
        });
    });

    describe('Deferred edge cases', () => {
        it('should not throw on double resolve', () => {
            const deferred = new Deferred<string>();
            const spy = jest.fn();
            deferred.promise().then(spy);
            deferred.resolve('first');
            expect(() => deferred.resolve('second')).not.toThrow();
        });

        it('should handle then without reject handler', () => {
            const deferred = new Deferred<string, string>();
            const spy = jest.fn();
            deferred.promise().then(spy);
            expect(() => deferred.reject('error')).not.toThrow();
        });

        it('should handle resolve with no data', () => {
            const deferred = new Deferred();
            const spy = jest.fn();
            deferred.promise().then(spy);
            expect(() => deferred.resolve()).not.toThrow();
            expect(spy).toHaveBeenCalled();
        });
    });

    describe('Objekt edge cases', () => {
        it('should handle get with deeply nested missing key', () => {
            const obj = new Objekt({ a: { b: 1 } });
            const result = obj.get('a.b.c.d.e', 'default');
            expect(result).toBe('default');
        });

        it('should handle merge with empty object', () => {
            const obj = new Objekt({ key: 'value' });
            expect(() => obj.merge({})).not.toThrow();
            expect(obj.get('key')).toBe('value');
        });

        it('should handle merge with undefined', () => {
            const obj = new Objekt({ key: 'value' });
            expect(() => obj.merge(undefined)).not.toThrow();
        });
    });

    describe('GeoLocation permission errors', () => {
        let mockGeolocation: any;

        beforeEach(() => {
            mockGeolocation = {
                getCurrentPosition: jest.fn(),
                watchPosition: jest.fn(),
                clearWatch: jest.fn(),
            };
            Object.defineProperty(navigator, 'geolocation', {
                value: mockGeolocation,
                writable: true,
                configurable: true,
            });
        });

        it('should handle geolocation instantiation', () => {
            const geo = new GeoLocation();
            expect(geo).toBeDefined();
        });

        it('should have getPosition method', () => {
            const geo = new GeoLocation();
            expect(typeof geo.getPosition).toBe('function');
        });
    });
});

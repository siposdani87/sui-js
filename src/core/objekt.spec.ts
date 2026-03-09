import { Objekt } from './objekt';

describe('Objekt', () => {
    it('should be instance of Objekt', () => {
        const objekt = new Objekt();
        expect(objekt).toBeInstanceOf(Objekt);
    });

    it('should instantiate with data', () => {
        const objekt = new Objekt({ name: 'test' });
        expect(objekt.get('name')).toBe('test');
    });

    describe('merge', () => {
        it('should merge properties deeply', () => {
            const options = new Objekt({
                attr: null,
                obj: {
                    attr2: 1,
                    attr4: 3,
                },
            });
            expect(options.attr).toBe(null);

            options.merge({
                attr: 'value1',
                obj: {
                    attr2: 2,
                    attr3: null,
                },
            });
            expect(options.attr).toBe('value1');
            expect(options.obj.attr2).toBe(2);
            expect(options.obj.attr3).toBe(null);
            expect(options.obj.attr4).toBe(3);
        });

        it('should handle merging undefined', () => {
            const objekt = new Objekt({ a: 1 });
            objekt.merge(undefined);
            expect(objekt.get('a')).toBe(1);
        });
    });

    describe('type casting', () => {
        it('should cast string values to typed values', () => {
            const options = new Objekt({
                attr: 'null',
                obj: {
                    attr2: '1',
                    attr3: '3.2',
                },
                attr4: 'false',
                attr5: 'true',
                attr6: 'string123,456.789',
                attr7: undefined,
                attr8: null,
                attr9: '1e+3',
                attr10: '1e-3',
                attr11: '1E3',
                attr12: '2e234',
                attr13: '8e23467',
            });
            expect(options.attr).toBe(null);
            expect(options.obj.attr2).toBe(1);
            expect(options.obj.attr3).toBe(3.2);
            expect(options.attr4).toBe(false);
            expect(options.attr5).toBe(true);
            expect(options.attr6).toBe('string123,456.789');
            expect(options.attr7).toBe(undefined);
            expect(options.attr8).toBe(null);
            expect(options.attr9).toBe(1e3);
            expect(options.attr10).toBe(1e-3);
            expect(options.attr11).toBe(1e3);
            expect(options.attr12).toBe(2e234);
            expect(options.attr13).toBe('8e23467');
        });
    });

    describe('get', () => {
        it('should get nested values with dot notation', () => {
            const options = new Objekt({
                attr: null,
                obj: {
                    attr2: 1,
                    obj2: {
                        attr4: 2,
                        attr3: 3.2,
                        attr5: 4.5,
                    },
                },
                arr: [
                    {
                        attr1: -4,
                    },
                ],
            });
            expect(options.get('attr')).toBe(null);
            expect(options.get('obj.attr2')).toBe(1);
            expect(options.get('obj.obj2.attr3')).toBe(3.2);
            expect(options.get('arr.0.attr1')).toBe(-4);
        });

        it('should return undefined for non-existent nested path', () => {
            const options = new Objekt({ obj: { attr: 1 } });
            expect(options.get('obj.nonexistent')).toBeUndefined();
        });

        it('should return default value when provided', () => {
            const options = new Objekt({});
            expect(options.get('missing', 'fallback')).toBe('fallback');
        });
    });

    describe('set', () => {
        it('should set nested values with dot notation', () => {
            const options = new Objekt({
                attr: 0,
                obj: {
                    attr2: 0,
                    obj2: {
                        attr3: 0,
                    },
                },
                other: {
                    attr4: 32,
                },
                other2: {
                    other3: {
                        attr5: 13,
                        attr6: 'title',
                    },
                },
            });
            options.set('attr', null);
            expect(options.get('attr')).toBe(null);

            options.set('obj.attr2', 1);
            expect(options.get('obj.attr2')).toBe(1);

            options.set('obj.obj2.attr3', 3.2);
            expect(options.get('obj.obj2.attr3')).toBe(3.2);

            options.set('obj.obj3', 5);
            expect(options.get('obj.obj3')).toBe(5);

            options.set('other', null);
            expect(options.get('other')).toBe(null);

            options.set('other2.other3', null);
            expect(options.get('other2.other3')).toBe(null);
        });
    });

    describe('remove', () => {
        it('should remove values at nested paths', () => {
            const options = new Objekt({
                attr: 0,
                obj: {
                    attr2: 0,
                    obj2: {
                        attr3: 0,
                    },
                },
            });
            options.remove('attr');
            expect(options.get('attr')).toBe(undefined);

            options.remove('obj.attr2');
            expect(options.get('obj.attr2')).toBe(undefined);

            options.remove('obj.obj2.attr3');
            expect(options.get('obj.obj2.attr3')).toBe(undefined);
        });

        it('should handle removing non-existent key', () => {
            const options = new Objekt({ a: 1 });
            options.remove('obj.obj3');
            expect(options.get('obj.obj3')).toBe(undefined);
        });
    });

    describe('copy', () => {
        it('should create a deep copy', () => {
            const options = new Objekt({
                attr: false,
                obj: {
                    attr2: 0,
                    obj2: {
                        attr3: 3,
                    },
                    arr: [],
                },
                arr2: [2, 0, 1],
                arr3: [],
                obj3: {
                    attr4: null,
                },
            });

            options.set('attr', true);
            options.set('obj.attr2', 2);

            const optionsCopy = options.copy();
            expect(options).toEqual(optionsCopy);

            optionsCopy.remove('obj.attr2');
            expect(options).not.toEqual(optionsCopy);
            expect(options.get('obj.attr2')).toBe(2);

            const optionsCopyClone = new Objekt(optionsCopy);
            expect(optionsCopy.get('obj.arr')).toEqual([]);
            expect(optionsCopyClone.get('arr2')).toEqual([2, 0, 1]);
            expect(optionsCopyClone.get('arr3')).toEqual([]);
        });
    });

    describe('copyObject', () => {
        it('should create a plain object copy', () => {
            const options = new Objekt({
                attr: false,
                obj: {
                    attr2: 0,
                    obj2: {
                        attr3: 3,
                    },
                    arr: [],
                },
                arr2: [2, 0, 1],
                arr3: [],
                obj3: {
                    attr4: null,
                },
            });

            options.set('attr', true);
            options.set('obj.attr2', 2);

            const optionsCopy = new Objekt(options.copyObject());
            expect(options).toEqual(optionsCopy);

            optionsCopy.remove('obj.attr2');
            expect(options).not.toEqual(optionsCopy);
            expect(options.get('obj.attr2')).toBe(2);

            const optionsCopyClone = new Objekt(optionsCopy);
            expect(optionsCopy.get('obj.arr')).toEqual([]);
            expect(optionsCopyClone.get('arr2')).toEqual([2, 0, 1]);
            expect(optionsCopyClone.get('arr3')).toEqual([]);
        });
    });

    describe('isEmpty', () => {
        it('should return true for empty object', () => {
            const objekt = new Objekt({});
            expect(objekt.isEmpty()).toBe(true);
        });

        it('should return false for non-empty object', () => {
            const objekt = new Objekt({ a: 1 });
            expect(objekt.isEmpty()).toBe(false);
        });
    });

    describe('each', () => {
        it('should iterate over leaf values with dot-notation keys', () => {
            const objekt = new Objekt({
                a: 1,
                b: { c: 2, d: { e: 3 } },
            });
            const entries: Array<[unknown, string]> = [];
            objekt.each((value, key) => {
                entries.push([value, key]);
            });
            expect(entries).toContainEqual([1, 'a']);
            expect(entries).toContainEqual([2, 'b.c']);
            expect(entries).toContainEqual([3, 'b.d.e']);
        });

        it('should iterate over array values', () => {
            const objekt = new Objekt({
                arr: [10, 20],
            });
            const entries: Array<[unknown, string]> = [];
            objekt.each((value, key) => {
                entries.push([value, key]);
            });
            expect(entries).toContainEqual([10, 'arr.0']);
            expect(entries).toContainEqual([20, 'arr.1']);
        });
    });

    describe('allowKeys', () => {
        it('should keep only allowed keys', () => {
            const objekt = new Objekt({
                name: 'Alice',
                age: 30,
                role: 'admin',
            });
            const filtered = objekt.allowKeys(['name', 'role']);
            expect(filtered.get('name')).toBe('Alice');
            expect(filtered.get('role')).toBe('admin');
            expect(filtered.get('age')).toBeUndefined();
        });
    });

    describe('denyKeys', () => {
        it('should exclude denied keys', () => {
            const objekt = new Objekt({
                name: 'Alice',
                password: 'secret',
                role: 'admin',
            });
            const safe = objekt.denyKeys(['password']);
            expect(safe.get('name')).toBe('Alice');
            expect(safe.get('role')).toBe('admin');
            expect(safe.get('password')).toBeUndefined();
        });
    });

    describe('filterKeys', () => {
        it('should filter based on condition', () => {
            const objekt = new Objekt({ a: 1, b: 2, c: 3 });
            const result = objekt.filterKeys(objekt, (key) => key !== 'b');
            expect(result.get('a')).toBe(1);
            expect(result.get('c')).toBe(3);
            expect(result.get('b')).toBeUndefined();
        });

        it('should handle nested objects in filtering', () => {
            const objekt = new Objekt({
                user: { name: 'Alice', email: 'a@b.com' },
                role: 'admin',
            });
            const result = objekt.filterKeys(objekt, (key) =>
                key.startsWith('user.'),
            );
            expect(result.get('user.name')).toBe('Alice');
            expect(result.get('user.email')).toBe('a@b.com');
            expect(result.get('role')).toBeUndefined();
        });
    });

    describe('set with array paths', () => {
        it('should set values in nested arrays', () => {
            const objekt = new Objekt({
                items: [{ id: 1 }, { id: 2 }],
            });
            objekt.set('items.0.id', 10);
            expect(objekt.get('items.0.id')).toBe(10);
        });
    });

    describe('get edge cases', () => {
        it('should return undefined for path through primitive', () => {
            const objekt = new Objekt({ a: 'hello' });
            expect(objekt.get('a.b.c')).toBeUndefined();
        });
    });

    describe('setRaw', () => {
        it('should set raw value at a dot-notation path', () => {
            const objekt = new Objekt({});
            const rawVal = { complex: true };
            objekt.setRaw('data', rawVal);
            expect(objekt.get('data')).toBe(rawVal);
        });

        it('should set raw value without splitting on dots', () => {
            const objekt = new Objekt({ container: null });
            const el = document.createElement('div');
            objekt.setRaw('container', el);
            expect(objekt.get('container')).toBe(el);
        });
    });

    describe('clear', () => {
        it('should remove all properties', () => {
            const objekt = new Objekt({ x: 1, y: 2 });
            objekt.clear();
            expect(objekt.isEmpty()).toBe(true);
        });
    });
});

import { Collection } from './collection';
import { Objekt } from './objekt';

describe('Collection', () => {
    let collection: Collection<Objekt>;

    beforeEach(() => {
        collection = new Collection<Objekt>(
            [
                { id: 1, name: 'Alice' } as any,
                { id: 2, name: 'Bob' } as any,
                { id: 3, name: 'Charlie' } as any,
            ],
            Objekt,
        );
    });

    it('should instantiate with an array of items', () => {
        expect(collection).toBeInstanceOf(Collection);
        expect(collection.size()).toBe(3);
    });

    it('should instantiate with empty array', () => {
        const empty = new Collection();
        expect(empty.size()).toBe(0);
    });

    describe('push', () => {
        it('should add a new item', () => {
            collection.push({ id: 4, name: 'Dave' });
            expect(collection.size()).toBe(4);
        });

        it('should wrap plain objects in the Type', () => {
            const item = collection.push({ id: 5, name: 'Eve' });
            expect(item).toBeInstanceOf(Objekt);
        });
    });

    describe('set', () => {
        it('should replace item at existing index', () => {
            collection.set(0, { id: 10, name: 'Replaced' });
            expect(collection.get(0, 'name')).toBe('Replaced');
        });

        it('should push if index exceeds size', () => {
            collection.set(100, { id: 99, name: 'New' });
            expect(collection.size()).toBe(4);
        });
    });

    describe('get', () => {
        it('should return item by index', () => {
            const item = collection.get(0);
            expect(item).toBeInstanceOf(Objekt);
        });

        it('should return attribute value with opt_attribute', () => {
            expect(collection.get(0, 'name')).toBe('Alice');
        });

        it('should return null for out-of-bounds index', () => {
            expect(collection.get(99)).toBeNull();
        });

        it('should return null for negative index', () => {
            expect(collection.get(-1)).toBeNull();
        });
    });

    describe('findById', () => {
        it('should find item by ID', () => {
            const item = collection.findById(2);
            expect(item.get('name')).toBe('Bob');
        });

        it('should return null when item not found', () => {
            const item = collection.findById(999);
            expect(item).toBeNull();
        });
    });

    describe('findBy', () => {
        it('should find item by attribute value', () => {
            const item = collection.findBy('name', 'Charlie');
            expect(item.get('id')).toBe(3);
        });
    });

    describe('findByCondition', () => {
        it('should find item matching condition', () => {
            const item = collection.findByCondition((item) => {
                return item.get('name') === 'Bob';
            });
            expect(item.get('id')).toBe(2);
        });

        it('should return null when no match', () => {
            const item = collection.findByCondition(() => false);
            expect(item).toBeNull();
        });
    });

    describe('findAllByCondition', () => {
        it('should find all matching items', () => {
            const items = collection.findAllByCondition((item) => {
                return item.get<number>('id') <= 2;
            });
            expect(items).toHaveLength(2);
        });

        it('should return empty array when no match', () => {
            const items = collection.findAllByCondition(() => false);
            expect(items).toHaveLength(0);
        });
    });

    describe('deleteById', () => {
        it('should delete item by ID', () => {
            const deleted = collection.deleteById(2);
            expect(deleted.get('name')).toBe('Bob');
            expect(collection.size()).toBe(2);
        });
    });

    describe('deleteByCondition', () => {
        it('should delete item matching condition', () => {
            collection.deleteByCondition((item) => {
                return item.get('name') === 'Alice';
            });
            expect(collection.size()).toBe(2);
            expect(collection.findById(1)).toBeNull();
        });
    });

    describe('deleteAllByCondition', () => {
        it('should delete all matching items', () => {
            const deleted = collection.deleteAllByCondition((item) => {
                return item.get<number>('id') <= 2;
            });
            expect(deleted).toHaveLength(2);
            expect(collection.size()).toBe(1);
        });
    });

    describe('replace', () => {
        it('should replace an existing item by ID', () => {
            const replaced = collection.replace({ id: 1, name: 'Updated' });
            expect(replaced.get('name')).toBe('Updated');
            expect(collection.size()).toBe(3);
        });

        it('should return null when ID not found', () => {
            const result = collection.replace({ id: 999, name: 'Missing' });
            expect(result).toBeNull();
        });
    });

    describe('each', () => {
        it('should iterate over all items', () => {
            const callback = jest.fn();
            collection.each(callback);
            expect(callback).toHaveBeenCalledTimes(3);
        });
    });

    describe('clear', () => {
        it('should remove all items', () => {
            collection.clear();
            expect(collection.size()).toBe(0);
        });
    });

    describe('reload', () => {
        it('should clear and reload with new items', () => {
            collection.reload([{ id: 10, name: 'New' }]);
            expect(collection.size()).toBe(1);
            expect(collection.get(0, 'name')).toBe('New');
        });
    });

    describe('limit', () => {
        it('should return a slice of items', () => {
            const sliced = collection.limit(0, 2);
            expect(sliced).toHaveLength(2);
        });

        it('should handle offset', () => {
            const sliced = collection.limit(1, 2);
            expect(sliced).toHaveLength(2);
        });
    });

    describe('getItems', () => {
        it('should return the internal items array', () => {
            const items = collection.getItems();
            expect(items).toHaveLength(3);
        });
    });
});

import {
    clear,
    clearArray,
    clearObject,
    contain,
    copy,
    copyArray,
    copyObject,
    each,
    eq,
    format,
    gt,
    gte,
    inArray,
    inContainArray,
    instanceOf,
    is,
    isArray,
    isDate,
    isEmpty,
    isFloat,
    isFunction,
    isInfinity,
    isInteger,
    isNull,
    isNumber,
    isObject,
    isPureObject,
    isSame,
    isString,
    isUndefined,
    lt,
    lte,
    merge,
    neq,
    noop,
    remove,
    typeCast,
} from './operation';

describe('operation', () => {
    it('should cast string to undefined', () => {
        const result = typeCast('undefined');

        expect(result).toEqual(undefined);
    });

    it('should merge two objects', () => {
        const obj = merge(
            {
                a: 1,
            },
            {
                b: 2,
            },
        );

        expect(obj).toEqual({
            a: 1,
            b: 2,
        });
    });

    it('should get formatted string', () => {
        const result = format('example: {0}', [1]);

        expect(result).toEqual('example: 1');
    });

    it('should create noop function', () => {
        const callback = noop(1);
        const result = callback();

        expect(result).toEqual(1);
    });

    it('should equal the two numbers', () => {
        const result = eq(2, 2);

        expect(result).toEqual(true);
    });

    it('should not equal the two numbers', () => {
        const result = neq(2, 3);

        expect(result).toEqual(true);
    });

    it('should be 3 greater than 2', () => {
        const result = gt(3, 2);

        expect(result).toEqual(true);
    });

    it('should be 2 greater and equal than 2', () => {
        const result = gte(2, 2);

        expect(result).toEqual(true);
    });

    it('should be 2 lower than 3', () => {
        const result = lt(2, 3);

        expect(result).toEqual(true);
    });

    it('should be 2 lower and equal than 2', () => {
        const result = lte(2, 2);

        expect(result).toEqual(true);
    });

    it('should be true when input is array', () => {
        const result = isArray([]);

        expect(result).toEqual(true);
    });

    it('should be true when input is function', () => {
        const result = isFunction(() => {
            // Empty method
        });

        expect(result).toEqual(true);
    });

    it('should be true when input is string', () => {
        const result = isString('string');

        expect(result).toEqual(true);
    });

    it('should be true when input is number', () => {
        const result = isNumber(10);

        expect(result).toEqual(true);
    });

    it('should be true when input is float', () => {
        const result = isFloat(10.5);

        expect(result).toEqual(true);
    });

    it('should be true when input is integer', () => {
        const result = isInteger(5);

        expect(result).toEqual(true);
    });

    it('should be true when input is object', () => {
        const result = isObject({});

        expect(result).toEqual(true);
    });

    it('should be true when input is pure object', () => {
        const result = isPureObject({});

        expect(result).toEqual(true);
    });

    it('should be true when input is new Date()', () => {
        const result = isDate(new Date());

        expect(result).toEqual(true);
    });

    it('should be true when input is null', () => {
        const result = isNull(null);

        expect(result).toEqual(true);
    });

    it('should be true when input is Infinity', () => {
        const result = isInfinity(Infinity);

        expect(result).toEqual(true);
    });

    it('should be true when input is undefined', () => {
        const result = isUndefined(undefined);

        expect(result).toEqual(true);
    });

    it('should be true when input is in specific type', () => {
        const result = is(10, 'number');

        expect(result).toEqual(true);
    });

    it('should be true when input is instance of object', () => {
        const result = instanceOf({}, Object);

        expect(result).toEqual(true);
    });

    /* it('each', () => {
        expect(true).toEqual(false);
    });

    it('eachArray', () => {
        expect(true).toEqual(false);
    });

    it('eachObject', () => {
        expect(true).toEqual(false);
    });

    it('sleepEach', () => {
        expect(true).toEqual(false);
    }); */

    it('clear', () => {
        const item = {
            id: 1
        }
        clear(item);

        expect(item).toEqual({});
    });

    it('clearArray', () => {
        const numbers = [2, 4, 6, 7];
        clearArray(numbers);

        expect(numbers).toEqual([]);
    });

    it('clearObject', () => {
        const obj = {
            id: 1
        }
        clearObject(obj);

        expect(obj).toEqual({});
    });

    it('inArray', () => {
        const result = inArray([3, 2, 1], 2);

        expect(result).toEqual(true);
    });

    it('contain', () => {
        const result = contain('apple', 'pp');

        expect(result).toEqual(true);
    });

    it('inContainArray', () => {
        const result = inContainArray(['apple', 'strawberry'], 'raw');

        expect(result).toEqual(true);
    });

    it('isSame', () => {
        const result = isSame({a: 1}, {a: 1});

        expect(result).toEqual(true);
    });

    it('remove', () => {
        const numbers = [2, 4, 7, 1, 3];
        remove(numbers, 7);

        expect(numbers).toEqual([2, 4, 1, 3]);
    });

    it('copy', () => {
        const obj = {
            id: 1,
            arr: [],
            obj: {
                attr: 3.2
            }
        };
        const objectCopy = copy(obj);

        expect(objectCopy).toEqual(obj);
    });

    it('copyArray', () => {
        const numbers = [{
            id: 1
        }, {
            id: 2
        }];
        const numbersCopy = copyArray(numbers);

        expect(numbersCopy).toEqual(numbers);

        numbers[0].id = 3;
        expect(numbersCopy[0].id).not.toEqual(numbers[0].id);
    });

    it('copyObject', () => {
        const obj = {
            id: 1,
            arr: [],
            obj: {
                attr: 3.2
            }
        };
        const objectCopy = copyObject(obj);

        expect(objectCopy).toEqual(obj);
    });

    it('isEmpty', () => {
        const emptyArray = isEmpty([]);
        expect(emptyArray).toEqual(true);

        const emptyObject = isEmpty({});
        expect(emptyObject).toEqual(true);
    });

    /* it('list', () => {
        expect(true).toEqual(false);
    });

    it('capitalize', () => {
        expect(true).toEqual(false);
    });

    it('pluck', () => {
        expect(true).toEqual(false);
    });

    it('pluckKeys', () => {
        expect(true).toEqual(false);
    });

    it('scrollTo', () => {
        expect(true).toEqual(false);
    });

    it('scrollToElement', () => {
        expect(true).toEqual(false);
    });

    it('scrollIntoView', () => {
        expect(true).toEqual(false);
    });

    it('debounce', () => {
        expect(true).toEqual(false);
    });

    it('urlWithQueryString', () => {
        expect(true).toEqual(false);
    });

    it('getQueryString', () => {
        expect(true).toEqual(false);
    });

    it('getExtensionName', () => {
        expect(true).toEqual(false);
    });

    it('normalize', () => {
        expect(true).toEqual(false);
    });

    it('copyToClipboard', () => {
        expect(true).toEqual(false);
    }); */
});

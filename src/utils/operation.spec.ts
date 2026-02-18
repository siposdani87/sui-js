import {
    capitalize,
    clear,
    clearArray,
    clearObject,
    contain,
    copy,
    copyArray,
    copyObject,
    copyToClipboard,
    debounce,
    each,
    eachArray,
    eachObject,
    eq,
    format,
    getExtensionName,
    getQueryString,
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
    list,
    lt,
    lte,
    merge,
    neq,
    noop,
    normalize,
    pluckKeys,
    remove,
    scrollIntoView,
    scrollTo,
    scrollToElement,
    sleepEach,
    typeCast,
    urlWithQueryString,
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

    it('each should iterate array items', () => {
        const callback = jest.fn();
        each([10, 20, 30], callback);

        expect(callback).toHaveBeenCalledTimes(3);
        expect(callback).toHaveBeenCalledWith(10, 0);
        expect(callback).toHaveBeenCalledWith(20, 1);
        expect(callback).toHaveBeenCalledWith(30, 2);
    });

    it('each should iterate object properties', () => {
        const callback = jest.fn();
        each({ a: 1, b: 2 }, callback);

        expect(callback).toHaveBeenCalledTimes(2);
        expect(callback).toHaveBeenCalledWith(1, 'a');
        expect(callback).toHaveBeenCalledWith(2, 'b');
    });

    it('eachArray should iterate with start and end', () => {
        const callback = jest.fn();
        eachArray([10, 20, 30, 40, 50], callback, 1, 3);

        expect(callback).toHaveBeenCalledTimes(2);
        expect(callback).toHaveBeenCalledWith(20, 1);
        expect(callback).toHaveBeenCalledWith(30, 2);
    });

    it('eachObject should iterate object key-value pairs', () => {
        const callback = jest.fn();
        eachObject({ x: 'hello', y: 'world' }, callback);

        expect(callback).toHaveBeenCalledTimes(2);
        expect(callback).toHaveBeenCalledWith('hello', 'x');
        expect(callback).toHaveBeenCalledWith('world', 'y');
    });

    it('sleepEach should call next for each index', () => {
        jest.useFakeTimers();
        const callback = jest.fn();
        sleepEach(callback, 0, 3, 100);

        expect(callback).toHaveBeenCalledWith(0);
        jest.advanceTimersByTime(100);
        expect(callback).toHaveBeenCalledWith(1);
        jest.advanceTimersByTime(100);
        expect(callback).toHaveBeenCalledWith(2);
        expect(callback).toHaveBeenCalledTimes(3);
        jest.useRealTimers();
    });

    it('clear', () => {
        const item = {
            id: 1,
        };
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
            id: 1,
        };
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

    it('isSame number', () => {
        const result = isSame(3, 3);

        expect(result).toEqual(true);
    });

    it('isSame object', () => {
        const result = isSame({ a: 1 }, { a: 1 });

        expect(result).toEqual(true);
    });

    it('isSame array', () => {
        const result = isSame([1, 2], [1, 2]);

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
                attr: 3.2,
            },
        };
        const objectCopy = copy(obj);

        expect(objectCopy).toEqual(obj);
    });

    it('copyArray', () => {
        const numbers = [
            {
                id: 1,
            },
            {
                id: 2,
            },
        ];
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
                attr: 3.2,
            },
        };
        const objectCopy = copyObject(obj);

        expect(objectCopy).toEqual(obj);
    });

    it('isEmpty', () => {
        const emptyArray = isEmpty([]);
        expect(emptyArray).toEqual(true);

        const emptyobject = isEmpty({});
        expect(emptyobject).toEqual(true);
    });

    it('list should spread args to callback', () => {
        const callback = jest.fn();
        list([1, 2, 3], callback);

        expect(callback).toHaveBeenCalledWith(1, 2, 3);
    });

    it('capitalize should uppercase first character', () => {
        expect(capitalize('hello')).toBe('Hello');
        expect(capitalize('world')).toBe('World');
        expect(capitalize('A')).toBe('A');
    });

    it('pluckKeys should return keys matching condition', () => {
        const result = pluckKeys({ a: 1, b: 2, c: 3 }, (value) => value > 1);

        expect(result).toEqual(['b', 'c']);
    });

    it('scrollTo should call scrollBy with intervals', () => {
        jest.useFakeTimers();
        const scrollBySpy = jest.spyOn(window, 'scrollBy').mockImplementation();
        Object.defineProperty(window, 'scrollX', {
            value: 0,
            writable: true,
            configurable: true,
        });
        Object.defineProperty(window, 'scrollY', {
            value: 0,
            writable: true,
            configurable: true,
        });

        scrollTo(100, 200, 500, 20);
        jest.advanceTimersByTime(20);

        expect(scrollBySpy).toHaveBeenCalled();
        scrollBySpy.mockRestore();
        jest.useRealTimers();
    });

    it('scrollToElement should scroll to element position', () => {
        const el = document.createElement('div');
        el.id = 'scroll-target';
        Object.defineProperty(el, 'offsetLeft', { value: 50 });
        Object.defineProperty(el, 'offsetTop', { value: 100 });
        document.body.appendChild(el);

        jest.useFakeTimers();
        const scrollBySpy = jest.spyOn(window, 'scrollBy').mockImplementation();
        Object.defineProperty(window, 'scrollX', {
            value: 0,
            writable: true,
            configurable: true,
        });
        Object.defineProperty(window, 'scrollY', {
            value: 0,
            writable: true,
            configurable: true,
        });

        scrollToElement('#scroll-target', 500, 20);
        jest.advanceTimersByTime(20);

        expect(scrollBySpy).toHaveBeenCalled();
        scrollBySpy.mockRestore();
        el.remove();
        jest.useRealTimers();
    });

    it('scrollIntoView should call element scrollIntoView', () => {
        const el = document.createElement('div');
        el.id = 'scroll-view-target';
        el.scrollIntoView = jest.fn();
        document.body.appendChild(el);

        scrollIntoView('#scroll-view-target', 'smooth');

        expect(el.scrollIntoView).toHaveBeenCalledWith({
            behavior: 'smooth',
        });
        el.remove();
    });

    it('debounce should delay function execution', () => {
        jest.useFakeTimers();
        const func = jest.fn();
        const debounced = debounce(func, 100);

        debounced.call(window, new Event('click'));
        expect(func).not.toHaveBeenCalled();

        jest.advanceTimersByTime(100);
        expect(func).toHaveBeenCalledTimes(1);
        jest.useRealTimers();
    });

    it('debounce with immediate should call function immediately', () => {
        jest.useFakeTimers();
        const func = jest.fn();
        const debounced = debounce(func, 100, true);

        debounced.call(window, new Event('click'));
        expect(func).toHaveBeenCalledTimes(1);
        jest.useRealTimers();
    });

    it('urlWithQueryString should append query string to url', () => {
        expect(urlWithQueryString('/api/data', { page: 1, size: 10 })).toBe(
            '/api/data?page=1&size=10',
        );
    });

    it('urlWithQueryString should use & when url already has ?', () => {
        expect(urlWithQueryString('/api/data?existing=1', { page: 2 })).toBe(
            '/api/data?existing=1&page=2',
        );
    });

    it('urlWithQueryString should return url unchanged when no params', () => {
        expect(urlWithQueryString('/api/data')).toBe('/api/data');
    });

    it('getQueryString should build query string from object', () => {
        expect(getQueryString({ a: 1, b: 'test' })).toBe('a=1&b=test');
    });

    it('getQueryString should handle array params with [] notation', () => {
        expect(getQueryString({ ids: [1, 2, 3] })).toBe(
            'ids[]=1&ids[]=2&ids[]=3',
        );
    });

    it('getQueryString should skip null and undefined values', () => {
        expect(getQueryString({ a: 1, b: null, c: undefined })).toBe('a=1');
    });

    it('getExtensionName should extract file extension', () => {
        expect(getExtensionName('photo.jpg')).toBe('jpg');
        expect(getExtensionName('/path/to/file.png')).toBe('png');
        expect(getExtensionName('file.tar.gz')).toBe('gz');
    });

    it('getExtensionName should ignore query string', () => {
        expect(getExtensionName('image.jpg?w=100')).toBe('jpg');
    });

    it('normalize should remove diacritical marks', () => {
        expect(normalize('café')).toBe('cafe');
        expect(normalize('naïve')).toBe('naive');
        expect(normalize('résumé')).toBe('resume');
    });

    it('copyToClipboard should copy string via execCommand', () => {
        document.execCommand = jest.fn().mockReturnValue(true);

        copyToClipboard('test string');

        expect(document.execCommand).toHaveBeenCalledWith('copy');
    });
});

import {
    eq,
    format,
    gt,
    gte,
    instanceOf,
    is,
    isArray,
    isDate,
    isFloat,
    isFunction,
    isInteger,
    isNull,
    isNumber,
    isObject,
    isString,
    isUndefined,
    lt,
    lte,
    merge,
    neq,
    noop,
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

    it('should be true when input is new Date()', () => {
        const result = isDate(new Date());

        expect(result).toEqual(true);
    });

    it('should be true when input is null', () => {
        const result = isNull(null);

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
});

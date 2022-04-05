import { isDate } from './operation';

describe('isDate tests', () => {
    it('isDate(new Date()), to equal true', () => {
        expect(isDate(new Date())).toEqual(true);
    });
});

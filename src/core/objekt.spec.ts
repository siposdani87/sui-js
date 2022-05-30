import { Objekt } from './objekt';

describe('objekt', () => {
    it('should be instance of Objekt', () => {
        const objekt = new Objekt();

        expect(objekt).toBeInstanceOf(Objekt);
    });
});

import { Http } from './http';

describe('http', () => {
    it('should be instance of Http', () => {
        const http = new Http();

        expect(http).toBeInstanceOf(Http);
    });
});

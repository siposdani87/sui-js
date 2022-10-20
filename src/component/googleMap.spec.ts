import { Query } from '../core';
import { GoogleMap } from './googleMap';

describe('googleMap', () => {
    it('should be instance of GoogleMap', () => {
        const knot = new Query('.template-view').getKnot();
        const googleMap = new GoogleMap(knot);

        expect(googleMap).toBeInstanceOf(GoogleMap);
    });
});

import { Query } from '../core';
import { GoogleMap } from './googleMap';

describe('googleMap', () => {
    it('should be instance of GoogleMap', () => {
        const node = new Query('.template-view').getKnot();
        const googleMap = new GoogleMap(node);

        expect(googleMap).toBeInstanceOf(GoogleMap);
    });
});

import { GeoLocation } from './geoLocation';

describe('geoLocation', () => {
    it('should be instance of GeoLocation', () => {
        const geoLocation = new GeoLocation();
        
        expect(geoLocation).toBeInstanceOf(GeoLocation);
    });
});

import { MapLabel } from './mapLabel';

describe('mapLabel', () => {
    it('should be instance of MapLabel', () => {
        const mapLabel = new MapLabel({});

        expect(mapLabel).toBeInstanceOf(MapLabel);
    });
});

import { GeoLocation } from './geoLocation';

const mockGeolocation = {
    getCurrentPosition: jest.fn(),
    watchPosition: jest.fn(),
    clearWatch: jest.fn(),
};

Object.defineProperty(navigator, 'geolocation', {
    value: mockGeolocation,
    writable: true,
});

describe('GeoLocation', () => {
    let geo: GeoLocation;

    beforeEach(() => {
        jest.clearAllMocks();
        geo = new GeoLocation();
    });

    it('should be instance of GeoLocation', () => {
        expect(geo).toBeInstanceOf(GeoLocation);
    });

    describe('constructor', () => {
        it('should set default options', () => {
            expect(geo.options.enableHighAccuracy).toBe(true);
            expect(geo.options.timeout).toBe(5000);
            expect(geo.options.maximumAge).toBe(Infinity);
        });
    });

    describe('getPosition', () => {
        it('should call getCurrentPosition', () => {
            geo.getPosition();
            expect(mockGeolocation.getCurrentPosition).toHaveBeenCalled();
        });

        it('should resolve with coordinates on success', () => {
            mockGeolocation.getCurrentPosition.mockImplementation(
                (success: Function) => {
                    success({
                        coords: {
                            latitude: 47.4979,
                            longitude: 19.0402,
                        },
                    });
                },
            );

            const onResolve = jest.fn();
            geo.getPosition().then(onResolve);
            expect(onResolve).toHaveBeenCalledWith(47.4979, 19.0402);
        });

        it('should reject with nulls on error', () => {
            mockGeolocation.getCurrentPosition.mockImplementation(
                (_success: Function, error: Function) => {
                    error({
                        code: 1,
                        PERMISSION_DENIED: 1,
                        POSITION_UNAVAILABLE: 2,
                        TIMEOUT: 3,
                        message: 'denied',
                    });
                },
            );

            const onResolve = jest.fn();
            const onReject = jest.fn();
            geo.getPosition().then(onResolve, onReject);
            expect(onReject).toHaveBeenCalledWith(null, null);
        });
    });

    describe('setWatcher', () => {
        it('should call watchPosition', () => {
            mockGeolocation.watchPosition.mockReturnValue(123);
            geo.setWatcher();
            expect(mockGeolocation.watchPosition).toHaveBeenCalled();
            expect(geo.watcherId).toBe(123);
        });

        it('should call eventChange on position update', () => {
            mockGeolocation.watchPosition.mockImplementation(
                (success: Function) => {
                    success({
                        coords: {
                            latitude: 48.0,
                            longitude: 20.0,
                        },
                    });
                    return 1;
                },
            );
            const spy = jest.spyOn(geo, 'eventChange');
            geo.setWatcher();
            expect(spy).toHaveBeenCalledWith(
                48.0,
                20.0,
                'User allowed the request for GeoLocation.',
            );
        });

        it('should call eventError on permission denied', () => {
            mockGeolocation.watchPosition.mockImplementation(
                (_success: Function, error: Function) => {
                    error({
                        code: 1,
                        PERMISSION_DENIED: 1,
                        POSITION_UNAVAILABLE: 2,
                        TIMEOUT: 3,
                        message: 'denied',
                    });
                    return 1;
                },
            );
            const spy = jest.spyOn(geo, 'eventError');
            geo.setWatcher();
            expect(spy).toHaveBeenCalledWith(
                'User denied the request for GeoLocation.',
                'permission_denied',
            );
        });
    });

    describe('clearWatcher', () => {
        it('should call clearWatch', () => {
            geo.watcherId = 42;
            geo.clearWatcher();
            expect(mockGeolocation.clearWatch).toHaveBeenCalledWith(42);
        });
    });

    describe('event methods', () => {
        it('should call eventChange without error', () => {
            expect(() =>
                geo.eventChange(47.0, 19.0, 'test'),
            ).not.toThrow();
        });

        it('should call eventError without error', () => {
            expect(() =>
                geo.eventError('error message', 'code'),
            ).not.toThrow();
        });
    });
});

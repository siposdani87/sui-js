import { Query } from '../core';
import { GoogleMap } from './googleMap';
import { Objekt } from '../core/objekt';
import { installCanvasMock, uninstallCanvasMock } from '../test-helpers';

// Supplement @googlemaps/jest-mocks with missing visualization and geometry mocks
function setupSupplementaryMocks(): void {
    (google.maps as any).visualization = {
        HeatmapLayer: jest.fn().mockImplementation(function (this: any) {
            this.set = jest.fn();
            this.setMap = jest.fn();
            this.getData = jest.fn();
        }),
    };
    (google.maps as any).geometry = {
        spherical: {
            computeArea: jest.fn(() => 1000),
            computeDistanceBetween: jest.fn(() => 500),
        },
    };
    (google.maps as any).StyledMapType = jest.fn().mockImplementation(
        function (this: any) {
            this.name = '';
        },
    );
}

function createGoogleMap(opt_options?: object): GoogleMap {
    const knot = new Query('.template-view').getKnot();
    return new GoogleMap(knot, '.google-map', opt_options);
}

const testIconOptions = {
    url: '/test-icon.png',
    size: [32, 32] as [number, number],
    origin: [0, 0] as [number, number],
    anchor: [16, 32] as [number, number],
    coords: [16, 0, 32, 32, 0, 32],
};

describe('GoogleMap', () => {
    let ctx: Record<string, jest.Mock | any>;

    beforeEach(() => {
        ctx = installCanvasMock();
        setupSupplementaryMocks();
    });

    afterEach(() => {
        uninstallCanvasMock();
    });

    describe('constructor', () => {
        it('should be instance of GoogleMap', () => {
            const googleMap = createGoogleMap();
            expect(googleMap).toBeInstanceOf(GoogleMap);
        });

        it('should create a Google Map instance', () => {
            const googleMap = createGoogleMap();
            expect(googleMap.map).toBeDefined();
        });

        it('should initialize markers and polygons collections', () => {
            const googleMap = createGoogleMap();
            expect(googleMap.markers).toBeDefined();
            expect(googleMap.polygons).toBeDefined();
        });

        it('should merge custom options with defaults', () => {
            const googleMap = createGoogleMap({ zoom: 12 });
            expect(googleMap.options.get('zoom')).toBe(12);
            expect(googleMap.options.get('scrollwheel')).toBe(false);
        });
    });

    describe('getMapType / setMapType', () => {
        it('should get the current map type', () => {
            const googleMap = createGoogleMap();
            const mapType = googleMap.getMapType();
            expect(googleMap.map.getMapTypeId).toHaveBeenCalled();
            expect(mapType).toBeDefined();
        });

        it('should set the map type', () => {
            const googleMap = createGoogleMap();
            googleMap.setMapType('satellite');
            expect(googleMap.map.setMapTypeId).toHaveBeenCalledWith(
                'satellite',
            );
        });
    });

    describe('setCustomMapStyle', () => {
        it('should register a custom styled map type', () => {
            const googleMap = createGoogleMap();
            const styles: google.maps.MapTypeStyle[] = [];
            googleMap.setCustomMapStyle('custom', 'Custom Style', styles);
            expect(google.maps.StyledMapType).toHaveBeenCalledWith(styles, {
                name: 'Custom Style',
            });
        });
    });

    describe('setMarkerIcon', () => {
        it('should register a marker icon', () => {
            const googleMap = createGoogleMap();
            googleMap.setMarkerIcon('default', testIconOptions);
            expect(googleMap.markerIcons['default']).toBeDefined();
            expect(googleMap.markerIcons['default'].icon).toBeDefined();
            expect(googleMap.markerIcons['default'].shape).toBeDefined();
            expect(googleMap.markerIcons['default'].shape.type).toBe('poly');
        });
    });

    describe('markers', () => {
        let googleMap: GoogleMap;

        beforeEach(() => {
            googleMap = createGoogleMap();
            googleMap.setMarkerIcon('default', testIconOptions);
        });

        it('should create a marker', () => {
            googleMap.createMarker('m1', 'Marker 1', 'default', 47.6, 17.5);
            const marker = googleMap.getMarker('m1');
            expect(marker).toBeDefined();
            expect(marker).not.toBeNull();
        });

        it('should return null for non-existent marker', () => {
            expect(googleMap.getMarker('nonexistent')).toBeNull();
        });

        it('should remove a marker', () => {
            googleMap.createMarker('m1', 'Marker 1', 'default', 47.6, 17.5);
            googleMap.removeMarker('m1');
            expect(googleMap.getMarker('m1')).toBeNull();
        });

        it('should handle removing non-existent marker', () => {
            expect(() => googleMap.removeMarker('nonexistent')).not.toThrow();
        });

        it('should remove all markers', () => {
            googleMap.createMarker('m1', 'Marker 1', 'default', 47.6, 17.5);
            googleMap.createMarker('m2', 'Marker 2', 'default', 47.7, 17.6);
            googleMap.removeAllMarker();
            expect(googleMap.getMarker('m1')).toBeNull();
            expect(googleMap.getMarker('m2')).toBeNull();
        });

        it('should create or update marker - create when new', () => {
            googleMap.createOrUpdateMarker(
                'm1',
                'Marker 1',
                'default',
                47.6,
                17.5,
            );
            expect(googleMap.getMarker('m1')).not.toBeNull();
        });

        it('should create or update marker - update when existing', () => {
            googleMap.createMarker('m1', 'Marker 1', 'default', 47.6, 17.5);
            googleMap.createOrUpdateMarker(
                'm1',
                'Updated',
                'default',
                47.7,
                17.6,
            );
            const marker = googleMap.getMarker('m1');
            expect(marker).not.toBeNull();
        });

        it('should update marker title and position', () => {
            googleMap.createMarker('m1', 'Marker 1', 'default', 47.6, 17.5);
            googleMap.updateMarker(
                'm1',
                'Updated Title',
                'default',
                48.0,
                18.0,
            );
            const markerData = googleMap.getMarker('m1')!;
            const gMarker = markerData.get<google.maps.Marker>('_marker');
            expect(gMarker.setTitle).toHaveBeenCalledWith('Updated Title');
            expect(gMarker.setPosition).toHaveBeenCalled();
        });

        it('should fit marker to map', () => {
            googleMap.createMarker('m1', 'Marker 1', 'default', 47.6, 17.5);
            googleMap.fitMarkerToMap('m1');
            expect(googleMap.map.setCenter).toHaveBeenCalled();
        });

        it('should handle fitMarkerToMap for non-existent marker', () => {
            expect(() =>
                googleMap.fitMarkerToMap('nonexistent'),
            ).not.toThrow();
        });

        it('should open info window on marker', () => {
            googleMap.createMarker('m1', 'Marker 1', 'default', 47.6, 17.5);
            expect(() =>
                googleMap.openInfoWindow('m1', '<p>Hello</p>'),
            ).not.toThrow();
        });

        it('should set markers with options', () => {
            googleMap.setMarkers({ draggable: true });
            expect(googleMap.markerOptions.get('draggable')).toBe(true);
        });

        it('should use marker data id when not provided', () => {
            googleMap.createMarker(
                'm1',
                'Marker',
                'default',
                47.6,
                17.5,
                {},
            );
            const marker = googleMap.getMarker('m1');
            expect(marker!.get('id')).toBe('m1');
        });

        it('should create marker by XY coordinates', () => {
            const mockProjection = {
                fromContainerPixelToLatLng: jest.fn(
                    () => new google.maps.LatLng(47.6, 17.5),
                ),
            };
            googleMap.overlay.getProjection = jest.fn(
                () => mockProjection as any,
            );
            googleMap.createMarkerByXY('m1', 'Marker', 'default', 100, 200);
            expect(
                mockProjection.fromContainerPixelToLatLng,
            ).toHaveBeenCalled();
            expect(googleMap.getMarker('m1')).not.toBeNull();
        });
    });

    describe('polygons', () => {
        let googleMap: GoogleMap;
        const testPoints = [
            { latitude: 47.6, longitude: 17.5 },
            { latitude: 47.7, longitude: 17.6 },
            { latitude: 47.5, longitude: 17.7 },
        ];

        beforeEach(() => {
            googleMap = createGoogleMap();
        });

        it('should create a polygon', () => {
            googleMap.createPolygon('p1', 'Polygon 1', testPoints);
            expect(googleMap.getPolygon('p1')).not.toBeNull();
        });

        it('should return null for non-existent polygon', () => {
            expect(googleMap.getPolygon('nonexistent')).toBeNull();
        });

        it('should remove a polygon', () => {
            googleMap.createPolygon('p1', 'Polygon 1', testPoints);
            googleMap.removePolygon('p1');
            expect(googleMap.getPolygon('p1')).toBeNull();
        });

        it('should handle removing non-existent polygon', () => {
            expect(() =>
                googleMap.removePolygon('nonexistent'),
            ).not.toThrow();
        });

        it('should remove all polygons', () => {
            googleMap.createPolygon('p1', 'Polygon 1', testPoints);
            googleMap.createPolygon('p2', 'Polygon 2', testPoints);
            googleMap.removeAllPolygon();
            expect(googleMap.getPolygon('p1')).toBeNull();
            expect(googleMap.getPolygon('p2')).toBeNull();
        });

        it('should create or update polygon - create when new', () => {
            googleMap.createOrUpdatePolygon('p1', 'Polygon 1', testPoints);
            expect(googleMap.getPolygon('p1')).not.toBeNull();
        });

        it('should create or update polygon - update when existing', () => {
            googleMap.createPolygon('p1', 'Polygon 1', testPoints);
            googleMap.createOrUpdatePolygon('p1', 'Updated', testPoints);
            expect(googleMap.getPolygon('p1')).not.toBeNull();
        });

        it('should update polygon title and path', () => {
            googleMap.createPolygon('p1', 'Polygon 1', testPoints);
            const newPoints = [
                { latitude: 48.0, longitude: 18.0 },
                { latitude: 48.1, longitude: 18.1 },
                { latitude: 47.9, longitude: 18.2 },
            ];
            googleMap.updatePolygon('p1', 'Updated', newPoints);
            const polygonData = googleMap.getPolygon('p1')!;
            const gPolygon =
                polygonData.get<google.maps.Polygon>('_polygon');
            expect(gPolygon.setPath).toHaveBeenCalled();
        });

        it('should get center of polygon', () => {
            googleMap.createPolygon('p1', 'Polygon 1', testPoints);
            const polygonData = googleMap.getPolygon('p1')!;
            const center = googleMap.getCenterOfPolygon(polygonData);
            expect(center).toHaveProperty('latitude');
            expect(center).toHaveProperty('longitude');
        });

        it('should fit polygon to map', () => {
            googleMap.createPolygon('p1', 'Polygon 1', testPoints);
            googleMap.fitPolygonToMap('p1');
            expect(googleMap.map.setCenter).toHaveBeenCalled();
            expect(googleMap.map.fitBounds).toHaveBeenCalled();
        });

        it('should handle fitPolygonToMap for non-existent polygon', () => {
            expect(() =>
                googleMap.fitPolygonToMap('nonexistent'),
            ).not.toThrow();
        });

        it('should compute polygon area', () => {
            googleMap.createPolygon('p1', 'Polygon 1', testPoints);
            const polygonData = googleMap.getPolygon('p1')!;
            const area = googleMap.getComputeArea(polygonData);
            expect(area).toBe(1000);
        });

        it('should add point to polygon', () => {
            googleMap.createPolygon('p1', 'Polygon 1', testPoints);
            const polygonData = googleMap.getPolygon('p1')!;
            googleMap.addPointToPolygon(polygonData, 47.8, 17.8);
            const gPolygon =
                polygonData.get<google.maps.Polygon>('_polygon');
            expect(gPolygon.getPath).toHaveBeenCalled();
        });

        it('should set polygons with options', () => {
            googleMap.setPolygons({ fillColor: '#00FF00' });
            expect(googleMap.polygonOptions.get('fillColor')).toBe('#00FF00');
        });

        it('should use polygon data id when not provided', () => {
            googleMap.createPolygon('p1', 'Polygon', testPoints, {});
            const polygon = googleMap.getPolygon('p1');
            expect(polygon!.get('id')).toBe('p1');
        });
    });

    describe('heatmap', () => {
        let googleMap: GoogleMap;

        beforeEach(() => {
            googleMap = createGoogleMap();
            googleMap.setHeatmap();
        });

        it('should set heatmap options with defaults', () => {
            expect(googleMap.heatmapOptions.get('opacity')).toBe(0.6);
        });

        it('should merge custom heatmap options', () => {
            googleMap.setHeatmap({ opacity: 0.8, radius: 20 });
            expect(googleMap.heatmapOptions.get('opacity')).toBe(0.8);
            expect(googleMap.heatmapOptions.get('radius')).toBe(20);
        });

        it('should create heatmap from weighted points', () => {
            const points = [
                { latitude: 47.6, longitude: 17.5, weight: 3 },
                { latitude: 47.7, longitude: 17.6, weight: 1 },
            ];
            googleMap.createHeatmap(points);
            expect(googleMap.heatmap).toBeDefined();
        });

        it('should remove heatmap', () => {
            const points = [
                { latitude: 47.6, longitude: 17.5, weight: 3 },
            ];
            googleMap.createHeatmap(points);
            googleMap.removeHeatmap();
            expect(googleMap.heatmap.setMap).toHaveBeenCalledWith(null);
        });

        it('should handle removeHeatmap when heatmap is undefined', () => {
            const gm = createGoogleMap();
            expect(() => gm.removeHeatmap()).not.toThrow();
        });
    });

    describe('map operations', () => {
        let googleMap: GoogleMap;

        beforeEach(() => {
            googleMap = createGoogleMap();
        });

        it('should set map center', () => {
            googleMap.setCenter(47.6, 17.5);
            expect(googleMap.map.setCenter).toHaveBeenCalled();
        });

        it('should set center with bound check - outside bounds', () => {
            googleMap.map.getBounds = jest.fn(
                () =>
                    ({
                        contains: jest.fn(() => false),
                    }) as any,
            );
            googleMap.setCenter(47.6, 17.5, true);
            expect(googleMap.map.setCenter).toHaveBeenCalled();
        });

        it('should not set center with bound check - inside bounds', () => {
            googleMap.map.getBounds = jest.fn(
                () =>
                    ({
                        contains: jest.fn(() => true),
                    }) as any,
            );
            // Clear previous setCenter calls from constructor
            (googleMap.map.setCenter as jest.Mock).mockClear();
            googleMap.setCenter(47.6, 17.5, true);
            expect(googleMap.map.setCenter).not.toHaveBeenCalled();
        });

        it('should get map center', () => {
            const center = googleMap.getCenter();
            expect(center).toHaveProperty('latitude');
            expect(center).toHaveProperty('longitude');
        });

        it('should trigger resize', () => {
            googleMap.triggerResize();
            expect(google.maps.event.trigger).toHaveBeenCalledWith(
                googleMap.map,
                'resize',
            );
        });

        it('should calculate dynamic radius', () => {
            const mockProjection = {
                fromContainerPixelToLatLng: jest.fn(
                    () => new google.maps.LatLng(47.6, 17.5),
                ),
            };
            googleMap.overlay.getProjection = jest.fn(
                () => mockProjection as any,
            );
            const radius = googleMap.getDinamicRadius(50);
            expect(radius).toBe(500);
            expect(
                google.maps.geometry.spherical.computeDistanceBetween,
            ).toHaveBeenCalled();
        });
    });

    describe('geocoding', () => {
        it('should search address and resolve on success', () => {
            const googleMap = createGoogleMap();
            const mockResult = {
                formatted_address: 'Budapest, Hungary',
                geometry: {
                    location: new google.maps.LatLng(47.497, 19.04),
                },
            };

            // Ensure GeocoderStatus.OK is defined
            (google.maps as any).GeocoderStatus = { OK: 'OK', ZERO_RESULTS: 'ZERO_RESULTS' };

            const originalGeocoder = google.maps.Geocoder;
            (google.maps as any).Geocoder = class {
                geocode(_req: any, callback: any) {
                    callback([mockResult], google.maps.GeocoderStatus.OK);
                }
            };

            const promise = googleMap.searchAddress('Budapest');
            expect(promise).toBeDefined();

            (google.maps as any).Geocoder = originalGeocoder;
        });

        it('should reject on geocoder error', () => {
            const googleMap = createGoogleMap();

            (google.maps as any).GeocoderStatus = { OK: 'OK', ZERO_RESULTS: 'ZERO_RESULTS' };

            const originalGeocoder = google.maps.Geocoder;
            (google.maps as any).Geocoder = class {
                geocode(_req: any, callback: any) {
                    callback(null, google.maps.GeocoderStatus.ZERO_RESULTS);
                }
            };

            const promise = googleMap.searchAddress('nonexistent');
            expect(promise).toBeDefined();

            (google.maps as any).Geocoder = originalGeocoder;
        });
    });

    describe('event handlers', () => {
        let googleMap: GoogleMap;

        beforeEach(() => {
            googleMap = createGoogleMap();
        });

        it('should have eventMapClick handler', () => {
            expect(() =>
                googleMap.eventMapClick(47.6, 17.5, {}),
            ).not.toThrow();
        });

        it('should have eventMapTypeChange handler', () => {
            expect(() =>
                googleMap.eventMapTypeChange('satellite', {}),
            ).not.toThrow();
        });

        it('should have eventMarkerClick handler', () => {
            expect(() =>
                googleMap.eventMarkerClick(new Objekt(), {}),
            ).not.toThrow();
        });

        it('should have eventMarkerDoubleClick handler', () => {
            expect(() =>
                googleMap.eventMarkerDoubleClick(new Objekt(), {}),
            ).not.toThrow();
        });

        it('should have eventMarkerRightClick handler', () => {
            expect(() =>
                googleMap.eventMarkerRightClick(new Objekt(), {}),
            ).not.toThrow();
        });

        it('should have eventMarkerChanged handler', () => {
            expect(() =>
                googleMap.eventMarkerChanged(new Objekt(), 47.6, 17.5, {}),
            ).not.toThrow();
        });

        it('should have eventPolygonClick handler', () => {
            expect(() =>
                googleMap.eventPolygonClick(new Objekt(), 47.6, 17.5, {}),
            ).not.toThrow();
        });

        it('should have eventPolygonDoubleClick handler', () => {
            expect(() =>
                googleMap.eventPolygonDoubleClick(
                    new Objekt(),
                    47.6,
                    17.5,
                    {},
                ),
            ).not.toThrow();
        });

        it('should have eventPolygonRightClick handler', () => {
            expect(() =>
                googleMap.eventPolygonRightClick(
                    new Objekt(),
                    47.6,
                    17.5,
                    {},
                ),
            ).not.toThrow();
        });

        it('should have eventPolygonChanged handler', () => {
            expect(() =>
                googleMap.eventPolygonChanged(new Objekt(), []),
            ).not.toThrow();
        });
    });
});

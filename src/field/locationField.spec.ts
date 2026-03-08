import { parseInputBlock } from '../component';
import { Query } from '../core';
import { LocationField } from './locationField';
import { installCanvasMock, uninstallCanvasMock } from '../test-helpers';

// Supplement @googlemaps/jest-mocks with missing visualization, geometry, and StyledMapType mocks
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
    (google.maps as any).StyledMapType = jest.fn().mockImplementation(function (
        this: any,
    ) {
        this.name = '';
    });
    (google.maps as any).GeocoderStatus = {
        OK: 'OK',
        ZERO_RESULTS: 'ZERO_RESULTS',
    };
}

let savedInputBlockHTML: string;

function createLocationField(): LocationField {
    const inputBlock = new Query<HTMLElement>(
        '.input-block.field-location',
    ).getKnot();
    const { input, label, error } = parseInputBlock(inputBlock);
    return new LocationField(input, label, error, inputBlock);
}

describe('locationField', () => {
    let ctx: Record<string, jest.Mock | any>;

    beforeEach(() => {
        // Save original input block HTML to restore after each test
        const block = document.querySelector('.input-block.field-location');
        if (block && !savedInputBlockHTML) {
            savedInputBlockHTML = block.outerHTML;
        }
        ctx = installCanvasMock();
        setupSupplementaryMocks();
    });

    afterEach(() => {
        uninstallCanvasMock();
        // Restore the input block to its original state
        const block = document.querySelector('.input-block.field-location');
        if (block && savedInputBlockHTML) {
            block.outerHTML = savedInputBlockHTML;
        }
    });

    describe('constructor', () => {
        it('should be instance of LocationField', () => {
            const locationField = createLocationField();
            expect(locationField).toBeInstanceOf(LocationField);
        });

        it('should read icon data from input', () => {
            const locationField = createLocationField();
            expect(locationField.icon).toBeDefined();
            expect(locationField.icon.url).toBe('example/images/location.png');
        });
    });

    describe('render', () => {
        it('should create map container and advanced inputs', () => {
            const locationField = createLocationField();
            locationField.render();

            expect(locationField.map).toBeDefined();
            expect(locationField.mapLockKnot).toBeDefined();
            expect(locationField.advancedKnot).toBeDefined();
            expect(locationField.latitudeInput).toBeDefined();
            expect(locationField.longitudeInput).toBeDefined();
        });

        it('should set default value from data attribute', () => {
            const locationField = createLocationField();
            locationField.render();

            const value = locationField.getValue();
            expect(value).toBeDefined();
            expect(value.latitude).toBe(47.7256);
            expect(value.longitude).toBe(17.49);
            expect(value.address).toBe('9153 Öttevény');
        });

        it('should create a marker for the default location', () => {
            const locationField = createLocationField();
            locationField.render();

            const marker = locationField.map.getMarker(0);
            expect(marker).not.toBeNull();
        });
    });

    describe('setValue', () => {
        it('should update position and marker', () => {
            const locationField = createLocationField();
            locationField.render();

            const newLocation = {
                address: 'Budapest',
                latitude: 47.4979,
                longitude: 19.0402,
            };
            locationField.setValue(newLocation);

            const value = locationField.getValue();
            expect(value.latitude).toBe(47.4979);
            expect(value.longitude).toBe(19.0402);
            expect(value.address).toBe('Budapest');
        });

        it('should update advanced inputs', () => {
            const locationField = createLocationField();
            locationField.render();

            const newLocation = {
                address: 'Test',
                latitude: 10.0,
                longitude: 20.0,
            };
            locationField.setValue(newLocation);

            expect(locationField.latitudeInput.getNode().value).toBe('10');
            expect(locationField.longitudeInput.getNode().value).toBe('20');
        });

        it('should remove marker when lat/lng are null', () => {
            const locationField = createLocationField();
            locationField.render();

            locationField.setValue({
                address: 'Nowhere',
                latitude: null,
                longitude: null,
            });

            const marker = locationField.map.getMarker(0);
            expect(marker).toBeNull();
        });

        it('should update existing marker on second setValue', () => {
            const locationField = createLocationField();
            locationField.render();

            // First setValue creates the marker
            locationField.setValue({
                address: 'First',
                latitude: 47.0,
                longitude: 17.0,
            });

            // Second setValue should update the existing marker
            locationField.setValue({
                address: 'Second',
                latitude: 48.0,
                longitude: 18.0,
            });

            const value = locationField.getValue();
            expect(value.latitude).toBe(48.0);
            expect(value.longitude).toBe(18.0);
        });
    });

    describe('getValue', () => {
        it('should return location data object', () => {
            const locationField = createLocationField();
            locationField.render();

            const value = locationField.getValue();
            expect(value).toEqual(
                expect.objectContaining({
                    latitude: expect.any(Number),
                    longitude: expect.any(Number),
                    address: expect.any(String),
                }),
            );
        });
    });

    describe('updatePosition', () => {
        it('should update lat/lng in value', () => {
            const locationField = createLocationField();
            locationField.render();

            locationField.updatePosition(50.0, 25.0);

            const value = locationField.getValue();
            expect(value.latitude).toBe(50.0);
            expect(value.longitude).toBe(25.0);
        });

        it('should remove marker when called with null', () => {
            const locationField = createLocationField();
            locationField.render();

            locationField.updatePosition(null, null);

            const marker = locationField.map.getMarker(0);
            expect(marker).toBeNull();
        });
    });

    describe('map events', () => {
        it('should update position on mapClick', () => {
            const locationField = createLocationField();
            locationField.render();

            locationField.map.emit('mapClick', 48.0, 20.0);

            const value = locationField.getValue();
            expect(value.latitude).toBe(48.0);
            expect(value.longitude).toBe(20.0);
        });

        it('should clear position on markerRightClick', () => {
            const locationField = createLocationField();
            locationField.render();

            locationField.map.emit('markerRightClick');

            const marker = locationField.map.getMarker(0);
            expect(marker).toBeNull();
        });

        it('should update position on markerChanged', () => {
            const locationField = createLocationField();
            locationField.render();

            locationField.map.emit('markerChanged', {}, 49.0, 21.0);

            const value = locationField.getValue();
            expect(value.latitude).toBe(49.0);
            expect(value.longitude).toBe(21.0);
        });
    });

    describe('search', () => {
        it('should geocode and update value', async () => {
            const locationField = createLocationField();
            locationField.render();

            // Ensure GeocoderStatus is available for searchAddress comparison
            (google.maps as any).GeocoderStatus = { OK: 'OK' };

            // Replace Geocoder with a plain constructor function
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (google.maps as any).Geocoder = function (this: any) {
                this.geocode = (_request: any, callback: any) => {
                    callback(
                        [
                            {
                                formatted_address: 'Budapest, Hungary',
                                geometry: {
                                    location: {
                                        lat: () => 47.4979,
                                        lng: () => 19.0402,
                                    },
                                },
                            },
                        ],
                        'OK',
                    );
                    return Promise.resolve();
                };
            };

            locationField.search('Budapest');

            // Flush microtasks — Promize wraps native Promise, needs multiple ticks
            await new Promise((r) => setTimeout(r, 0));

            const value = locationField.getValue();
            expect(value.latitude).toBe(47.4979);
            expect(value.longitude).toBe(19.0402);
        });

        it('should handle geocode failure gracefully', () => {
            const locationField = createLocationField();
            locationField.render();

            // Ensure GeocoderStatus is available for searchAddress comparison
            (google.maps as any).GeocoderStatus = { OK: 'OK' };
            // Replace Geocoder with a plain constructor that returns zero results
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (google.maps as any).Geocoder = function (this: any) {
                this.geocode = (_request: any, callback: any) => {
                    callback([], 'ZERO_RESULTS');
                    return Promise.resolve();
                };
            };

            const originalValue = locationField.getValue();
            locationField.search('nonexistent_address_xyz');

            // Value should remain unchanged after failed search
            const value = locationField.getValue();
            expect(value.latitude).toBe(originalValue.latitude);
            expect(value.longitude).toBe(originalValue.longitude);
        });
    });

    describe('setMapType', () => {
        it('should delegate to embedded map', () => {
            const locationField = createLocationField();
            locationField.render();

            locationField.setMapType('satellite');
            expect(locationField.map.map.setMapTypeId).toHaveBeenCalledWith(
                'satellite',
            );
        });
    });

    describe('setCustomMapStyle', () => {
        it('should delegate to embedded map', () => {
            const locationField = createLocationField();
            locationField.render();

            const styles: google.maps.MapTypeStyle[] = [];
            locationField.setCustomMapStyle('custom', 'Custom', styles);
            expect(google.maps.StyledMapType).toHaveBeenCalledWith(styles, {
                name: 'Custom',
            });
        });
    });

    describe('refresh', () => {
        it('should add map-lock class when disabled', () => {
            const locationField = createLocationField();
            locationField.render();

            locationField.setDisabled(true);
            locationField.refresh();

            expect(locationField.mapLockKnot.hasClass('map-lock')).toBeTruthy();
        });

        it('should remove map-lock class when enabled', () => {
            const locationField = createLocationField();
            locationField.render();

            locationField.setDisabled(false);
            locationField.refresh();

            expect(locationField.mapLockKnot.hasClass('map-lock')).toBeFalsy();
        });
    });

    describe('keyboard events', () => {
        it('should trigger search on Enter key', () => {
            const locationField = createLocationField();
            locationField.render();

            const searchHandler = jest.fn();
            locationField.on('search', searchHandler);

            const inputNode = locationField.input.getNode();
            inputNode.value = 'Test Address';
            const event = new KeyboardEvent('keyup', { key: 'Enter' });
            inputNode.dispatchEvent(event);

            expect(searchHandler).toHaveBeenCalledWith('Test Address');
        });

        it('should trigger change on other keys', () => {
            const locationField = createLocationField();
            locationField.render();

            const inputNode = locationField.input.getNode();
            inputNode.value = 'Test';
            const event = new KeyboardEvent('keyup', { key: 'a' });
            inputNode.dispatchEvent(event);

            // The change event handler should update the address in the value
            const value = locationField.getValue();
            expect(value.address).toBe('Test');
        });
    });

    describe('change event', () => {
        it('should update address in location data on change', () => {
            const locationField = createLocationField();
            locationField.render();

            const inputNode = locationField.input.getNode();
            inputNode.value = 'New Address';
            const event = new Event('change');
            inputNode.dispatchEvent(event);

            const value = locationField.getValue();
            expect(value.address).toBe('New Address');
        });
    });

    describe('advanced toggle button', () => {
        it('should toggle advanced inputs visibility on click', () => {
            const locationField = createLocationField();
            locationField.render();

            expect(locationField.advancedKnot.hasClass('hidden')).toBeTruthy();

            // Click the advanced button
            const advancedButtonNode = locationField.advancedButton.getNode();
            advancedButtonNode.dispatchEvent(new Event('click'));

            expect(locationField.advancedKnot.hasClass('hidden')).toBeFalsy();
            expect(
                locationField.advancedButton.hasClass('active'),
            ).toBeTruthy();
        });

        it('should not toggle when disabled', () => {
            const locationField = createLocationField();
            locationField.render();

            locationField.setDisabled(true);

            const advancedButtonNode = locationField.advancedButton.getNode();
            advancedButtonNode.dispatchEvent(new Event('click'));

            // Should remain hidden since field is disabled
            expect(locationField.advancedKnot.hasClass('hidden')).toBeTruthy();
        });
    });

    describe('search button', () => {
        it('should trigger search event on click', () => {
            const locationField = createLocationField();
            locationField.render();

            const searchHandler = jest.fn();
            locationField.on('search', searchHandler);

            const inputNode = locationField.input.getNode();
            inputNode.value = 'Budapest';

            // Find the search button in action container
            const searchButton = locationField.actionContainerKnot
                .getNode()
                .querySelector('.search-button');
            expect(searchButton).not.toBeNull();
            searchButton!.dispatchEvent(new Event('click'));

            expect(searchHandler).toHaveBeenCalledWith('Budapest');
        });

        it('should not trigger search when disabled', () => {
            const locationField = createLocationField();
            locationField.render();

            const searchHandler = jest.fn();
            locationField.on('search', searchHandler);

            locationField.setDisabled(true);

            const searchButton = locationField.actionContainerKnot
                .getNode()
                .querySelector('.search-button');
            searchButton!.dispatchEvent(new Event('click'));

            expect(searchHandler).not.toHaveBeenCalled();
        });
    });

    describe('advanced input change', () => {
        it('should update latitude when advanced latitude input changes', () => {
            const locationField = createLocationField();
            locationField.render();

            // Toggle advanced inputs to be visible
            const advancedButtonNode = locationField.advancedButton.getNode();
            advancedButtonNode.dispatchEvent(new Event('click'));

            const latInputNode = locationField.latitudeInput.getNode();
            latInputNode.value = '50.5';
            latInputNode.dispatchEvent(new Event('change'));

            const value = locationField.getValue();
            expect(value.latitude).toBe('50.5');
        });

        it('should update longitude when advanced longitude input changes', () => {
            const locationField = createLocationField();
            locationField.render();

            // Toggle advanced inputs to be visible
            const advancedButtonNode = locationField.advancedButton.getNode();
            advancedButtonNode.dispatchEvent(new Event('click'));

            const lngInputNode = locationField.longitudeInput.getNode();
            lngInputNode.value = '25.5';
            lngInputNode.dispatchEvent(new Event('change'));

            const value = locationField.getValue();
            expect(value.longitude).toBe('25.5');
        });
    });
});

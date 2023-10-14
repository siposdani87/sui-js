export declare class GeoLocation {
    options: {
        enableHighAccuracy: boolean;
        timeout: number;
        maximumAge: number;
    };
    watcherId: number;
    constructor();
    private _init;
    setWatcher(): void;
    getPosition(): import("..").Promize<[number, number], [null, null]>;
    clearWatcher(): void;
    eventChange(latitude: number, longitude: number, message: string): void;
    private _handlePosition;
    private _handleError;
    eventError(message: string, code: string): void;
}

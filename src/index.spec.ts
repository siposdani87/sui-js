import * as SUI from './index';

describe('Module exports', () => {
    describe('core exports', () => {
        it.each([
            'Async',
            'Collection',
            'Deferred',
            'Knot',
            'Module',
            'Objekt',
            'Promize',
            'Query',
            'Router',
            'State',
        ])('should export %s', (name) => {
            expect(SUI[name]).toBeDefined();
        });
    });

    describe('common exports', () => {
        it.each(['Controller', 'Service', 'releaseMode', 'coreResources'])(
            'should export %s',
            (name) => {
                expect(SUI[name]).toBeDefined();
            },
        );
    });

    describe('component exports', () => {
        it.each([
            'Application',
            'Calendar',
            'Canvas',
            'CardCollection',
            'Carousel',
            'Clock',
            'ContentHandler',
            'DateTime',
            'Day',
            'Dropdown',
            'Form',
            'GoogleMap',
            'Month',
            'Navigation',
            'Pager',
            'Popup',
            'PopupContainer',
            'ProgressStatus',
            'Route',
            'Table',
            'TabPanel',
            'Time',
            'Tooltip',
            'Waiter',
            'Year',
        ])('should export %s', (name) => {
            expect(SUI[name]).toBeDefined();
        });
    });

    describe('module exports', () => {
        it.each([
            'BaseModal',
            'BottomMenu',
            'Browser',
            'Confirm',
            'Cookie',
            'Dialog',
            'Page',
            'EventBus',
            'Flash',
            'Footer',
            'GeoLocation',
            'Header',
            'Helper',
            'Http',
            'LeftMenu',
            'Loader',
            'NavBar',
            'ProgressBar',
            'Scheduler',
            'Script',
            'Depot',
            'Style',
            'Template',
            'TopMenu',
            'Viewer',
            'Screen',
            'Xhr',
        ])('should export %s', (name) => {
            expect(SUI[name]).toBeDefined();
        });
    });

    describe('field exports', () => {
        it.each([
            'AutoCompleteField',
            'BaseField',
            'Button',
            'CheckboxField',
            'ColorField',
            'DateTimeField',
            'DateTimeRangeField',
            'FileField',
            'HiddenField',
            'IconToggleField',
            'LocationField',
            'NumberField',
            'RadiobuttonField',
            'RangeField',
            'ResetButton',
            'SearchField',
            'SelectField',
            'SubmitButton',
            'SwitchField',
            'TextareaField',
            'TextField',
            'UrlField',
        ])('should export %s', (name) => {
            expect(SUI[name]).toBeDefined();
        });
    });

    describe('utils exports', () => {
        it('should export DateIO', () => {
            expect(SUI.DateIO).toBeDefined();
        });

        it.each([
            'encodeBase64',
            'decodeBase64',
            'encrypt',
            'decrypt',
            'md5',
            'guid',
            'generateId',
        ])('should export coder function %s', (name) => {
            expect(SUI[name]).toBeDefined();
        });

        it.each([
            'convertRGBToHSV',
            'convertRGBToHEX',
            'convertHEXToHSV',
            'convertHEXToRGB',
            'convertHSVToRGB',
            'convertHSVToHEX',
            'colorContrastYIQ',
            'colorContrast',
        ])('should export color function %s', (name) => {
            expect(SUI[name]).toBeDefined();
        });

        it.each([
            'readableCurrency',
            'readableNumber',
            'round',
            'floor',
            'ceil',
            'random',
        ])('should export math function %s', (name) => {
            expect(SUI[name]).toBeDefined();
        });
    });

    it('should not export treeView (commented out)', () => {
        expect(SUI['TreeView']).toBeUndefined();
    });
});

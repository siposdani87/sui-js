import { coreResources } from '../core';
import { Application } from './application';

describe('application', () => {
    it('should run the application', () => {
        const infoSpy = jest.spyOn(console, 'info');
        const options = {};

        const application = new Application(options, coreResources);
        application.run([], []);

        expect(infoSpy).toHaveBeenNthCalledWith(
            1,
            ...[
                '%cApplication run in development environment...',
                'font-weight:bold;color:#000;',
            ],
        );
        infoSpy.mockRestore();
    });
});

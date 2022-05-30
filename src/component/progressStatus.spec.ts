import { Query } from '../core';
import { ProgressStatus } from './progressStatus';

describe('progressStatus', () => {
    it('should be instance of ProgressStatus', () => {
        const node = new Query('.template-view').getItem();
        const progressStatus = new ProgressStatus(node);

        expect(progressStatus).toBeInstanceOf(ProgressStatus);
    });
});

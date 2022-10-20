import { Query } from '../core';
import { ProgressStatus } from './progressStatus';

describe('progressStatus', () => {
    it('should be instance of ProgressStatus', () => {
        const knot = new Query('.template-view').getKnot();
        const progressStatus = new ProgressStatus(knot);

        expect(progressStatus).toBeInstanceOf(ProgressStatus);
    });
});

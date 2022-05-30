import { TreeView } from './treeView';

describe('treeView', () => {
    it('should be instance of TreeView', () => {
        const treeView = new TreeView();

        expect(treeView).toBeInstanceOf(TreeView);
    });
});

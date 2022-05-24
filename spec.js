const fs = require('fs');
const glob = require('glob');
const path = require('path');

const capitalize = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1);

glob('src/**/*.ts', {}, (error, files) => {
    if (error) {
        return;
    }
    const specFiles = files.filter((fileName) => fileName.indexOf('.spec.ts') !== -1).map((fileName) => fileName.replace('.spec.ts', '.ts'));
    const filteredFiles = files.filter((fileName) => fileName.indexOf('test/') === -1 && fileName.indexOf('index') === -1 && fileName.indexOf('.spec.ts') === -1 && specFiles.indexOf(fileName) === -1);

    filteredFiles.forEach(filePath => {
        const fileName = path.basename(filePath, path.extname(filePath));
        const className = capitalize(fileName);
        const specFile = filePath.replace('.ts', '.spec.ts');

        const data = `import { ${className} } from './${fileName}';

describe('${className}', () => {
    it('should be instance of ${className}', () => {
        const ${fileName} = new ${className}();
        
        expect(${fileName}).toBeInstanceOf(${className});
    });
});
`;
        console.log({
            specFile,
            data
        });

        // fs.writeFileSync(specFile, data);
    });
});
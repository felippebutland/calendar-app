const path = require('path');

module.exports = {
    src: path.resolve(__dirname, '..', 'src'),
    schema: path.resolve(__dirname, '..', 'src', 'schema.graphql'),
    artifactDirectory: path.resolve(__dirname, '..', 'src', '__generated__'),
    language: 'javascript',
    extensions: ['js', 'jsx'],
    exclude: ['**/node_modules/**', '**/__mocks__/**', '**/__tests__/**'],
};

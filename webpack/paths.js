const path = require('path');

const PROJECT_ROOT = path.resolve(__dirname, '../');
const SOURCE_PATH = path.resolve(__dirname, '../src');

module.exports = {
  root: PROJECT_ROOT,
  entryPath: path.join(SOURCE_PATH, 'index.tsx'),
  templatePath: path.resolve(__dirname, '../', 'public/index.html'),
};

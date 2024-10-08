const path = require('path');
const fs = require('fs');
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

const moduleFileExtensions = [
  'web.mjs',
  'mjs',
  'web.js',
  'js',
  'web.ts',
  'ts',
  'web.tsx',
  'tsx',
  'json',
  'web.jsx',
  'jsx',
];

const resolveModule = (resolveFn, filePath) => {
  const extension = moduleFileExtensions.find((extension) =>
    fs.existsSync(resolveFn(`${filePath}.${extension}`)),
  );

  if (extension) {
    return resolveFn(`${filePath}.${extension}`);
  }

  return resolveFn(`${filePath}.js`);
};
console.log('appIndexJsx', resolveModule(resolveApp, 'src/index'));
module.exports = {
  appHtml: resolveApp('public/index.html'),
  appIndexJsx: resolveModule(resolveApp, 'src/index'),
  appBuild: resolveApp('dist'),
  appSrc: resolveApp('src'),
  components: resolveApp('src/components'),
  pages: resolveApp('src/pages'),
  utils: resolveApp('src/utils'),
};

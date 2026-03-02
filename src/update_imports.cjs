const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname);

function walkSync(currentDirPath, callback) {
  fs.readdirSync(currentDirPath).forEach(name => {
    const filePath = path.join(currentDirPath, name);
    const stat = fs.statSync(filePath);
    if (stat.isFile()) {
      callback(filePath, stat);
    } else if (stat.isDirectory()) {
      walkSync(filePath, callback);
    }
  });
}

const aliasMap = {
  components: '@components',
  pages: '@pages',
  assets: '@assets',
  utils: '@utils',
  constants: '@constants',
  hooks: '@hooks',
  services: '@services',
  admin: '@admin',
  'super-admin': '@super-admin',
  user: '@user',
  landing: '@landing',
  interfaces: '@interfaces',
  common: '@common',
  atoms: '@atoms',
  forms: '@forms',
  UI: '@UI'
};

walkSync(srcDir, filePath => {
  if (filePath.endsWith('.ts') || filePath.endsWith('.tsx')) {
    let content = fs.readFileSync(filePath, 'utf-8');
    let originalContent = content;

    Object.keys(aliasMap).forEach(key => {
      // e.g. from '../../components/something' -> from '@components/something'
      const regexFrom = new RegExp(
        `from\\s+['"](?:\\.\\./|\\./)+${key}(/?[^'"]*)['"]`,
        'g'
      );
      content = content.replace(regexFrom, (match, p1) => {
        return `from '${aliasMap[key]}${p1 !== undefined ? p1 : ''}'`;
      });

      const regexImport = new RegExp(
        `import\\s+['"](?:\\.\\./|\\./)+${key}(/?[^'"]*)['"]`,
        'g'
      );
      content = content.replace(regexImport, (match, p1) => {
        return `import '${aliasMap[key]}${p1 !== undefined ? p1 : ''}'`;
      });
    });

    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf-8');
      console.log(`Updated imports in: ${filePath}`);
    }
  }
});
console.log('Finished updating import paths.');

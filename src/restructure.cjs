const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname);

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach(function (childItemName) {
      copyRecursiveSync(
        path.join(src, childItemName),
        path.join(dest, childItemName)
      );
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

function rmRecursiveSync(dir) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

// Features domains
const domains = ['admin', 'super-admin', 'user', 'landing'];

domains.forEach(domain => {
  // Target Folders
  const targetComponentFolder = path.join(srcDir, domain, 'components');
  const targetPageFolder = path.join(srcDir, domain, 'pages');

  // Source Folders
  const sourceComponentFolder = path.join(srcDir, 'components', domain);
  const sourcePageFolder = path.join(srcDir, 'pages', domain);

  // Move Contents via Copy & Delete to avoid Windows EPERM
  if (fs.existsSync(sourceComponentFolder)) {
    console.log(
      `Copying components: ${sourceComponentFolder} -> ${targetComponentFolder}`
    );
    copyRecursiveSync(sourceComponentFolder, targetComponentFolder);
    console.log(`Deleting old components: ${sourceComponentFolder}`);
    try {
      rmRecursiveSync(sourceComponentFolder);
    } catch (e) {
      console.warn(
        `Failed to delete ${sourceComponentFolder}, but copy was successful. Error: ${e.message}`
      );
    }
  }

  if (fs.existsSync(sourcePageFolder)) {
    console.log(`Copying pages: ${sourcePageFolder} -> ${targetPageFolder}`);
    copyRecursiveSync(sourcePageFolder, targetPageFolder);
    console.log(`Deleting old pages: ${sourcePageFolder}`);
    try {
      rmRecursiveSync(sourcePageFolder);
    } catch (e) {
      console.warn(
        `Failed to delete ${sourcePageFolder}, but copy was successful. Error: ${e.message}`
      );
    }
  }
});

console.log('Restructuring Complete!');

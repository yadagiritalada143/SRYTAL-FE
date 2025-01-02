const fs = require('fs');
const path = require('path');

// Path to your build folder
const distDir = path.resolve(__dirname, 'dist');

// Function to copy files from dist/ to dist/public/
function copyImages() {
    const files = fs.readdirSync(distDir);

    // Find all files from the public folder copied to dist/
    files.forEach((file) => {
        const srcPath = path.join(distDir, file);
        const destPath = path.join(distDir, 'public', file);

        // If the file exists in dist and is an image file (you can add more extensions if needed)
        if (fs.existsSync(srcPath) && /\.(jpg|jpeg|png|gif)$/.test(file)) {
            // Ensure the 'public' folder exists in dist
            if (!fs.existsSync(path.join(distDir, 'public'))) {
                fs.mkdirSync(path.join(distDir, 'public'));
            }

            // Copy the file to dist/public/
            fs.renameSync(srcPath, destPath);
            console.log(`Copied ${file} to dist/public/`);
        }
    });
}

copyImages();

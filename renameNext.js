// Rename the _next directory to next. It needs for MacOS, because it does not include underscored files/directories in build
const fs = require('fs');
const path = require('path');

const buildDir = path.join(__dirname, 'out');
const oldDir = path.join(buildDir, '_next');
const newDir = path.join(buildDir, 'next');
const indexPath = path.join(buildDir, 'index.html');

// Rename the _next directory to next
fs.rename(oldDir, newDir, function (err) {
  if (err) {
    console.error('Error renaming _next to next:', err);
  } else {
    console.log('_next directory renamed to next');

    // Update references in index.html
    fs.readFile(indexPath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading index.html:', err);
        return;
      }

      const result = data.replace(/\/_next\//g, '/next/');

      fs.writeFile(indexPath, result, 'utf8', (err) => {
        if (err) {
          console.error('Error writing updated index.html:', err);
        } else {
          console.log('Updated _next references in index.html');
        }
      });
    });
  }
});

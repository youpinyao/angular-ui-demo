const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

function zip() {
  console.log(chalk.green('zip ing'));

  const folderPath = '../../';
  const directorys = ['front', 'build'];
  const files = ['README.md', '.eslintrc.json', 'favicon.ico', '.babelrc', '.editorconfig',
    '.eslintignore', '.gitignore', '.gitattributes', '.jsbeautifyrc', '.stylelintrc',
    'package.json'
  ];
  const output = fs.createWriteStream(path.join(__dirname, folderPath, 'demo.zip'));
  const archive = archiver('zip', {
    zlib: {
      level: 9
    } // Sets the compression level.
  });

  // listen for all archive data to be written
  output.on('close', function() {
    console.log(archive.pointer() + ' total bytes');
    console.log('archiver has been finalized and the output file descriptor has closed.');
  });

  // good practice to catch warnings (ie stat failures and other non-blocking errors)
  archive.on('warning', function(err) {
    if (err.code === 'ENOENT') {
      // log warning
    } else {
      // throw error
      throw err;
    }
  });

  // good practice to catch this error explicitly
  archive.on('error', function(err) {
    throw err;
  });

  // pipe archive data to the file
  archive.pipe(output);
  archive.directory(path.join(__dirname, folderPath, 'build/'), 'build');
  archive.directory(path.join(__dirname, folderPath, 'front/'), 'front');

  directorys.forEach(d => {
    archive.directory(path.join(__dirname, folderPath, d), d)
  });
  files.forEach(d => {
    archive.file(path.join(__dirname, folderPath, d), {
      name: d,
    })
  });

  archive.finalize();
}

module.exports = zip;

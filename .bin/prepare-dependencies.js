var fs = require('fs');

// Fix env error when developing on windows pdfjs
fs.readFile('node_modules/util/util.js', function (err, data) {
  if (err) {
    console.log('Missing dependency. Skipping replacements: ', err);
  } else {
    var array = data.toString().split('\n');
    for (i in array) {
      if (i > 107 && i < 122 && !array[i].startsWith('//')) {
        array[i].startsWith('//');
        array[i] = '// ' + array[i];
      }
    }
    var docWithCommentedLines = array.join('\n');
    fs.writeFile('node_modules/util/util.js', docWithCommentedLines, 'utf8', function (err) {
      if (err) console.log('Error: ', err);
    });
  }
});

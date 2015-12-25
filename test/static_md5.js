var fs = require("fs")
    , path = require('path')
    , crypto = require('crypto');
var siteRootPath = __dirname.substring(0, __dirname.length - 5);


fs.readdir(path.join(siteRootPath, 'public'), function (err, files) {
    if (err) {
        return console.log('error')
    } else {
        console.log(files);
    }
});


/*

 rf.readFile(path.join(siteRootPath, 'public', 'css/AdminLTE.css'), 'utf-8', function (err, data) {
 if (err) {
 console.log("error");
 } else {
 var fileMD5 = crypto.createHash('md5').update(data).digest('hex');
 console.log(fileMD5);
 }
 });
 */

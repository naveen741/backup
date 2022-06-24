const http = require('http');
const url = require('url');
const fs=require('fs');
var formidable = require('formidable');
http.createServer(function (req, res) {
  
  // fs.writeFile('index.txt','My Head is clear',(err)=>{
  //   if(err)throw err
  //   console.log("success");
  // })
  // fs.open('index.txt','w',(err,file)=>{
  //   if(err)throw err
  //   console.log(file);
  // })
  // fs.readFile('index.html', (err, data)=>{
  //   res.writeHead(200, {'Content-Type': 'text/html'});
  //   res.write(data)
  //   return res.end(data);
  // })
  // var q=url.parse(req.url, true).query;
  // var txt = q.myname + " " + q.myage;
  // res.write(txt)
//   var q = url.parse(req.url, true);

// console.log(q.host); returns 'localhost:8080'
// console.log(q.pathname); returns '/default.htm'
// console.log(q.search); returns '?year=2017&month=february'

// var qdata = q.query; returns an object: { year: 2017, month: 'february' }
// console.log(qdata); returns 'february'
// 
if (req.url == '/fileupload') {
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.filepath;
      var newpath = './' + files.filetoupload.originalFilename;
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        res.write('File uploaded and moved!');
        res.end();
      });
  });
} else {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
  res.write('<input type="file" name="filetoupload"><br>');
  res.write('<input type="submit">');
  res.write('</form>');
  return res.end();
}
}).listen(8080, ()=>{
    console.log("Listening port :8080")
});

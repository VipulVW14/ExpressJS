const { Console } = require('console');
const express = require('express');
const app = express();
const port = 3000;
const fs= require('fs');
const path= require('path');
const folderPath= './files';
app.get('/', (req, res) => {
  res.send('File Server is running!')
});

app.get('/files', (req,res)=>{
    fs.readdir(folderPath, (err,files)=>{
        if(err){
            console.error('Error reading folder: ',err);
            return;
        } 
        res.status(200).json(files);
    })
})

app.get('/files/:filename', (req,res)=>{
    const filename = req.params.filename;
    console.log(filename);

    const filePath=`./files/${filename}`;
    const fileExists= fs.existsSync(filePath);
    if(fileExists){
        fs.readFile(`./files/${filename}`,"utf-8", (err, data)=>{console.log(data);})
    }
    else console.log('File not found!');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
module.exports = app;

// // Creating http server using Node.js using fs library for fetching data of a file//
// function callbackFn(err, data){
//     console.log(data);
// }
// fs.readFile("a.txt","utf-8",callbackFn)
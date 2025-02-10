const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    fs.readdir('./files', (err, files) => {
        res.render('index', {files: files});
    })
})

app.post('/add', (req, res) => {
    fs.writeFile(`./files/${req.body.title}.txt`, req.body.details, (err) => console.log(err));
    res.redirect('/');
})

app.get('/files/:filename', (req, res) => {
    fs.readFile(`./files/${req.params.filename}`, "utf-8", (err, filedata) => {
        res.render('show', {filedata: filedata, filename: req.params.filename});
    })
})

app.get('/edit/:filename', (req, res) => {

    fs.readFile(`./files/${req.params.filename}`, "utf-8", (err, filedata) => {
        res.render('edit', {filename: req.params.filename, filedata: filedata})
    })
    
})

app.post('/edit/:filename', (req, res) => {

    fs.rename(`./files/${req.params.filename}`,`./files/${req.body.title}.txt`, (err) => {
        fs.writeFile(`./files/${req.body.title}.txt`, req.body.details, (err) => {
            console.log(err)
        })
        res.redirect('/')
    })
    
    
})

app.listen(3000, () => {
    console.log("server started at port 3000");
})
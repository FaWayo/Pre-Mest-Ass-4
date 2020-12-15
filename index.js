const express = require('express');
const bodyParser = require('express')
const app = express();
const port = 4000
const adminRouter = require('./controllers/admin')
const authorRouter = require('./controllers/authors')
const bookRouter = require('./controllers/books')

app.use(bodyParser.json());


app.use('/admin', adminRouter)
app.use('/authors', authorRouter)
app.use('/books', bookRouter)

app.listen(port,()=>{
    console.log('My app is running on this server')
});
const express = require('express')
const bookRouter = require('express').Router();
const bookData = require('./mocked_data/books.json');
const authentication = require('./middleware/auth')

// get all books
bookRouter.get('/',(request, response, next)=>{
    
    response.send(bookData)
    next()
})

//book by specific id
bookRouter.get('/:bookId', (request, response) => {
    let book = bookData.find(book => book["bookId"] === request.params.bookId)
    if(book){
        response.status(200).send(book)
    } else{
        response.status(400).send('A book with that id was not found')
    }
})

//create a new book
bookRouter.post('/newbook', authentication.authenticateToken, (request, response) =>{
    const newBook = request.body.book
    bookData.push(newBook)
    response.status(200).send('Book has been added')
    console.log(newBook)
})

bookRouter.delete('/:bookId', authentication.authenticateToken,  (request, response) => {
    const bookId = request.params.bookId
    const deleteBook = bookData.
    response
})
module.exports = bookRouter
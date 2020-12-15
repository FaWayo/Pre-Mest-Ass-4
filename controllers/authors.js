const express = require('express')
const authorRouter = express.Router()
const authorData = require('../mocked_data/authors.json')
const authentication = require('./middleware/auth')

//get list of authors
authorRouter.get('/',(request, response, next)=>{
    const authors = new Array()
    for(let i = 0; i < authorData.length; i++){
        authors.push(authorData[i].name)
    }
    response.status(200).send(authors)
    next();
})

//get author with specific id
authorRouter.get('/:authorId',  (request, response) => {
    let author = authorData.find(author => author["authorId"] === request.params.authorId)
    if(author){
        response.status(200).send(author)
    } else{
        response.status(400).send('An author with that id was not found')
    }
})

//all books by author
authorRouter.get('/:authorId/books', (request, response) => {
    let books = authorData.find(author => author["authorId"] === request.params.authorId)
    if(books){
        response.status(200).send(books.books)
    } else {
        response.status(200).send('An author with that id was not found')
    }
})

//create a new author
authorRouter.post('/', authentication.authenticateToken, (request, response) => {
    const newAuthor = request.body.author
    authorData.push(newAuthor)
    response.status(200).send(newAuthor)
})

//delete an author 
authorRouter.delete('/:authorId', authentication.authenticateToken, (request, response) => {
    let idToDelete = request.params.authorId

})

module.exports = authorRouter
const express = require('express')

var jwt = require('jsonwebtoken');
const adminRouter = express.Router()
const authentication = require('./middleware/auth')
// const bodyParser = require('body-parser');
// router.use(bodyParser.urlencoded({ extended: false }));
// router.use(bodyParser.json());
const User = require('../user/User');

var bcrypt = require('bcrypt');
var config = require('../config');

// On login, use the generateAccessToken method 
// to return a token that will be used later (if this were a fullstack app it would be sent to the browser and saved in cookies/localStorage)
adminRouter.post('/login', (req, res) => {
    const passwordHash = bcrypt.hashSync(req.body.password, 8);
    const { username, passwordHash } = req.body
    const token = authentication.generateAccessToken(username)

    const token = jwt.sign({id: user._id}, config.secret)
    res.status(200).send({ "message": "successful login!", "token": token })
})

adminRouter.get('/', function(req, res) {
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      
      res.status(200).send(decoded);
    });
  });


adminRouter.post('/logout', (req, res) => {
    // Remove said token
})

module.exports = adminRouter



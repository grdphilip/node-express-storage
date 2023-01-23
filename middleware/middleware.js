const express = require('express')
const jwt = require('jsonwebtoken')

/* 
Middleware are functions that execute after the server receives 
the request and before the controller action sends the response,
but there are a few more things that are specific to middleware. 
Has access to req and res variables and can modify them. 
req, res and next() 

Good for authentication, security, protecting routes, input filtering.
 */

function loggingMiddleware(req, res, next) {
    console.log('Inside Middleware');
    next();
  }

  function authorizeUsersAccess(req, res, next) {
    let token

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        // Get token from header
        token = req.headers.authorization.split(' ')[1]
  
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
  
        // Get user from the token
        req.user = User.findById(decoded.id).select('-password')
  
        next()
      } catch (error) {
        console.log(error)
        res.status(401)
        throw new Error('Not authorized')
      }
    }
  
    if (!token) {
      res.status(401)
      throw new Error('Not authorized, no token')
    }


}


module.exports = {
    authorizeUsersAccess,

  };
  
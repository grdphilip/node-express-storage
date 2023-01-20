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

    let token;
    


    next()
  }


module.exports = {
    authorizeUsersAccess,

  };
  
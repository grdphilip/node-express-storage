const express = require('express')


server.get("/api/articles", (req, res) => {
    let responseText = "Hello World!<br>";
    responseText += `<small>Requested at: ${req.requestTime}</small>`;
    res.send(responseText);
    console.log(responseText)
  });
  
  server.post("/", (req, res) => {
    res.send("Got a POST request");
  });
  
  server.put("/user", (req, res) => {
    res.send("Got a PUT request at /user");
  });
  
  server.delete("/user", (req, res) => {
    res.send("Got a DELETE request at /user");
  });
  
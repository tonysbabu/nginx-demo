const express = require("express");

const app = express();

app.get('/', (req, res) => {
  console.log('I am hit');  
  res.send('I am an express endpoint')
})


app.listen(7777, () => {
  console.log('express server started on 7777')
})
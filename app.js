const express = require('express');
const app = express();
const port = 8080;

app.get('/', (req, res) => {
  res.send("Hello World~")
})

//서버 실행
app.listen(port, () => {
  console.log("서버 실행!!!")
})
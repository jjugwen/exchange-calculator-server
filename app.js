const express = require("express");
const app = express();
const port = 8080;
const XMLHttpRequest = require("xhr2");

//cors 추가하면 ajax 잘됨 npm install cors
const cors = require("cors");
const corsOptions = {
  origin: 'http://localhost:3000',
  credential: true
}
app.use(cors(corsOptions));

//국가 통화코드 from(currencyCodeFrom), to(currencyCodeTo) 받으면, exchangeRate, date 보내기
app.post("/api", (req, res) => {
  const { from, to } = req.query;
  const requestURL = `https://api.exchangerate.host/convert?from=${from}&to=${to}`;
  const request = new XMLHttpRequest();
  request.open("GET", requestURL);
  request.responseType = "json";
  request.send();

  request.onload = function () { 
    if(request.status === 200 || request.status === 201){
      const response = request.response;
      const date = response.date;
      const exchangeRate = response.info.rate;
      res.send({exchangeRate, date});
    }else {
      console.error(request.responseText);
    }
  };
});

//국가, 통화단위 보내기
//select ver.2 - currencyNationList.json
//http://shancarter.github.io/mr-data-converter/ 에서 표를 JSON-Dictionary 로 변환
app.get("/currencynationlist", (req, res) => {
  const listData = require('./currencyNationList.json');
  res.send({...listData})
})

//서버 실행
app.listen(port, () => {
  console.log("서버 실행!!!");
});
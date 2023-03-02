const express = require("express");
const app = express();
const port = 8080;
const XMLHttpRequest = require("xhr2");

//cors 추가하면 ajax 잘됨 npm install cors
app.use(express.json());
const cors = require("cors");
app.use(cors());

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("HOME");
});

//국가 통화코드 currency1(currencyCodeFrom), currency2(currencyCodeTo) 받으면, exchangeRate, date 보내기
app.post("/api/:currency1/:currency2", (req, res) => {
  // app.post("/api/:currency", (req, res) => {
  // const currency1 = "USD";
  // const currency2 = "KRW";
  // console.log(req.params);
  const { currency1, currency2 } = req.params;
  const requestURL = `https://api.exchangerate.host/convert?from=${currency1}&to=${currency2}`;
  const request = new XMLHttpRequest();
  request.open("GET", requestURL);
  request.responseType = "json";
  request.send();

  request.onload = function () {
    const response = request.response;
    // console.log(response)
    const date = response.date;
    const exchangeRate = response.info.rate;
    res.send({exchangeRate, date});
    // console.log(exchangeRate)
  };
});

//국가, 통화단위 보내기
//select ver.2 - currencyNationList.json
//http://shancarter.github.io/mr-data-converter/ 에서 표를 JSON-Dictionary 로 변환
const listData = require('./currencyNationList.json');
app.get("/currencynationlist", (req, res) => {
  const data = listData
  res.send({...data})
})

//서버 실행
app.listen(port, () => {
  console.log("서버 실행!!!");
});
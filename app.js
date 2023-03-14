const express = require("express");
const app = express();
const port = 8080;
const { default: fetch } = require("node-fetch");

//cors 추가하면 ajax 잘됨 npm install cors
const cors = require("cors");
const corsOptions = {
  origin: 'http://localhost:3000',
  credential: true
}
app.use(cors(corsOptions));

//latest API 가져와서 데이터 저장
let date = "";
let rates = [];

fetch('https://api.exchangerate.host/latest?base=USD')
.then((resp) => resp.json())
.then((data) => (
  date = data.date,
  // console.log("date", date),
  rates = data.rates
)).catch(
  console.log("Failed to get data from API!")
)
//국가 통화코드 from(currencyCodeFrom), to(currencyCodeTo) 받으면, exchangeRate, date 보내기
app.post("/api", (req, res) => {
  // console.log("post", date, rates)
  const { from, to } = req.query;
  let exchangeRate;
  (from === "USD") ? exchangeRate = rates[to] : exchangeRate = rates[to]/rates[from];
  res.send({exchangeRate, date})
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
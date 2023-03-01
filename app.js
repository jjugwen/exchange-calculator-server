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

//국가 통화코드 currency1, currency2 받으면, exchangeRate값 보내기
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
    const exchangeRate = response.info.rate;
    res.send(`${exchangeRate}`);
    // console.log(exchangeRate)
  };
});

//date, currencylist 보내기
app.get("/currencylist", (req, res) => {
  const currency = "USD";
  const requestURL = `https://api.exchangerate.host/latest?base=${currency}`;
  const request = new XMLHttpRequest();
  request.open("GET", requestURL);
  request.responseType = "json";
  request.send();

  request.onload = function () {
    const response = request.response;
    // console.log(response);
    const date = response.date;
    const currencyList = Object.keys(response.rates);
    // res.send(date);
    // res.send(currencyList);
    res.send({ date, currencyList });
  };
});

//국가, 통화단위(symbols) 보내기
app.get("/nationlist", (req, res) => {
  const requestURL = "https://api.exchangerate.host/symbols";
  const request = new XMLHttpRequest();
  request.open("GET", requestURL);
  request.responseType = "json";
  request.send();

  request.onload = function () {
    const response = request.response;
    // console.log(response.symbols)
    const data = Object.values(response.symbols);
    // console.log(data);
    res.send(data);
  };
});

//서버 실행
app.listen(port, () => {
  console.log("서버 실행!!!");
});
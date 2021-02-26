require("dotenv").config();
const e = require("express");
const exppress = require("express");
// const bodyParser = require("body-parser");
const https = require("https");

const app = exppress();

const key = process.env.WEATHER_API_KEY;

app.get("/", function (req, res) {
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=Irvine&units=imperial&appid=" +
    key;

  https
    .get(url, function (response) {
      //checking the response from API call
      // console.log("statusCode:", response.statusCode);

      //getting weather data from API
      response.on("data", function (data) {
        const weatherData = JSON.parse(data);
        console.log("weatherData", weatherData);

        const temparautre = weatherData.main.temp;
        const description = weatherData.weather[0].description;
        const windSpeed = weatherData.wind.speed;
        const icon = weatherData.weather[0].icon;
        const imgUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        res.write(
          "<p> The weather in Irvine describes as " + description + "<p>"
        );
        res.write(
          "<h1>Temparautre in Irvine is " +
            temparautre +
            "F. And the wind speed is " +
            windSpeed +
            "mph. </h1>"
        );
        res.write("<img src=" + imgUrl + ">");
        res.send();
      });
    })
    .on("error", (e) => {
      console.log("error", e);
    });

  // res.sendFile(__dirname + "/index.html");
});

app.listen(3000, function () {
  console.log("Server started on port 3000!!");
});

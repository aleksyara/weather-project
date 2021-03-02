require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap

app.use(bodyParser.urlencoded({ extended: true })); // use for getting data from req.body

const key = process.env.WEATHER_API_KEY; //key autherntication
app.use(express.static(__dirname + '/public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});


// Landing Main Page









// Catch user input and render weather data
app.post("/", function (req, res) {
  const userInput = req.body.cityName;
  const units = "imperial";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    userInput +
    "&units=" +
    units +
    "&appid=" +
    key;

  // Making API call to get weather data
  https
    .get(url, function (response) {
      //checking the response from API call
      // console.log("statusCode:", response.statusCode);

      //getting weather data from API
      response.on("data", function (data) {
        //parse data from 3rd party API
        const weatherData = JSON.parse(data);
        const temparautre = weatherData.main.temp;
        const description = weatherData.weather[0].description;
        const windSpeed = weatherData.wind.speed;
        const icon = weatherData.weather[0].icon;
        const imgUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        res.write("<p> The weather is currently " + description + "<p>");
        res.write(
          "<h1>The temparautre in " +
            userInput +
            " is " +
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
});

app.listen(3000, function () {
  console.log("Server started on port 3000!!");
});

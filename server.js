require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const path = require("path");
// require the todo "database"
const weatherDb = require("./data/weather-db");

const app = express();

app.use(bodyParser.urlencoded({ extended: true })); // use for getting data from req.body
app.use(express.static(__dirname + "/public"));

const key = process.env.WEATHER_API_KEY; //key authentication

//Set initital array for the Todo items
let temperatures = [0];
let userInput = "X";

// Configure the app (app.set)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//Routing
app.get("/", function (req, res) {
  res.render("index");
});

app.get("/city", function (req, res) {
  res.render("city", { temperatures: temperatures, userInput: userInput });
  // res.render("city", {
  //   items: weatherDb.getAll(),
  // });
});

// Landing Main Page

// Catch user input and render weather data
app.post("/", function (req, res) {
  userInput = req.body.cityName;
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
        let temperature = weatherData.main.temp;
        temperatures.push(temperature);
        const description = weatherData.weather[0].description;
        const windSpeed = weatherData.wind.speed;
        const icon = weatherData.weather[0].icon;
        const imgUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        // res.write("<p> The weather is currently " + description + "<p>");
        // res.write(
        //   "<h1>The temperature in " +
        //     userInput +
        //     " is " +
        //     temperature +
        //     "F. And the wind speed is " +
        //     windSpeed +
        //     "mph. </h1>"
        // );
        // res.write("<img src=" + imgUrl + ">");
        // res.send();
        // res.render(__dirname + "/views/city.html");
      });
    })
    .on("error", (e) => {
      console.log("error", e);
    });

  res.render("city", { temperatures: temperatures, userInput: userInput });
});

app.listen(3000, function () {
  console.log("Server started on port 3000!!");
});

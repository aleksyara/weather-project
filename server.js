require("dotenv").config();

const exppress = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = exppress();
app.use(bodyParser.urlencoded({ extended: true })); // use for getting data from req.body

const key = process.env.WEATHER_API_KEY;

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

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

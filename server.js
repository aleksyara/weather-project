const exppress = require("express");
const bodyParser = require("body-parser");

const app = exppress();

app.get("/", function (req, res) {
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=Irvine&appid=" +
    process.env.WEATHER_API_KEY;
  https.get(url, function (response) {
    //checking the response from API call
    console.log("this is reponse", response.statusCode);

    //getting weather data from API
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      console.log("weatherData", weatherData);

      const temparautre = weatherData.main.temp;
      console.log("this is the temparautre", temparautre);
      const description = weatherData.weather[0].description;
      console.log("description -->>>", description);
    });
  });

  res.sendFile(__dirname + "/index.html");
});

app.listen(3000, function () {
  console.log("Server started on port 3000!!");
});

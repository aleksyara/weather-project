// var createError = require("http-errors");
const exppress = require("express");
// const bodyParser = require("body-parser");
const https = require("https"); //build in module

const app = exppress();

app.get("/", function (req, res) {
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=Irvine&appid=cbe4290158a73f5343597226cb278bad&units=imperial";
  https.get(url, function (response) {
    //checking the response from API call
    console.log("this is reponse", response.statusCode);

    //getting weather data from API
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
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

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });

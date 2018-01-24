var express = require("express");
var app = express();
var request = require("request");
app.set("view engine", "ejs");

app.use(express.static(__dirname + '/public'));

app.get("/", function(req, res){
  res.render("search");
});

app.get("/results", function(req, res){
  var query = req.query.search;

  request(`http://www.omdbapi.com/?s=${query}&apikey=b20a7a6d`, function(error, response, body){
    if(!error && response.statusCode == 200){
      var movieResults = JSON.parse(body);
      res.render("results", {data: movieResults});
    }
  });
});

app.listen(3000, function(){
  console.log("Starting the server...");
})

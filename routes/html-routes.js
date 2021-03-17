// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

module.exports = function(app) {

  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "./public/index.html"));
  });

  app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname + "./public/exercise.html"));
  });

  app.get("/stats", (req, res) => {
    res.sendFile(path.join(_direname + "/public/stats.html"))
  });


};

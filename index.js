const express = require("express");
const port = 8000;
const path = require("path");
const app = express();

app.use(express.urlencoded());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/sign-in", function (req, res) {
  return res.render("signIn");
});

app.get("/sign-up", function (req, res) {
  return res.render("signUp");
});

app.listen(port, function (err) {
  if (err) {
    console.log("error in running the server", err);
  }
  console.log("My express server is running on the port:", port);
});

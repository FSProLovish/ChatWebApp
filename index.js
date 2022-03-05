const express = require("express");
const port = 8000;
const path = require("path");
const app = express();

const db = require("./config/mongoose");
const User = require("./models/user");

app.use(express.urlencoded());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/sign-in", function (req, res) {
  User.findOne(
    {
      email: req.body.email,
    },
    function (err, user) {
      if (err) {
        console.log("error in finding the user");
        return;
      }
    }
  );
});

app.post("/sign-up", function (req, res) {
  User.findOne(
    {
      email: req.body.email,
    },
    function (err, user) {
      if (err) {
        console.log("error in finding the user");
        return;
      }
      if (!user) {
        User.create(
          {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
          },
          function (err, newUser) {
            if (err) {
              console.log("error in creating a user");
              return;
            }
            return res.redirect("/sign-in");
          }
        );
      } else {
        res.redirect("back");
      }
    }
  );
});

app.listen(port, function (err) {
  if (err) {
    console.log("error in running the server", err);
  }
  console.log("My express server is running on the port:", port);
});

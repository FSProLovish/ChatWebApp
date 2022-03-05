const express = require("express");
const port = 8000;
const path = require("path");
const app = express();

const db = require("./config/mongoose");
const User = require("./models/user");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded());

app.use(express.static("assets"));

const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");

// Socket for Chat
const server = require("http").createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });

// To Start Chat Server
io.on("connection", (socket) => {
  socket.on("message", (data) => {
    socket.broadcast.emit("message", data);
  });
});

// Home page
app.get("/", function (req, res) {
  return res.render("home");
});

// Sign In page
app.get("/sign-in", function (req, res) {
  return res.render("signIn");
});

// Sign Up page
app.get("/sign-up", function (req, res) {
  return res.render("signUp");
});

// User's Sign In page
app.get("/users/sign-in", function (req, res) {
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

// User's Sign Up page
app.post("/users/sign-up", function (req, res) {
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

// Chatting Window
app.get("/users/chat", function (req, res) {
  return res.render("chat_box");
});

server.listen(port, function (err) {
  if (err) {
    console.log("error in running the server", err);
  }
  console.log("My express server is running on the port:", port);
});

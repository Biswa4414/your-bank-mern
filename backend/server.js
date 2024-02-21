const express = require("express");
require("dotenv").config();
const clc = require("cli-color");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const cors = require("cors");

//file-imports
const { cleanupAndValidate } = require("./utils/authUtils");
const userModel = require("./models/userModel");

//constants
const app = express();
const PORT = process.env.PORT || 8000;

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static("public"));

//DB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(clc.yellowBright("MongoDb connected successfully"));
  })
  .catch((err) => {
    console.log(clc.redBright(err));
  });

//api
app.get("/", (req, res) => {
  return res.send("Server is running");
});

app.get("/register", (req, res) => {
  return res.render("register");
});

app.post("/register", async (req, res) => {
  const { name, email, username, password } = req.body;
  //data validation

  try {
    await cleanupAndValidate({ name, email, username, password });
  } catch (error) {
    return res.send({
      status: 400,
      message: "Data error",
      error: error,
    });
  }

  //email and usernames are unique
  const userEmailsExist = await userModel.findOne({ email: email });

  if (userEmailsExist) {
    return res.send({
      status: 400,
      message: "Email already exist",
    });
  }

  const userUsernameExist = await userModel.findOne({ username });
  if (userUsernameExist) {
    return res.send({
      status: 400,
      message: "Username already exist",
    });
  }

  //hashing the password

  const hashedPassword = await bcrypt.hash(
    password,
    parseInt(process.env.SALT)
  );

  //store data in DB
  const userObj = new userModel({
    //schema key : value
    name: name,
    email: email,
    username: username,
    password: hashedPassword,
  });

  try {
    const userDb = await userObj.save();

    return res.send("Registration successful");
  } catch (error) {
    return res.send({
      status: 500,
      message: "Data base error",
      error: error,
    });
  }
});

app.get("/login", (req, res) => {
  return res.send(" Welcome to login page");
});

app.post("/login", async (req, res) => {
  const { loginId, password } = req.body;

  //find the user with loginId

  try {
    let userDb;
    if (validator.isEmail(loginId)) {
      userDb = await userModel.findOne({ email: loginId });
      if (!userDb) {
        return res.send({
          status: 400,
          message: "Email not found",
        });
      }
    } else {
      userDb = await userModel.findOne({ username: loginId });
      if (!userDb) {
        return res.send({
          status: 400,
          message: "Username not found",
        });
      }
    }

    //compare the password
    const isMatched = await bcrypt.compare(password, userDb.password);

    if (!isMatched) {
      return res.send({
        status: 400,
        message: "Password incorrect",
      });
    }

    return res.send("Login successfully");
  } catch (error) {
    console.log(error);
    return res.send({
      status: 500,
      message: "Database error",
      error: error,
    });
  }
});

app.listen(PORT, () => {
  console.log(clc.yellowBright.underline(`http://localhost:${PORT}`));
});

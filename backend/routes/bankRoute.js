const express = require("express");
const bcrypt = require("bcrypt");
const validator = require("validator");
const router = express.Router();

const { cleanupAndValidate } = require("./utils/authUtils");
const userModel = require("./models/userModel");

router.get("/register", (req, res) => {
  return res.send(" Welcome to Register Successfully");
});

router.post("/register", async (req, res) => {
  const { name, email, username, password } = req.body;
  //data validation

  try {
    await cleanupAndValidate({ name, email, username, password });
  } catch (error) {
    console.log(error);
    return res.send({
      status: 400,
      message: "error.message",
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

    return res.send("Register Succesfully");
  } catch (error) {
    console.log(error);
    return res.send({
      status: 500,
      message: "Data base error",
      error: error,
    });
  }
});

router.get("/login", (req, res) => {
  return res.render("login");
});

router.post("/login", async (req, res) => {
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
    return res.send({
      status: 200,
      message: "Login Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.send({
      status: 500,
      message: "Database error",
      error: error,
    });
  }
});

export default router;

const { UserModel } = require("../Model/UserModel.js");
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    bcrypt.hash(password, 5, async function (err, hash) {
      if (err) {
        console.log("error in bcrypt", err);
        res.status(401).send({ message: "Error while registering new user" });
      }
      let user = await new UserModel({ ...req.body, password: hash });
      user.save();
      res.status(200).send({ message: "user registered successfully" });
    });
  } catch (err) {
    res.status(401).send({ message: "Error while registering the user" });
  }
});

userRouter.post("/login", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await UserModel.findOne({ email: email });
    if (user) {
      bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
          var token = jwt.sign({ authorId: user._id }, "key");
          res
            .status(200)
            .send({ message: "User login successfull", token: token });
        }
      });
    } else {
      res.status(404).send({ message: "user not registered yet" });
    }
  } catch (err) {
    res.status(401).send({ message: "login not successfull" });
  }
});
module.exports = { userRouter };

const UserModel = require('../models/userModel');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Controller to handle requests
const userController = {
  
  // Get all users
  login: async (req, res) => {
    try {
      const user = await new Promise((resolve, reject) => {
        UserModel.findByUserName(req.body.username, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      })
      if (!user) {
        return res
          .status(404)
          .send({ message: "User not found", success: false });
      }
      //const isMatch = await bcrypt.compare(req.body.password, user.Password);
      const isMatch=(req.body.password===user.Password)
      if (!isMatch) {
        return res
          .status(400)
          .send({ message: "Invalid Email or Password", success: false });
      } 
      const token = jwt.sign({ username: user.User_Name }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      res.status(200).send({ message: "Login Success", success: true, token });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: `Error in login CTRL ${error.message}` });
    }
  },

  createNewUser: async (req,res)=>{
    try{
      const existingUser = await new Promise((resolve, reject) => {
        UserModel.findByUserName(req.body.username, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
      if (existingUser) {
        return res
          .status(401)
          .send({ message: "User Already Exist", success: false });
      }
      
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
     
      const newUser={
        userId:req.body.userId,
        username: req.body.username,
        password: req.body.password,
        employeeId:req.body.employeeId,
        authLevel:req.body.authLevel
      }
      UserModel.createNewUser(newUser,(err, result) => {
        if (err) {
          return res.status(500).send({ message: "Error creating user", error: err });
        }
        res.status(200).send({ message: "User created successfully", data: result });
      })
    }
    catch (error) {
      console.log(error);
      res.status(500).send({ message: `Error in signup CTRL ${error.message}` });
    }
  },
  authController:async (req,res)=>{
    try {
      const user = await new Promise((resolve, reject) => {
        UserModel.findByUserName(req.body.username, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
      user.Password = undefined;
      if (!user) {
        return res
          .status(404)
          .send({ message: "User not found", success: false });
      } else {
        res.status(200).send({
          success: true,
          data: user,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Auth error", success: false, error });
    }
  }

};

module.exports = userController;

const UserModel = require('../models/userModel');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authController = {
  
    // Get all users
    login: async (req, res) => {
      try {
        const resultData = await new Promise((resolve, reject) => {
          UserModel.findByUserName(req.body.username, (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          });
        });
    
        const firstKey = Object.keys(resultData)[0];
        const user = resultData[firstKey].data;

        if (!resultData[firstKey].success) {
          return res
            .status(404)
            .send({ message: "User not found", success: false });
        }
        const isMatch = await bcrypt.compare(req.body.password, user.Password);
        //const isMatch=(req.body.password===user.Password)
        if (!isMatch) {
          return res
            .status(400)
            .send({ message: "Invalid Email or Password", success: false });
        } 
        const token = jwt.sign({ username: user.User_Name,authlevel:user.Auth_Level }, process.env.JWT_SECRET, {
          expiresIn: "45m",
        });
        res.status(200).send({ message: "Login Success", success: true, token });
      } catch (error) {
        console.log(error);
        res.status(500).send({ message: `Error in login CTRL ${error.message}` });
      }
    },
  
    
    authenticate:async (req,res)=>{
      try {
        const resultData = await new Promise((resolve, reject) => {
          UserModel.findByUserName(req.user.username, (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          });
        });
        const firstKey = Object.keys(resultData)[0];
        const user = resultData[firstKey].data;
        user.password=undefined;
        
        if (!resultData[firstKey].success) {
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
  
  module.exports = authController;
  
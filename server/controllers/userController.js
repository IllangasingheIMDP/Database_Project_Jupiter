const UserModel = require('../models/userModel');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Controller to handle requests
const userController = {
  
 
 
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
        password: hashedPassword,
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
  }
 

};

module.exports = userController;

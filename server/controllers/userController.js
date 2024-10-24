const UserModel = require('../models/userModel');
const bcrypt = require("bcryptjs");

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
  },
  changePassword: async (req,res)=>{
    try{
      
      
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.userData.password, salt);
     
      const userData={
        userId:req.body.userData.userId,
       
        password: hashedPassword,
        
      }
      const result = await new Promise((resolve, reject) => {
        UserModel.updatePassword(userData, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
      const firstEntry=result[0];
    const resultKey = Object.keys(firstEntry)[0]; // Get the dynamic key
    const resultData = firstEntry[resultKey];
      
      if (resultData.success) {
        return res
          .status(200)
          .send({ message: "password changed successfully", success: true });
      }else{
        
        return res.status(500).send({message:resultData.data.message,success:false});
        
      }
    }
    catch (error) {
      console.log(error);
      res.status(500).send({ message: `Error in signup CTRL ${error.message}` });
    }
  }
 

};

module.exports = userController;

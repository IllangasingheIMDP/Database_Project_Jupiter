const UserModel = require('../models/userModel');
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const default_password = 'password123';

const hashString = async (string) => {
    try {
        const hash = await bcrypt.hash(string, saltRounds);
        return hash; // Return the hashed string
    } catch (err) {
        console.error('Error hashing string:', err);
        throw err; // Rethrow the error for further handling if needed
    }
};

// Controller to handle requests
const userController = {
  createNewUser: async (req, res) => {
    try {
      // Build the employee data
      const _Data = {
        username: req.body.username,
        authLevel: req.body.authLevel,
        password:await hashString(default_password),
        employee_nic: req.body.employee,
      };

      // Save data
      UserModel.createNewUser(_Data, (err, result) => {
        if (err) {
          return res.status(500).send({ data: 'Internal Server Error :' , error: err });
        }
        res.status(200).send({ data: result.data, success: result.success });
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({ data: `Internal Server Error : ${error.message}`, success: false});
    }
  },

  getUsers:async (req,res)=>{
    const data=await new Promise((resolve,reject)=>{
      UserModel.getUsers((err,result)=>{
            if(err){
                reject(err);
            }else{
                resolve(result);
            }
        });
    });
    if(!data.success){
        return res.status(400).send({data:data.data, success:data.success});
    }else{
        return res.status(200).send({success:true, data:data.data});
    }
  },

  deleteUser: async (req, res) => {
    try {
      const employeeData = {
        nic: req.params.nic,
      };

      // Save data
      UserModel.deleteUser(employeeData, (err, result) => {
        if (err) {
          return res.status(500).send({ data: 'Internal Server Error :' , error: err });
        }
        res.status(200).send({ data: result.data, success: result.success });
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({ data: `Internal Server Error : ${error.message}`, success: false});
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

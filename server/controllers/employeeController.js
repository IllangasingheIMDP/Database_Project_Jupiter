const employeeModel = require('../models/employeeModel');

const employeeController={
    getAllEmployee:async (req,res)=>{
        const employees=await new Promise((resolve,reject)=>{
            employeeModel.findAll((err,result)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            });
        });
        if(!employees){
            return res.status(404).send({message:"Database Error on employees",success:false});
        }else{
            return res.status(200).send({success:true,data:employees});
        }
    },
    getEmployeebyId: async (req, res) => {
        try {
          const employeeId = req.query.employeeId; // Get employeeId from query params
          
          if (!employeeId) {
            return res.status(400).send({ message: "employeeId is required", success: false });
          }
      
          const employee = await new Promise((resolve, reject) => {
            employeeModel.findByEmployeeId(employeeId, (err, result) => {
              if (err) {
                reject(err);
              } else {
                resolve(result);
              }
            });
          });
      
          if (!employee) {
            return res.status(404).send({ message: "Employee not found", success: false });
          } else {
            return res.status(200).send({ success: true, data: employee });
          }
        } catch (error) {
          console.log(error);
          return res.status(500).send({ message: "Server error", success: false, error: error.message });
        }
      },
      
    deletemployeebyId:async (req,res)=>{
        try{
            const employeeId=req.body.employeeId;
            const employee=await new Promise((resolve,reject)=>{
                employeeModel.findByEmployeeId(employeeId,(err,result)=>{
                    if(err){
                        reject(err);
                    }else{
                        resolve(result);
                    }
                });
            });
    
            if (!employee) {
                
                return res.status(404).send({ message: "Employee not found", success: false });
            }
            await new Promise((resolve,reject)=>{
                employeeModel.deleteEmployee(employeeId,(err,result)=>{
                    if(err){
                        reject(err);
                    }else{
                        resolve(result);
                    }
                });
            });
            return res.status(200).send({ message: "Employee deleted successfully", success: true });

    }catch (err) {
           
        console.error(err);
        return res.status(500).send({ message: "Server error", success: false, error: err.message });
    }
    },
    updateEmployeeData: async (req, res) => {
        try {
            
            const { employeeId, employeeData } = req.body; // employee data should be come from front end with column value pairs in json
    
           
            const employee=await new Promise((resolve,reject)=>{
                employeeModel.findByEmployeeId(employeeId,(err,result)=>{
                    if(err){
                        reject(err);
                    }else{
                        resolve(result);
                    }
                });
            });
    
            if (!employee) {
                
                return res.status(404).send({ message: "Employee not found", success: false });
            }
    
            
            await new Promise((resolve, reject) => {
                employeeModel.updateEmployee(employeeId, employeeData, (err, result) => { 
                    if (err) {
                        return reject(err); 
                    }
                    resolve(result); 
                });
            });
    
            
            return res.status(200).send({ message: "Employee updated successfully", success: true });
    
        } catch (err) {
           
            console.error(err);
            return res.status(500).send({ message: "Server error", success: false, error: err.message });
        }
    },
    


    createNewEmployee: async (req,res)=>{
        try{
          const existingEmployee = await new Promise((resolve, reject) => {
            employeeModel.findByEmployeeId(req.body.employeeId, (err, result) => {
              if (err) {
                reject(err);
              } else {
                resolve(result);
              }
            });
          });
          if (existingEmployee) {
            return res
              .status(401)
              .send({ message: "employee Already Exist", success: false });
          }
          
          
         
          const employeeData={
            employeeId:req.body.employeeId,
            nic:req.body.nic,
            initials:req.body.initials,
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            dateOfBirth:req.body.dateOfBirth,
            gender:req.body.gender,
            maritalStatus:req.body.maritalStatus,
            phone:req.body.phone,
            emailWork:req.body.emailWork,
            emailPrivate:req.body.emailPrivate,
            address:req.body.address,
            picId:req.body.picId,
            deptId:req.body.deptId,
            titleId:req.body.titleId,
            paygradeId:req.body.paygradeId,
            employmentStatId:req.body.employmentStatId,
            PFNumber:req.body.PFNumber,
          }
          employeeModel.createEmployee(employeeData,(err, result) => {
            if (err) {
              return res.status(500).send({ message: "Error creating employee", error: err });
            }
            res.status(200).send({ message: "employee created successfully", data: result });
          })
        }
        catch (error) {
          console.log(error);
          res.status(500).send({ message: `Error in signup CTRL ${error.message}` });
        }
      }
}
module.exports = employeeController;
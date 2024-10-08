const employment_StatusModel = require('../models/Employment_StatusModel');

const employmet_StatusController={
    getAllStatus:async (req,res)=>{
        const Status=await new Promise((resolve,reject)=>{
            employment_StatusModel.findAll((err,result)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            });
        });
        if(!Status){
            return res.status(404).send({message:"Database Error on Status”",success:false});
        }else{
            return res.status(200).send({success:true,data:Status});
        }
    },
    getEmployeeStatusbyId:async (req,res)=>{
        const Status=await new Promise((resolve,reject)=>{
            employment_StatusModel.findByEmployeeStatusById(req.query.Employment_Stat_ID,(err,result)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            });
        });
        if(!Status){
            return res.status(404).send({message:"Status not found",success:false});
        }else{
            return res.status(200).send({success:true,data:Status});
        }
    },
    deletemployeestatusbyId:async (req,res)=>{
        try{
            const employeeStatusId=req.body.Employment_Stat_ID;
            const Status=await new Promise((resolve,reject)=>{
                employment_StatusModel.findByEmployeeStatusById(employeeStatusId,(err,result)=>{
                    if(err){
                        reject(err);
                    }else{
                        resolve(result);
                    }
                });
            });
    
            if (!Status) {
                
                return res.status(404).send({ message: "Employee not found", success: false });
            }
            await new Promise((resolve,reject)=>{
                employment_StatusModel.deleteEmployeeStatus(employeeStatusId,(err,result)=>{
                    if(err){
                        reject(err);
                    }else{
                        resolve(result);
                    }
                });
            });
            return res.status(200).send({ message: "Employee Status deleted successfully", success: true });

    }catch (err) {
           
        console.error(err);
        return res.status(500).send({ message: "Server error", success: false, error: err.message });
    }
    },
    updateEmployeeStatus: async (req, res) => {
        try {
            
            const { employeeStatusId, employeeStatusData } = req.body; // employee data should be come from front end with column value pairs in json
    
           
            const Status=await new Promise((resolve,reject)=>{
                employment_StatusModel.findByEmployeeStatusById(employeeStatusId,(err,result)=>{
                    if(err){
                        reject(err);
                    }else{
                        resolve(result);
                    }
                });
            });
    
            if (!Status) {
                
                return res.status(404).send({ message: "Employee Status not found", success: false });
            }
    
            
            await new Promise((resolve, reject) => {
                employment_StatusModel.updateEmployeeStatus(employeeStatusId, employeeStatusData, (err, result) => { 
                    if (err) {
                        return reject(err); 
                    }
                    resolve(result); 
                });
            });
    
            
            return res.status(200).send({ message: "Employee Status updated successfully", success: true });
    
        } catch (err) {
           
            console.error(err);
            return res.status(500).send({ message: "Server error", success: false, error: err.message });
        }
    },
    


    createNewStatus: async (req,res)=>{
        try{
          const existingStatus = await new Promise((resolve, reject) => {
            employment_StatusModel.findByEmployeeStatusById(req.query.Employment_Stat_ID, (err, result) => {
              if (err) {
                reject(err);
              } else {
                resolve(result);
              }
            });
          });
          if (existingStatus) {
            return res
              .status(401)
              .send({ message: "Employee Status Already Exist", success: false });
          }
          
          
         
          const employeeStatusData={
            Employment_Stat_ID:req.body.Employment_Stat_ID,
            Employment_Stat_Type:req.body.Employment_Stat_Type,
          }
          employment_StatusModel.createEmployeeStatus(employeeStatusData,(err, result) => {
            if (err) {
              return res.status(500).send({ message: "Error creating employee Status", error: err });
            }
            res.status(200).send({ message: "employee status created successfully", data: result });
          })
        }
        catch (error) {
          console.log(error);
          res.status(500).send({ message: `Error in signup CTRL ${error.message}` });
        }
      }
}
module.exports = employmet_StatusController;
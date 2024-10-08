const employeePicModel = require('../models/EmployeePicModel');

const employeePicController={
    getAllEmployeePic:async (req,res)=>{
        const employeePics=await new Promise((resolve,reject)=>{
            employeePicModel.findAll((err,result)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            });
        });
        if(!employeePics){
            return res.status(404).send({message:"Database Error on employee Pics",success:false});
        }else{
            return res.status(200).send({success:true,data:employeePics});
        }
    },
    getEmployeePicbyId:async (req,res)=>{
        const employeePics=await new Promise((resolve,reject)=>{
            employeePicModel.findByEmployeePicId(req.query.Pic_ID,(err,result)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            });
        });
        if(!employeePics){
            return res.status(404).send({message:"Employee Pic not found",success:false});
        }else{
            return res.status(200).send({success:true,data:employeePics});
        }
    },
    deletemployeePicbyId:async (req,res)=>{
        try{
            const employeePicId=req.body.Pic_ID;
            const employeePics=await new Promise((resolve,reject)=>{
                employeePicModel.findByEmployeePicId(employeePicId,(err,result)=>{
                    if(err){
                        reject(err);
                    }else{
                        resolve(result);
                    }
                });
            });
    
            if (!employeePics) {
                
                return res.status(404).send({ message: "Employee Pics not found", success: false });
            }
            await new Promise((resolve,reject)=>{
                employeePicModel.deleteEmployeePic(employeePicId,(err,result)=>{
                    if(err){
                        reject(err);
                    }else{
                        resolve(result);
                    }
                });
            });
            return res.status(200).send({ message: "Employee Pic deleted successfully", success: true });

    }catch (err) {
           
        console.error(err);
        return res.status(500).send({ message: "Server error", success: false, error: err.message });
    }
    },
    updateEmployeePicData: async (req, res) => {
        try {
            
            const { Pic_ID, employeePicData } = req.body; 
    
           
            const employeePics=await new Promise((resolve,reject)=>{
                employeePicModel.findByEmployeePicId(Pic_ID,(err,result)=>{
                    if(err){
                        reject(err);
                    }else{
                        resolve(result);
                    }
                });
            });
    
            if (!employeePics) {
                
                return res.status(404).send({ message: "Employee Pic not found", success: false });
            }
    
            
            await new Promise((resolve, reject) => {
                employeePicModel.updateEmployeePic(Pic_ID, employeePicData, (err, result) => { 
                    if (err) {
                        return reject(err); 
                    }
                    resolve(result); 
                });
            });
    
            
            return res.status(200).send({ message: "Employee Pic updated successfully", success: true });
    
        } catch (err) {
           
            console.error(err);
            return res.status(500).send({ message: "Server error", success: false, error: err.message });
        }
    },
    


    createNewEmployeePic: async (req,res)=>{
        try{
          const existingEmployeePic = await new Promise((resolve, reject) => {
            employeePicModel.findByEmployeePicId(req.query.Pic_ID, (err, result) => {
              if (err) {
                reject(err);
              } else {
                resolve(result);
              }
            });
          });
          if (existingEmployeePic) {
            return res
              .status(401)
              .send({ message: "employee Pic Already Exist", success: false });
          }
          
          
         
          const employeePicData={
            Pic_ID:req.body.Pic_ID,
            Path:req.body.Path,
          }
          employeePicModel.createEmployeePic(employeePicData,(err, result) => {
            if (err) {
              return res.status(500).send({ message: "Error creating employee Pic", error: err });
            }
            res.status(200).send({ message: "employee Pic created successfully", data: result });
          })
        }
        catch (error) {
          console.log(error);
          res.status(500).send({ message: `Error in signup CTRL ${error.message}` });
        }
      }
}
module.exports = employeePicController;
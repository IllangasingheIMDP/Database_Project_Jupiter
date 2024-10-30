const PayGradeModel = require('../models/PayGradeModel');

const PayGradeController={
    getAllDetails:async (req,res)=>{
        const grades=await new Promise((resolve,reject)=>{
            PayGradeModel.findAll((err,result)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            });
        });
        const firstEntry = grades[0];
      const resultKey = Object.keys(firstEntry)[0]; // Get the dynamic key
      const resultData = firstEntry[resultKey];
     
        
        if(!resultData.success){
            return res.status(404).send({message:"Database Error on pay grade levels",success:false});
        }else{
            console.log(resultData);
            return res.status(200).send({success:true,data:resultData.data});
        }
    },
    getPayGradeById:async (req,res)=>{
        const grades=await new Promise((resolve,reject)=>{
            PayGradeModel.findBypaygradeid(req.query.PayGrade_ID,(err,result)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            });
        });
        if(!grades){
            return res.status(404).send({message:"Pay grade level not found",success:false});
        }else{
            return res.status(200).send({success:true,data:grades});
        }
    },
    deletePayGradebyId:async (req,res)=>{
        try{
            const PayGradeId=req.body.PayGrade_ID;
            const grades=await new Promise((resolve,reject)=>{
                PayGradeModel.findBypaygradeid(PayGradeId,(err,result)=>{
                    if(err){
                        reject(err);
                    }else{
                        resolve(result);
                    }
                });
            });
    
            if (!grades) {
                
                return res.status(404).send({ message: "Pay Grade not found", success: false });
            }
            await new Promise((resolve,reject)=>{
                PayGradeModel.deleteGrade(PayGradeId,(err,result)=>{
                    if(err){
                        reject(err);
                    }else{
                        resolve(result);
                    }
                });
            });
            return res.status(200).send({ message: "Pay Grade level deleted successfully", success: true });

    }catch (err) {
           
        console.error(err);
        return res.status(500).send({ message: "Server error", success: false, error: err.message });
    }
    },
    updatePayGrade: async (req, res) => {
        try {
            
            const { PayGradeId, PayGradeData } = req.body; // Paygrade data should be come from front end with column value pairs in json
    
           
            const grades=await new Promise((resolve,reject)=>{
                PayGradeModel.findBypaygradeid(PayGradeId,(err,result)=>{
                    if(err){
                        reject(err);
                    }else{
                        resolve(result);
                    }
                });
            });
            
            if (!grades) {
                
                return res.status(404).send({ message: "Pay Grade not found", success: false });
            }
    
            
            await new Promise((resolve, reject) => {
                PayGradeModel.updateGrade(PayGradeId, PayGradeData, (err, result) => { 
                    if (err) {
                        return reject(err); 
                    }
                    resolve(result); 
                });
            });
    
            
            return res.status(200).send({ message: "Pay Grade level updated successfully", success: true });
    
        } catch (err) {
           
            console.error(err);
            return res.status(500).send({ message: "Server error", success: false, error: err.message });
        }
    },
    


    createNewPayGrade: async (req,res)=>{
        try{
          const existingGrade = await new Promise((resolve, reject) => {
            PayGradeModel.findBypaygradeid(req.query.PayGrade_ID, (err, result) => {
              if (err) {
                reject(err);
              } else {
                resolve(result);
              }
            });
          });
          if (existingGrade) {
            return res
              .status(401)
              .send({ message: "Pay grade Already Exist", success: false });
          }
          
          
         
          const PayGradeData={
            PayGrade_ID:req.body.PayGrade_ID,
            Pay_Grade_Level:req.body.Pay_Grade_Level,
            Annual:req.body.Annual,
            Casual:req.body.Casual,
            Maternity:req.body.Maternity,
            No_Pay:req.body.No_Pay,
          }
          PayGradeModel.createGrade(PayGradeData,(err, result) => {
            if (err) {
              return res.status(500).send({ message: "Error creating pay grade", error: err });
            }
            res.status(200).send({ message: "paygrade created successfully", data: result });
          })
        }
        catch (error) {
          console.log(error);
          res.status(500).send({ message: `Error in signup CTRL ${error.message}` });
        }
      },
      updateLeaveData:async (req, res) => {
        try {
            
            const { PayGradeId, PayGradeData } = req.body; // Paygrade data should be come from front end with column value pairs in json
            
           
            const result=await new Promise((resolve,reject)=>{
                PayGradeModel.updatedata(PayGradeId,PayGradeData,(err,result)=>{
                    if(err){
                        reject(err);
                    }else{
                        resolve(result);
                    }
                });
            });
            const firstEntry = result[0];
            const resultKey = Object.keys(firstEntry)[0]; // Get the dynamic key
            const resultData = firstEntry[resultKey];
            
            if (!resultData.success) {
                
                return res.status(404).send({ message: "Pay Grade not found", success: false });
            }else{
                return res.status(200).send({message:"Leave data updated succesfully",success:true})
            }
    
            
            
    
        } catch (err) {
           
            console.error(err);
            return res.status(500).send({ message: "Server error", success: false, error: err.message });
        }
    }
}
module.exports = PayGradeController;
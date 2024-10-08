const JobTitleModel = require('../models/JobTitleModel');

const JobTitleController={
    getAllJobTitles:async (req,res)=>{
        const jobtitles=await new Promise((resolve,reject)=>{
            JobTitleModel.findAll((err,result)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            });
        });
        if(!jobtitles){
            return res.status(404).send({message:"Database Error on job titles",success:false});
        }else{
            return res.status(200).send({success:true,data:jobtitles});
        }
    },
    getJobTitlebyId:async (req,res)=>{
        const jobtitles=await new Promise((resolve,reject)=>{
            JobTitleModel.findByJobTitleId(req.query.Title_ID,(err,result)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            });
        });
        if(!jobtitles){
            return res.status(404).send({message:"Job Title not found",success:false});
        }else{
            return res.status(200).send({success:true,data:jobtitles});
        }
    },
    deleteJobTitlebyId:async (req,res)=>{
        try{
            const JobTitleId=req.body.Title_ID;
            const jobtitles=await new Promise((resolve,reject)=>{
                JobTitleModel.findByJobTitleId(JobTitleId,(err,result)=>{
                    if(err){
                        reject(err);
                    }else{
                        resolve(result);
                    }
                });
            });
    
            if (!jobtitles) {
                
                return res.status(404).send({ message: "Job Title not found", success: false });
            }
            await new Promise((resolve,reject)=>{
                JobTitleModel.deleteJobTitle(JobTitleId,(err,result)=>{
                    if(err){
                        reject(err);
                    }else{
                        resolve(result);
                    }
                });
            });
            return res.status(200).send({ message: "Job Title deleted successfully", success: true });

    }catch (err) {
           
        console.error(err);
        return res.status(500).send({ message: "Server error", success: false, error: err.message });
    }
    },
    updateJobTitleData: async (req, res) => {
        try {
            
            const { Title_ID, TitleData } = req.body; // data should be come from front end with column value pairs in json
    
           
            const jobtitles=await new Promise((resolve,reject)=>{
                JobTitleModel.findByJobTitleId(Title_ID,(err,result)=>{
                    if(err){
                        reject(err);
                    }else{
                        resolve(result);
                    }
                });
            });
    
            if (!jobtitles) {
                
                return res.status(404).send({ message: "Job Title not found", success: false });
            }
    
            
            await new Promise((resolve, reject) => {
                JobTitleModel.updateJobTitle(Title_ID, TitleData, (err, result) => { 
                    if (err) {
                        return reject(err); 
                    }
                    resolve(result); 
                });
            });
    
            
            return res.status(200).send({ message: "Job Title updated successfully", success: true });
    
        } catch (err) {
           
            console.error(err);
            return res.status(500).send({ message: "Server error", success: false, error: err.message });
        }
    },
    


    createNewJobTitle: async (req,res)=>{
        try{
          const existingJobTitle = await new Promise((resolve, reject) => {
            JobTitleModel.findByJobTitleId(req.query.Title_ID, (err, result) => {
              if (err) {
                reject(err);
              } else {
                resolve(result);
              }
            });
          });
          if (existingJobTitle) {
            return res
              .status(401)
              .send({ message: "Job Title Already Exist", success: false });
          }
          
          
         
          const JobTitleData={
            Title_ID:req.body.Title_ID,
            Title:req.body.Title,
          }
          JobTitleModel.createJobTitle(JobTitleData,(err, result) => {
            if (err) {
              return res.status(500).send({ message: "Error creating a Job Title", error: err });
            }
            res.status(200).send({ message: "Job Title created successfully", data: result });
          })
        }
        catch (error) {
          console.log(error);
          res.status(500).send({ message: `Error in signup CTRL ${error.message}` });
        }
      }
}
module.exports = JobTitleController;
const generateReportModel = require('../models/generateReportModel');

const generateReportController={
    get_department_dropdown_options:async (req,res)=>{
      const data=await new Promise((resolve,reject)=>{
          generateReportModel.get_department_dropdown_options((err,result)=>{
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
    get_employee_detail_by_department: async (req, res) => {
        const { department, status, title } = req.body;  // Extract parameters from the request body
        try {
          const data = await new Promise((resolve, reject) => {
            generateReportModel.get_employee_detail_by_department(department, status, title, (err, result) => {
              if (err) {
                reject(err);
              } else {
                resolve(result);
              }
            });
          });
    
          if (!data.success) {
            return res.status(400).json({ success: false, message: "No relevant data found." });
          } else {
            return res.status(200).json({ success: true, data: data.data });
          }
        } catch (error) {
          console.error('Error fetching employee details:', error);
          return res.status(500).json({ success: false, message: "Error fetching employee details." });
        }
    },
}

module.exports = generateReportController;
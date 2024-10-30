const employeeModel = require('../models/employeeModel');

const employeeController={
    get_dropdown_options:async (req,res)=>{
      const data=await new Promise((resolve,reject)=>{
          employeeModel.get_dropdown_options((err,result)=>{
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

    get_employees:async (req,res)=>{
      const data=await new Promise((resolve,reject)=>{
          employeeModel.get_get_employees((err,result)=>{
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

    get_available_custom_fields:async (req,res)=>{
      const data=await new Promise((resolve,reject)=>{
          employeeModel.get_available_custom_fields((err,result)=>{
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

    createNewCustomField: async (req, res) => {
      try {
        // Build the employee data
        const Data = {
          name: req.body.name,
        };
    
        // Save data
        employeeModel.createNewCustomField(Data, (err, result) => {
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

    deleteCustomField: async (req, res) => {
      try {
        // Build the employee data
        const Data = {
          name: req.body.name,
        };
    
        // Save data
        employeeModel.deleteCustomField(Data, (err, result) => {
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

    createNewEmployee: async (req, res) => {
      try {
        console.log("Request body received:", req.body); // Log incoming data
    
        // Parse dependents and emergency contacts if they are sent as JSON strings
        const dependents = req.body.dependents ? JSON.parse(req.body.dependents) : [];
        const emergencyContacts = req.body.emergency_contacts ? JSON.parse(req.body.emergency_contacts) : [];
        const custom_fields = req.body.custom_values ? JSON.parse(req.body.custom_values) : [];


        // Build the employee data
        const employeeData = {
          nic: req.body.NIC,
          initials: req.body.initials,
          firstName: req.body.first_Name,
          lastName: req.body.last_Name,
          dateOfBirth: req.body.date_of_birth,
          gender: req.body.gender,
          maritalStatus: req.body.marital_status,
          phone: req.body.phone,
          emailWork: req.body.email_work,
          emailPrivate: req.body.email_private,
          address: req.body.address,
          picturePath:  req.body.picture,
          dept: req.body.department
            ? req.body.department.split(" : ")[0]
            : "None",
          title: req.body.title,
          paygrade: req.body.paygrade,
          employmentStat: req.body.employment_stat,
          PFNumber: req.body.pf_number,
          supervisor: req.body.supervisor
            ? req.body.supervisor.split(" : ")[1].slice(0, -2)
            : "None",
          dependent_info: JSON.stringify(dependents),
          emergency_contacts_info: JSON.stringify(emergencyContacts),
          custom_fields: JSON.stringify(custom_fields),
        };
        console.log(req.body.picture);

        // Save employee data
        employeeModel.createEmployee(employeeData, (err, result) => {
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
    
    deleteEmployee: async (req, res) => {
      try {
        const employeeData = {
          nic: req.params.nic,
        };

        // Save employee data
        employeeModel.deleteEmployee(employeeData, (err, result) => {
          if (err) {
            return res.status(500).send({ data: 'Internal Server Error :' , error: err });
          }
          res.status(200).send({ data: result.data, success: result.success });
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({ data: `Internal Server Error : ${error.message}`, success: false});
      }
    }
}
module.exports = employeeController;
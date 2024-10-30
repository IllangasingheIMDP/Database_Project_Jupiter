const generateReportModel = require('../models/generateReportModel');

const generateReportController={
    get_dropdown_options:async (req,res)=>{
      const data=await new Promise((resolve,reject)=>{
          generateReportModel.get_dropdown_options((err,result)=>{
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
    get_employee_details: async (req, res) => {
      const { nic, name } = req.body;  // Extract parameters from the request body
      try {
        const data = await new Promise((resolve, reject) => {
          generateReportModel.get_employee_details(nic, name, (err, result) => {
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
    get_branch_details: async (req, res) => {
      const { organization } = req.body;  // Extract parameters from the request body
      try {
        const data = await new Promise((resolve, reject) => {
          generateReportModel.get_branch_details(organization, (err, result) => {
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
    get_employee_detail_by_branch: async (req, res) => {
      const { branch, status, title } = req.body;  // Extract parameters from the request body
      try {
        const data = await new Promise((resolve, reject) => {
          generateReportModel.get_employee_detail_by_branch(branch, status, title, (err, result) => {
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
  get_employee_detail_by_pay_grade: async (req, res) => {
    const { department, branch, pay_grade } = req.body;  // Extract parameters from the request body
    try {
      const data = await new Promise((resolve, reject) => {
        generateReportModel.get_employee_detail_by_pay_grade(department, branch, pay_grade, (err, result) => {
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
  get_employee_detail_by_title: async (req, res) => {
    const { department, branch, title } = req.body;  // Extract parameters from the request body
    try {
      const data = await new Promise((resolve, reject) => {
        generateReportModel.get_employee_detail_by_title(department, branch, title, (err, result) => {
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
  get_leave_request_details: async (req, res) => {
    const { department, branch, fromDate, toDate } = req.body;  
    // Extract parameters from the request body
    try {
      const data = await new Promise((resolve, reject) => {
        generateReportModel.get_leave_request_details(department, branch, fromDate, toDate, (err, result) => {
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
  get_annual_leave_balance: async (req, res) => {
    const { department, branch } = req.body;  // Extract parameters from the request body
    try {
      const data = await new Promise((resolve, reject) => {
        generateReportModel.get_annual_leave_balance(department, branch, (err, result) => {
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
  get_pending_leave_request_details: async (req, res) => {
    const { department, branch, fromDate, toDate } = req.body;  
    // Extract parameters from the request body
    try {
      const data = await new Promise((resolve, reject) => {
        generateReportModel.get_pending_leave_request_details(department, branch, fromDate, toDate, (err, result) => {
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
  get_rejected_leave_request_details: async (req, res) => {
    const { department, branch, fromDate, toDate } = req.body;  
    // Extract parameters from the request body
    try {
      const data = await new Promise((resolve, reject) => {
        generateReportModel.get_rejected_leave_request_details(department, branch, fromDate, toDate, (err, result) => {
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
  get_custom_field: async (req, res) => {
    const { custom_field, department, branch} = req.body;  // Extract parameters from the request body
    try {
      const data = await new Promise((resolve, reject) => {
        generateReportModel.get_custom_field(custom_field, department, branch, (err, result) => {
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
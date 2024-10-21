const leaveRequestModel = require('../models/leaveRequestModel');

const LeaveRequestController={
    
    createNewLeaveRequest: async (req, res) => {
      try {
        const Data = {
            User_ID: req.body.User_ID,
            Leave_Type: req.body.Leave_Type,
            Start_Date: req.body.Start_Date,
            End_Date: req.body.End_Date,
            Reason: req.body.Reason,
            Status: req.body.Status,
        };
    
        // Save data
        leaveRequestModel.createNewLeaveRequest(Data, (err, result) => {
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



    getLeaveRequestbyId: async (req, res) => {
        try {
          const User_ID = req.query.User_ID; // Get user ID from query params
          
          if (!User_ID) {
            return res.status(400).send({ message: "User ID is required", success: false });
          }
      
          const leave_request = await new Promise((resolve, reject) => {
            leaveRequestModel.findByUserId(User_ID, (err, result) => {
              if (err) {
                reject(err);
              } else {
                resolve(result);
              }
            });
          });
      
          if (!leave_request) {
            return res.status(404).send({ message: "You have no leave requests yet", success: false });
          } else {
            return res.status(200).send({ success: true, data: leave_request });
          }
        } catch (error) {
          console.log(error);
          return res.status(500).send({ message: "Server error", success: false, error: error.message });
        }
      },

    

    /*
    createNewEmployee: async (req, res) => {
      try {
        // Process uploaded image
        let picturePath = null;
        if (req.file) {
          picturePath = req.file.filename; // Save the filename (unique 36-character name)
        }
    
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
          picturePath: picturePath,
          dept: req.body.department,
          title: req.body.title,
          paygrade: req.body.paygrade,
          employmentStat: req.body.employment_stat,
          PFNumber: req.body.pf_number,
          supervisor: req.body.supervisor.split(" : ")[1],
          dependent_info: JSON.stringify(dependents),
          emergency_contacts_info: JSON.stringify(emergencyContacts),
          custom_fields: JSON.stringify(custom_fields),
        };

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
    } */
}
module.exports = LeaveRequestController;
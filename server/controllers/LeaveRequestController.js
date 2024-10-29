const leaveRequestModel = require('../models/leaveRequestModel');

const LeaveRequestController={
    
    createNewLeaveRequest: async (req, res) => {
      try {
        console.log("here  1");

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




      setRequestStatus: async (req, res) => {
        try {
          const RequestID = req.body.Req_ID;
          const Status = req.body.Status;
      
          if (!RequestID || !Status) {
            return res.status(400).send({ message: "Request ID and Status are required", success: false });
          }
      
          const updatedStatus = await new Promise((resolve, reject) => {
            leaveRequestModel.editRequestStatus(RequestID, Status, (err, result) => {
              if (err) {
                reject(err);
              } else {
                resolve(result);
              }
            });
          });
      
          if (!updatedStatus) {
            return res.status(404).send({ message: "Failed to update status", success: false });
          } else {
            return res.status(200).send({ success: true, data: updatedStatus });
          }
        } catch (error) {
          console.log(error);
          return res.status(500).send({ message: "Server error", success: false, error: error.message });
        }
      },



    


      getallemployeeleaves: async (req, res) => {
        try {
            const NIC = req.query.NIC; // Get NIC from query params
            const Name = req.query.Name;
            
            // Check if either NIC or Name is provided
            if (!NIC && !Name) {
                return res.status(400).send({ message: "NIC or Name is required", success: false });
            }
    
            // Call the leaveRequestModel.getallleaves function with the correct parameters
            const leave_request = await new Promise((resolve, reject) => {
                leaveRequestModel.getallleaves(NIC, Name, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
    
            // Check if leave_request data is found
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
    


      
    
}
module.exports = LeaveRequestController;
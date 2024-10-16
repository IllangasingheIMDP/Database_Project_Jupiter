const supervisorModel = require('../models/supervisorModel');

const supervisorController = {
  
    // Get all users
    getTeamInfo: async (req, res) => {
      try {
        const employeeId = req.query.employeeId; // Get employeeId from query params
          
          if (!employeeId) {
            return res.status(400).send({ message: "employeeId is required", success: false });
          }
        const TeamInfo = await new Promise((resolve, reject) => {
            supervisorModel.getTeam(employeeId, (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          });
        });
       
        
    const firstEntry=TeamInfo[0];
    const resultKey = Object.keys(firstEntry)[0]; // Get the dynamic key
    const resultData = firstEntry[resultKey];
        if (!resultData.success) {
          return res
            .status(200)
            .send({ message: "employee not found", success: false });
        }else{
            
            return res.status(200).send({data:resultData.data,success:true});
        }

        
      } catch (error) {
        console.log(error);
        res.status(500).send({ message: `Error in supervisor CTRL ${error.message}` });
      }
    }
  
  };
  
  module.exports = supervisorController;
  
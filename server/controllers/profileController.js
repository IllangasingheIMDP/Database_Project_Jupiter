const profileModel = require('../models/profileModel');

const profileController = {
  
    // Get all users
    getProfileInfo: async (req, res) => {
      try {
        const employeeId = req.query.employeeId; // Get employeeId from query params
          
          if (!employeeId) {
            return res.status(400).send({ message: "employeeId is required", success: false });
          }
        const profileInfo = await new Promise((resolve, reject) => {
            profileModel.getAll(employeeId, (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          });
        });
       
        const firstEntry = profileInfo[0];

    // Since the key is dynamic (it contains the function name), access it dynamically
    const resultKey = Object.keys(firstEntry)[0]; // Get the dynamic key
    const resultData = firstEntry[resultKey];
        if (!resultData.success) {
          return res
            .status(404)
            .send({ message: "employee not found", success: false });
        }else{
            
            return res.status(200).send({data:resultData.data,success:true});
        }

        
      } catch (error) {
        console.log(error);
        res.status(500).send({ message: `Error in profile CTRL ${error.message}` });
      }
    }
  
  };
  
  module.exports = profileController;
  
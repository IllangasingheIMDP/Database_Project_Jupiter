const notificationModel = require('../models/notificationModel');

const notificationController = {
  
    // Get all users
    getNotifications: async (req, res) => {
      try {
        const userId = req.query.userId; // Get employeeId from query params
          
          if (!userId) {
            return res.status(400).send({ message: "userID is required", success: false });
          }
        const notifications = await new Promise((resolve, reject) => {
            notificationModel.getNotificationsbyUserId(userId, (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          });
        });

        const firstEntry = notifications[0];

    // Since the key is dynamic (it contains the function name), access it dynamically
    const resultKey = Object.keys(firstEntry)[0]; // Get the dynamic key
    const resultData = firstEntry[resultKey];
   
        
        if (!resultData.success) {
          return res
            .status(200)
            .send({ message: resultData.data, success: false });
        }else{
            
            return res.status(200).send({data:resultData.data,success:true});
        }

        
      } catch (error) {
        console.log(error);
        res.status(500).send({ message: `Error in notification CTRL ${error.message}` });
      }
    },
    UpdateNotificationStats: async (req, res) => {
        try {
          const userId = req.body.userId; // Get employeeId from query params
          const datetime=req.body.datetime;
          
            if (!userId || !datetime) {
              return res.status(400).send({ message: "parameters is required", success: false });
            }
          const result = await new Promise((resolve, reject) => {
              notificationModel.SetNotificationStats(userId,datetime, (err, result) => {
              if (err) {
                reject(err);
              } else {
                resolve(result);
              }
            });
          });
  
          const firstEntry = result[0];
  
      // Since the key is dynamic (it contains the function name), access it dynamically
      const resultKey = Object.keys(firstEntry)[0]; // Get the dynamic key
      const resultData = firstEntry[resultKey];
     
          
          if (!resultData.success) {
            return res
              .status(404)
              .send({ message: resultData.data, success: false });
          }else{
              
              return res.status(200).send({success:true});
          }
  
          
        } catch (error) {
          console.log(error);
          res.status(500).send({ message: `Error in notification CTRL ${error.message}` });
        }
      }
  
  };
  
  module.exports = notificationController;
  
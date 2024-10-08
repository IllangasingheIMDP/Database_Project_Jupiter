const dependantInfoModel = require('../models/dependantInfoModel');

const dependantInfoController = {
  
    // Get all users
    addDependant: async (req, res) => {
      try {
        const result = await new Promise((resolve, reject) => {
            dependantInfoModel.addDependant(req.body.dependantData, (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          });
        })
        if(result.success){
            return res.status(200).send({message:"Successfull"})
        }else{
            return res.status(500).send({message:result.data})
        }
      } catch (error) {
        console.log(error);
        res.status(500).send({ message: `Error in login CTRL ${error.message}` });
      }
    },
  
   
  
  };
  
  module.exports = dependantInfoController;
  
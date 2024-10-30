const adminModel = require('../models/adminModel');

const adminController={
    get_tables:async (req,res)=>{
      const data=await new Promise((resolve,reject)=>{
        adminModel.get_tables((err,result)=>{
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

    // Fetch table data by table name
    get_table_data: async (req, res) => {
        const { tableName } = req.params;

        const data = await new Promise((resolve, reject) => {
        adminModel.get_table_data(tableName, (err, result) => {
            if (err) {
            reject(err);
            } else {
            resolve(result);
            }
        });
        });

        if (!data) {
        return res.status(400).send({ success: false, data: 'Failed to fetch table data' });
        } else {
        return res.status(200).send({ success: true, data });
        }
    },

    // Update a specific table row
    update_table_row: async (req, res) => {
        try {
            const { tableName } = req.params;
          const Data = {
            tableName: tableName,
            json: JSON.stringify(req.body)

          };

          adminModel.update_table_row(Data, (err, result) => {
            if (err) {
              return res.status(500).send({ success: false, data: `Internal Server Error: ${err.sqlMessage}` });
            }
            res.status(200).send({ data: result.data, success: result.success });
          });
        } catch (error) {

          res.status(500).send({ data: `Internal Server Error : ${error.sqlMessage}`, success: false});
        }
      },

    // Delete a specific table row
    delete_table_row: async (req, res) => {
      try {
          const { tableName } = req.params;
        const Data = {
          tableName: tableName,
          json: JSON.stringify(req.body)

        };

        adminModel.delete_table_row(Data, (err, result) => {
          if (err) {
            return res.status(500).send({ success: false, data: `Internal Server Error: ${err.sqlMessage}` });
          }
          res.status(200).send({ data: result.data, success: result.success });
        });
      } catch (error) {

        res.status(500).send({ data: `Internal Server Error : ${error.sqlMessage}`, success: false});
      }
    },

    // ADD a specific table row
    add_table_row: async (req, res) => {
      try {
          const { tableName } = req.params;
        const Data = {
          tableName: tableName,
          json: JSON.stringify(req.body)

        };

        adminModel.add_table_row(Data, (err, result) => {
          if (err) {
            return res.status(500).send({ success: false, data: `Internal Server Error: ${err.sqlMessage}` });
          }
          res.status(200).send({ data: result.data, success: result.success });
        });
      } catch (error) {

        res.status(500).send({ data: `Internal Server Error : ${error.sqlMessage}`, success: false});
      }
    }
}
module.exports = adminController;
const EmergencyContactModel = require('../models/EmergencyContactModel');

const EmergencyContactController={
    getAllContact:async (req,res)=>{
        const Contacts=await new Promise((resolve,reject)=>{
            EmergencyContactModel.findAll((err,result)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            });
        });
        if(!Contacts){
            return res.status(404).send({message:"Database Error on contacts",success:false});
        }else{
            return res.status(200).send({success:true,data:Contacts});
        }
    },
    getContactbyId:async (req,res)=>{
        const Contacts=await new Promise((resolve,reject)=>{
            EmergencyContactModel.findByEmergencyContactId(req.query.Contact_ID,(err,result)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            });
        });
        if(!Contacts){
            return res.status(404).send({message:"Contact not found",success:false});
        }else{
            return res.status(200).send({success:true,data:Contacts});
        }
    },
    deleteContactbyId:async (req,res)=>{
        try{
            const ContactId=req.body.Contact_ID;
            const Contacts=await new Promise((resolve,reject)=>{
                EmergencyContactModel.findByEmergencyContactId(ContactId,(err,result)=>{
                    if(err){
                        reject(err);
                    }else{
                        resolve(result);
                    }
                });
            });
    
            if (!Contacts) {
                
                return res.status(404).send({ message: "Contact not found", success: false });
            }
            await new Promise((resolve,reject)=>{
                EmergencyContactModel.deleteEmergencyContact(ContactId,(err,result)=>{
                    if(err){
                        reject(err);
                    }else{
                        resolve(result);
                    }
                });
            });
            return res.status(200).send({ message: "Contact deleted successfully", success: true });

    }catch (err) {
           
        console.error(err);
        return res.status(500).send({ message: "Server error", success: false, error: err.message });
    }
    },
    updateContactData: async (req, res) => {
        try {
            
            const { Contact_ID, ContactData } = req.body; // Contact data should be come from front end with column value pairs in json
    
           
            const Contacts=await new Promise((resolve,reject)=>{
                EmergencyContactModel.findByEmergencyContactId(Contact_ID,(err,result)=>{
                    if(err){
                        reject(err);
                    }else{
                        resolve(result);
                    }
                });
            });
    
            if (!Contacts) {
                
                return res.status(404).send({ message: "Contact not found", success: false });
            }
    
            
            await new Promise((resolve, reject) => {
                EmergencyContactModel.updateEmergencyConatct(Contact_ID, ContactData, (err, result) => { 
                    if (err) {
                        return reject(err); 
                    }
                    resolve(result); 
                });
            });
    
            
            return res.status(200).send({ message: "Contact updated successfully", success: true });
    
        } catch (err) {
           
            console.error(err);
            return res.status(500).send({ message: "Server error", success: false, error: err.message });
        }
    },
    


    createNewContact: async (req,res)=>{
        try{
          const existingContact = await new Promise((resolve, reject) => {
            EmergencyContactModel.findByEmergencyContactId(req.query.Contact_ID, (err, result) => {
              if (err) {
                reject(err);
              } else {
                resolve(result);
              }
            });
          });
          if (existingContact) {
            return res
              .status(401)
              .send({ message: "Contact Already Exist", success: false });
          }
          
          
         
          const ContactData={
            Contact_ID:req.body.Contact_ID,
            Employee_ID:req.body.Employee_ID,
            First_Name:req.body.First_Name,
            Last_Name:req.body.Last_Name,
            Phone:req.body.Phone,
            Email:req.body.Email,
            Address:req.body.Address,
            Relationship:req.body.Relationship,
          }
          EmergencyContactModel.createEmergencyContact(ContactData,(err, result) => {
            if (err) {
              return res.status(500).send({ message: "Error creating Contact", error: err });
            }
            res.status(200).send({ message: "Contact created successfully", data: result });
          })
        }
        catch (error) {
          console.log(error);
          res.status(500).send({ message: `Error in signup CTRL ${error.message}` });
        }
      }
}
module.exports = EmergencyContactController;
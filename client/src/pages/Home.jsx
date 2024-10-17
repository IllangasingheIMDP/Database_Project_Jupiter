import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from "react-redux";
import axios from 'axios';
import Layout from '../components/Layout'
import favepic from '../../public/fav.png'
import popupIcon from '../../public/new-tab.png'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import { hideLoading, showLoading } from "../redux/features/alertSlice";
const Home = () => {
  const user = useSelector((state) => state.user.user);
  const [userData,setUserData]=useState([])
  const [picData,setPicData]=useState([])
  const [teamData,setTeamData]=useState([]);
  const [customFields,setCustomFields]=useState([]);
  const [supervisorData,setSuperVisorData]=useState([])
  const [dependantData,setDependantData]=useState([])
  const [emergencyData,setEmergencyData]=useState([])
  
  const [showTeamModal, setShowTeamModal] = useState(false); 
  const [teamView,setTeamView]=useState(false);
  const [emergencyView,setEmergencyView]=useState(false)
  const [dependantView,setDependantView]=useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const getUserData = async () => {
      
        // Only fetch data if Employee_ID is available
        try {
          dispatch(showLoading());
          const res = await axios.get(
            `http://localhost:5555/users/profile?employeeId=${user.Employee_ID}`,
            
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            }
          );
          dispatch(hideLoading());
          
          if (res.data.success) {
              const format=(data)=>{
                const dataArray = data;

                // Create a new object to hold the formatted key-value pairs
               const formattedData = {};

                 // Loop through the array and add each key-value pair to formattedUserData
               dataArray.forEach((entry) => {
               const [key, value] = Object.entries(entry)[0]; // Extract the key and value from each object
               formattedData[key] = value; // Assign to the formatted object
                 });
              return formattedData;
              }

              const arraydecoder=(data)=>{
                const dataArray = data;

                // Create a new object to hold the formatted key-value pairs
               const formattedData = [];

                 // Loop through the array and add each key-value pair to formattedUserData
               dataArray.forEach((entry) => {
                // Extract the key and value from each object
               formattedData.push(entry) // Assign to the formatted object
                 });
                 
              return formattedData;

              }



            
            
            setUserData(format(res.data.data.Employee_Data));
            setPicData(res.data.data.Pic_Data.pic_path);
            
           
            setDependantData(arraydecoder(res.data.data.Dependant_Data))
            setEmergencyData(arraydecoder(res.data.data.Emergency_Contacts))
            {
              res.data.data.Supervisor_Data ? setSuperVisorData(res.data.data.Supervisor_Data.Supervisor) : setSuperVisorData(null);
              res.data.data.Team_Data ? setTeamData(arraydecoder(res.data.data.Team_Data)) : setTeamData(null);
              res.data.data.Pic_Data ? setPicData(res.data.data.Pic_Data.pic_path) : setPicData(null);
              res.data.data.Custom_Field_Data ? setCustomFields(res.data.data.Custom_Field_Data ) : setCustomFields([]);

            } 
     
             
             
            
            
          } else {
            alert('employee not found');
          }
        } catch (error) {
          dispatch(hideLoading());
          console.log(error);
        }
      }
    

        // Ensure user and Employee_ID are set
      getUserData();
      
    
  }, [user, dispatch]);
  
// useEffect(()=>{
//   userData ? console.log(userData) : console.log("nothinig yer")

// },[userData])
const handleTeam = async () => {setShowTeamModal(true);
setTeamView(true);
};
const handleDependant = () => {setShowTeamModal(true)
  setDependantView(true);
  
  };
  const handleEmergency = () => {setShowTeamModal(true)
    setEmergencyView(true);
    
    };
const handleClose = () => {setShowTeamModal(false)
  setDependantView(false);
  setTeamView(false)
  setEmergencyView(false)
};

  return (
    



    <Layout children={<div className='max-h-full h-full rounded-lg shadow-2xl shadow-black'>
      <section className='bg-gray-300 min-h-full h-full rounded-lg py-5 px-5'>
        
        <div className='flex flex-row justify-between h-full'>
          {/* Left side: Profile */}
          <div className='w-1/4'>
            <div className="mb-4 rounded-lg items-center flex justify-start flex-col bg-yellow-100 h-fit">
              <div className="text-center items-center flex flex-col">
              
                {
                   user?.Auth_Level!=='Admin User' ? <><img
                   src={picData ? `${picData}` : 'fav.png'}
                  alt="avatar"
                    className="rounded-circle px-2 w-fit h-52 mt-3"
   />
                   <p className="text-muted mb-1 font-bold pt-2">{user.Auth_Level}</p>
                   <p className="text-muted mb-4">{userData.Initials+" "+userData.Last_Name}</p></> :<p className="text-muted mb-1 text-3xl h-32 items-center flex justify-center font-bold pt-2">{user.Auth_Level}</p>
                }
              </div>
            </div>
            {
              user?.Auth_Level!=='Admin User' ? <div className='rounded-lg bg-yellow-200 h-64 flex flex-col justify-start items-center '>
            
              <Button variant="outline-success" onClick={handleTeam}   className='w-11/12 mt-2 bg-yellow-100 hover:bg-green-700 flex flex-row justify-center items-center h-16 rounded-lg'>
              
               <div className='w-3/4 text-2xl'>Team View</div> 
                <div className='w-fit h-1/2 ml-2 right-3'>
                <img src={popupIcon} className='h-full ' alt="" />
              </div>
                </Button>{' '}
                
                <Button variant="outline-success" onClick={handleDependant} className='w-11/12 mt-3 bg-yellow-100 hover:bg-green-700 flex flex-row justify-center items-center h-16 rounded-lg'>
              
               <div className='w-3/4 text-2xl'>Dependants</div> 
                <div className='w-fit h-1/2 ml-2 mr-0'>
                <img src={popupIcon} className='h-full ' alt="" />
              </div>
                </Button>{' '}
  
                <Button variant="outline-success" onClick={handleEmergency} className='w-11/12 mt-3 bg-yellow-100 hover:bg-green-700  flex flex-row justify-center items-center h-20 rounded-lg'>
              
              <div className='w-3/4 text-2xl'>Emergency Contacts</div> 
               <div className='w-fit h-1/2 ml-2 mr-0'>
               <img src={popupIcon} className='h-full ' alt="" />
             </div>
               </Button>{' '}
              
                
              </div> : <></>
            }
          </div>
    
          {/* Right side: Full Name List */}
          <div className='w-8/12  h-full'>
            <div className="rounded-lg pl-3 w-full py-3 pr-3 overflow-y-auto flex justify-start flex-col max-h-full bg-yellow-500" style={{
    scrollbarWidth: 'none', // Firefox
    msOverflowStyle: 'none', // Internet Explorer and Edge
  }}>
              {/* Multiple Full Name groups */}
              <div className='flex flex-col w-full h-full bg-yellow-100 hover:bg-yellow-200'>
                      
                      <div className='flex flex-row py-4 px-2 w-full items-start'>
                        <div className='text-start pl-10 text-1xl w-2/5'>User ID</div> {/* Replace underscores with spaces */}
                        <div className="text-gray-500 font-bold w-3/5 text-start px-8">{user.User_ID}</div>
                      </div>
                      <hr />
                    </div>
              {!userData ? <div>No Data Available</div> :
                  Object.entries(userData).map(([key, value]) => (
                    <div key={key} className='flex flex-col w-full bg-yellow-100 hover:bg-yellow-200'>
                      
                      <div className='flex flex-row py-4 px-2 w-full items-start'>
                        <div className=' text-start pl-10 text-1xl w-2/5'>{key.replace(/_/g, ' ')}</div> {/* Replace underscores with spaces */}
                        <div className="text-gray-500 text-1xl font-bold w-3/5 text-start px-8">{value}</div>
                      </div>
                      <hr />
                    </div>
                  ))}
                  {customFields ? 
                  customFields.map((row) => (
                    <div key={row.Field} className='flex flex-col w-full bg-yellow-100 hover:bg-yellow-200'>
                      
                      <div className='flex flex-row py-4 px-2 w-full items-start'>
                        <div className=' text-start pl-10 text-1xl w-2/5'>{row.Field.replace(/_/g, ' ')}</div> {/* Replace underscores with spaces */}
                        <div className="text-gray-500 text-1xl font-bold w-3/5 text-start px-8">{row.Data}</div>
                      </div>
                      <hr />
                    </div>
                  )) :<></>}
                  
              
              
              
              {/* Repeat other Full Name groups */}
            </div>
          </div>
        </div>
        <Modal show={showTeamModal} onHide={handleClose} className='absolute top-14 left-44 h-full' size="lg">
          {teamView ? <>
          
            <Modal.Header closeButton>
            <Modal.Title className='text-center text-green-800'>Team View</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* You can display the team information here */}
            <div className='flex flex-col justify-start items-center'>
              
              < div className='flex flex-col w-full bg-yellow-100 hover:bg-yellow-200'>
                <div className='flex flex-row py-3 w-full'>
                  <div className='px-5 w-1/2 text-start '>Supervisor</div> {/* Replace underscores with spaces */}
                  <div className="text-gray-600 text-start font-bold w-1/2">{supervisorData ? supervisorData : "none"}</div>
                </div>
              
              </div>
              < div className='flex flex-col w-full bg-yellow-100 hover:bg-yellow-200'>
                <div className='flex flex-row py-3 w-full'>
                  <div className='px-5 py-2 w-1/2 text-start'>Team Members</div> {/* Replace underscores with spaces */}
                  <ul>
                    
                    {!teamData ? <li>No Data Available</li> :
                  Object.entries(teamData).map(([key, value]) => (
                    <li   className="ml-6 py-2 px-5  text-gray-600 hover:bg-yellow-300 font-bold" key={key}>
                      
                      {value.Team_Member}
                    </li>))}
                    
                  </ul>
                </div>
              
              </div>

            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
          
          
          </> : dependantView ? <>
          <Modal.Header closeButton>
            <Modal.Title className='text-center text-green-900'>Family & Dependants</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* You can display the team information here */}
            <div className='flex flex-col justify-start items-center'>
              
              < div className='flex flex-col w-full'>
              <div className='flex flex-row w-full py-3'>
                  <div className='px-5 w-1/2 font-bold'>Name</div> {/* Replace underscores with spaces */}
                  <div className=" font-bold w-1/2">RelationShip</div>
                </div>
                
                  
                  {!dependantData || dependantData.length===0 ? <div className='w-full'>No Dependants</div> :
                  Object.entries(dependantData).map(([key, value]) => (
                  <div className='flex flex-col bg-yellow-100 hover:bg-yellow-200'>
                  <div className=' flex flex-row w-full py-3' key={key}>
                    <div  className="px-5 py-2 w-1/2 text-gray-800 font-bold" >
                      
                      {value.Name}
                    </div>
                  <div  className="px-5 py-2 w-1/2 text-gray-600 font-bold" key={key}>
                      
                  {value.Relationship}
                </div></div>
                <hr />
                </div>
              
                  ))}
              
              
              </div>
              
              
              </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
          
          
          
          </> : <>
          <Modal.Header closeButton>
            <Modal.Title className='text-center text-green-900'>Emergency Contacts</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* You can display the team information here */}
            <div className='flex flex-col justify-start items-center'>
              
            <div className='flex flex-col w-full'>
  <div className='flex flex-row w-full py-3 bg-gray-200'>
    <div className='text-center w-1/6 font-bold'>Contact Name</div>
    <div className='text-center w-1/6 font-bold'>Phone Number</div>
    <div className='text-center w-2/6 font-bold'>Email</div>
    <div className='text-center w-1/6 font-bold'>Address</div>
    <div className='text-center w-1/6 font-bold'>Relationship</div>
  </div>
 
  {!emergencyData || emergencyData.length === 0 ? (
    <div className='w-full'>No Emergency Contacts</div>
  ) : (
    
    Object.entries(emergencyData).map(([key, value]) => (
      <div className='flex flex-row w-full py-3 bg-yellow-100 hover:bg-yellow-200' key={key}>
        <div className='text-center w-1/6 text-gray-600 font-bold'>
          {value['Contact Name']}
        </div>
        <div className='text-center w-1/6 text-gray-600 font-bold'>
          {value['Phone number']}
        </div>
        <div className='text-center w-2/6 text-gray-600 font-bold'>
          {value.Email}
        </div>
        <div className='text-center w-1/6 text-gray-600 font-bold'>
          {value.Address}
        </div>
        <div className='text-center w-1/6 text-gray-600 font-bold'>
          {value.Relationship}
        </div>
      </div>
    ))
  )}
</div>
              </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
          
          
          </>}
        </Modal>



      </section>
    </div>
    }></Layout>
  
  )
}

export default Home
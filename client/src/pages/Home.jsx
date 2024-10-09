import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from "react-redux";
import axios from 'axios';
import Layout from '../components/Layout'
import profilepic from '../public/fav.png'
import popupIcon from '../public/new-tab.png'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import { hideLoading, showLoading } from "../redux/features/alertSlice";
const Home = () => {
  const user = useSelector((state) => state.user.user);
  const [userData,setUserData]=useState([])
  const [showTeamModal, setShowTeamModal] = useState(false); 
  const [teamView,setTeamView]=useState(false);
  const [dependantView,setDependantView]=useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const getUserData = async () => {
      
        // Only fetch data if Employee_ID is available
        try {
          dispatch(showLoading());
          const res = await axios.get(
            `http://localhost:5555/employeeTable?employeeId=${user.Employee_ID}`,
            
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            }
          );
          dispatch(hideLoading());
          
          if (res.data.success) {
            setUserData(res.data.data);
            
            
          } else {
            console.log(res.data.message);
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
const handleTeam = () => {setShowTeamModal(true)
setTeamView(true);
};
const handleDependant = () => {setShowTeamModal(true)
  setDependantView(true);
  };
const handleClose = () => {setShowTeamModal(false)
  setDependantView(false);
  setTeamView(false)
};

  return (
    



    <Layout children={<div className='max-h-full h-full rounded-lg shadow-2xl shadow-black'>
      <section className='bg-gray-300 min-h-full h-full rounded-lg py-5 px-5'>
        
        <div className='flex flex-row justify-between h-full'>
          {/* Left side: Profile */}
          <div className='w-1/4'>
            <div className="mb-4 rounded-lg items-center flex justify-start flex-col bg-white h-fit">
              <div className="text-center items-center flex flex-col">
                <img
                  src={profilepic}
                  alt="avatar"
                  className="rounded-circle w-3/4 h-3/4 mt-3"
                />
                <p className="text-muted mb-1 pt-2">{user.Auth_Level}</p>
                <p className="text-muted mb-4">{userData.Initials+" "+userData.Last_Name}</p>
              </div>
            </div>
            <div className='rounded-lg bg-white h-52 flex flex-col justify-start items-center '>
            
            <Button variant="outline-primary" onClick={handleTeam}   className='w-11/12 mt-3  flex flex-row justify-center items-center h-20 rounded-lg'>
            
             <div className='w-3/4 text-3xl'>Team View</div> 
              <div className='w-fit h-1/2 right-3'>
              <img src={popupIcon} className='h-full ' alt="" />
            </div>
              </Button>{' '}
              
              <Button variant="outline-success" onClick={handleDependant} className='w-11/12 mt-3  flex flex-row justify-center items-center h-20 rounded-lg'>
            
             <div className='w-3/4 text-3xl'>Dependants</div> 
              <div className='w-fit h-1/2 mr-0'>
              <img src={popupIcon} className='h-full ' alt="" />
            </div>
              </Button>{' '}
            
              
            </div>
          </div>
    
          {/* Right side: Full Name List */}
          <div className='w-8/12  h-full'>
            <div className="rounded-lg pl-3 py-3 overflow-y-auto flex justify-start flex-col max-h-full bg-white">
              {/* Multiple Full Name groups */}
              {!userData ? <div>Hello</div> :Object.entries(userData).map(([key, value]) => (
                < div key={key} className='flex flex-col'>
                <div className='flex flex-row p-5'>
                  <div className='px-5'>{key.replace(/_/g, ' ')}</div> {/* Replace underscores with spaces */}
                  <div className="text-gray-500 font-bold">{value}</div>
                </div>
              <hr />
            </div>
               ))}
              
              
              
              {/* Repeat other Full Name groups */}
            </div>
          </div>
        </div>
        <Modal show={showTeamModal} onHide={handleClose} className='absolute top-14 left-44 h-full' size="lg">
          {teamView ? <>
          
            <Modal.Header closeButton>
            <Modal.Title className='text-center text-blue-800'>Team View</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* You can display the team information here */}
            <div className='flex flex-col justify-start items-center'>
              
              < div className='flex flex-col'>
                <div className='flex flex-row py-3'>
                  <div className='px-5'>Supervisor</div> {/* Replace underscores with spaces */}
                  <div className="text-gray-500 font-bold">Dasun Promodya</div>
                </div>
              
              </div>
              < div className='flex flex-col'>
                <div className='flex flex-row py-3'>
                  <div className='px-5 py-2'>Teams</div> {/* Replace underscores with spaces */}
                  <ul>
                    <li className="ml-6 py-2 text-gray-500 font-bold">Dasun Prmaodya</li>
                    
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
          
          
          </> : <>
          <Modal.Header closeButton>
            <Modal.Title className='text-center text-green-900'>Family & Dependants</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* You can display the team information here */}
            <div className='flex flex-col justify-start items-center'>
              
              < div className='flex flex-col'>
              <div className='flex flex-row py-3'>
                  <div className='px-5 font-bold'>Name</div> {/* Replace underscores with spaces */}
                  <div className=" font-bold">RelationShip</div>
                </div>
                <div className='flex flex-row py-3'>
                  <div className='px-5'>Dasunn Pramodya</div> {/* Replace underscores with spaces */}
                  <div className="text-gray-500 font-bold">Child</div>
                </div>
              
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
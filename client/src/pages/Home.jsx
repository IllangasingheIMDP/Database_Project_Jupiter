import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from "react-redux";
import axios from 'axios';
import Layout from '../components/Layout'
import profilepic from '../public/fav.png'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { hideLoading, showLoading } from "../redux/features/alertSlice";
const Home = () => {
  const user = useSelector((state) => state.user.user);
  const [userData,setUserData]=useState([])
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

  return (
    



    <Layout children={<div className='max-h-full h-full rounded-lg shadow-2xl shadow-black'>
      <section className='bg-gray-300 min-h-full h-full rounded-lg py-5 px-5'>
        
        <div className='flex flex-row justify-between h-full'>
          {/* Left side: Profile */}
          <div className='w-1/4'>
            <div className="mb-4 rounded-lg items-center flex justify-start flex-col bg-white h-fit">
              <div className="text-center">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle w-full"
                />
                <p className="text-muted mb-1 pt-2">{user.Auth_Level}</p>
                <p className="text-muted mb-4">Employee Name</p>
              </div>
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
        
      </section>
    </div>
    }></Layout>
  
  )
}

export default Home
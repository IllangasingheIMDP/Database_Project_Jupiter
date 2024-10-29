import React,{useEffect, useState} from 'react';
import { employeeMenu, adminMenu,hrManagerMenu } from '../Data/data';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { setUser } from '../redux/features/userSlice';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { format } from 'date-fns';
import Modal from 'react-bootstrap/Modal'
import CustomAlert from './CustomAlert';
import Button from 'react-bootstrap/Button';
import notificationIcon from '../../public/notification.png'
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import api from '../axios';
// Import your GIF and profile picture here



const Layout = ({ children }) => {
  const [Stats,setStats]=useState(0);
  const [notifiAllRead,setNotifiAllRead]=useState(false);
  const [notifications,setNotifications]=useState([]);
  const [showMessage,setShowMessage]=useState('');
  const [alertMessage, setAlertMessage] = useState(null);
  const {enqueueSnackbar}=useSnackbar();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  const [showModal,setShowModal]=useState(false);
  const [hasTeam,setHasTeam]=useState(false);
  const formatDateTime = (dateTime) => {
    return format(new Date(dateTime), 'yyyy-MM-dd HH:mm');
  };

  const handleMessageShow=(notification,datetime)=>{
    setShowMessage(notification);
    const setStatus=async()=>{
      try {
        
        dispatch(showLoading());
        const res = await api.put(
          `/users/notification`,{
            userId:user.User_ID,
            datetime:datetime
          },
          
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        dispatch(hideLoading());
        if(res.data.success){
          setStats(Stats+1);
        }
        
       
        

       
        
      } catch (error) {
        dispatch(hideLoading());
        console.log(error);
      }
    }
    setStatus();


  }
  const closeMessageShow=()=>{
    setShowMessage('');
  }

  const notificationShow=()=>{
    setShowModal(true);
  }


  const handleClose = () => {setShowModal(false)
    
  };
  // Logout function
  const handleLogout = () => {
    localStorage.clear();
    
    setAlertMessage('Successfully Logged out')
    setTimeout(() => {
      dispatch(setUser(null));
      
      navigate('/login');
    }, 2000);
    
  };
  useEffect(()=>{
    const getTeam=async()=>{
      try {
        dispatch(showLoading());
        const res = await api.get(
          `/users/team?employeeId=${user.Employee_ID}`,
          
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        dispatch(hideLoading());
        
        if(res.data.success){
          setHasTeam(true);
        }else{
          setHasTeam(false);
        }
       
        
        
        
      } catch (error) {
       
        dispatch(hideLoading());
        if (error.response && error.response.status === 404) {
          
          setHasTeam(false);
        } else {
          // Log other errors
          console.error('Error fetching notifications:', error);
        }
      }

    }

    getTeam();
    

  },[]);

  useEffect(()=>{
    const getNotifications=async()=>{
      try {
        dispatch(showLoading());
        const res = await api.get(
          `/users/notification?userId=${user.User_ID}`,
          
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        dispatch(hideLoading());
        const arraydecoder=(data)=>{
          const dataArray = data;

          // Create a new object to hold the formatted key-value pairs
         let formattedData = [];

           // Loop through the array and add each key-value pair to formattedUserData
         dataArray.forEach((entry) => {
          // Extract the key and value from each object
         formattedData.push(entry) // Assign to the formatted object
           });
        formattedData= formattedData.sort((a, b) => {
          return new Date(b.DateTime) - new Date(a.DateTime);  // Compare DateTime values as Date objects
        });
        return formattedData;

        }
        
        if(res.data.success){
          setNotifications(arraydecoder(res.data.data));
        }else{
          setNotifications([]);
        }
       
        
        
        
      } catch (error) {
       
        dispatch(hideLoading());
        if (error.response && error.response.status === 404) {
          
          setNotifications([]); // Set to empty array if 404 (no notifications)
          setNotifiAllRead(true);
        } else {
          // Log other errors
          console.error('Error fetching notifications:', error);
        }
      }

    }
    getNotifications();



  },[Stats])

  useEffect(()=>{
    
    if (notifications.length > 0) {
      const allRead = notifications.every(element => element.Status === 1);

      if (allRead) {
        setNotifiAllRead(true);
      } else {
        setNotifiAllRead(false);
      }
    }else{
      setNotifiAllRead(true);
    }
  },[notifications])


  // Sidebar menu based on user type
  const SidebarMenu = user?.Auth_Level==='Admin User'
    ? adminMenu
    : user?.Auth_Level==='Employee' || user?.Auth_Level==='Second Manager' ? employeeMenu : user?.Auth_Level==='HR Manager' ? hrManagerMenu : "";
   

  return (
    <>
      <div className="flex bg-red-400">
        {/* Sidebar */}
        <div className="w-1/5 bg-yellow-700 text-white min-h-screen">
          
          <div className="p-4 text-xl">
            {SidebarMenu.filter(menu => !(menu.name === 'Approve/Reject Leave' && !hasTeam))
            .map((menu, index) => {
              const isActive = location.pathname === menu.path;
              return (
                <Link to={menu.path}> <div key={`${menu.path}-${index}`} className={`menu-item  ${isActive && "bg-red-300 text-black cursor-pointer hover:bg-red-400"} p-2 shadow-2xl cursor-pointer rounded-md my-2 hover:bg-yellow-800`}>
                  <i className={`${menu.icon} mr-2`}></i>
                  {menu.name}
                </div></Link>
              );
            })}
            <div className="menu-item  p-2 rounded-md my-2 bg-yellow-100 text-black cursor-pointer hover:bg-yellow-200" onClick={handleLogout}>
              <i className="fa-solid fa-right-from-bracket mr-2"></i>
              <span >Logout</span>
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div className="w-4/5">
          <div className="bg-red-200 p-4 shadow-md flex justify-between items-center h-[calc(10vh)] ">
            <div className="flex items-center space-x-4 w-3/5">
              <i className="fa-solid fa-bell text-gray-600 cursor-pointer"></i>
              <span className="text-gray-600 text-4xl "><strong>Hello,</strong> {user?.User_Name}</span> {/* Added Hello before user name */}
            </div>
            <button className='relative w-2/5 justify-end flex flex-row h-16' onClick={notificationShow}>
  <img src="/notification.png" alt="Notification Icon" className='h-16' />
  {notifiAllRead ? <></> :<img src="/reddot.png" alt="Red Dot" className='absolute h-6 w-6 top-0 right-0' />}
</button>

          </div>
          <div className="p-4 h-screen">
            {children}
          </div>
        </div>
        {alertMessage && (
        <CustomAlert message={alertMessage} onClose={() => setAlertMessage(null)} />
      )}
      </div>
      <Modal show={showModal} onHide={handleClose} className='absolute left-64 h-full' size="lg">
          
          
            <Modal.Header closeButton>
            <Modal.Title className='text-center text-red-800'>Notifications</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* You can display the team information here */}
            <div className='flex flex-col justify-start items-center'>
              {notifications ? notifications.map(noti => (
    <button onClick={()=>{
      handleMessageShow(noti.Notification,noti.DateTime)
    }}
         key={noti.DateTime} // Use a unique key, DateTime in this case
          className={`w-full rounded-lg py-2 hover:cursor-pointer hover:shadow-inner hover:shadow-red-950 transition-shadow duration-100    justify-start flex-col flex ${noti.Status === 1 ? 'bg-red-200 ' : 'bg-red-400'}`} // Conditional class
          >
      <div className='px-3'>{noti.Notification}</div>
      <div className='relative w-full text-end pr-3'><div>{formatDateTime(noti.DateTime)}</div></div>
       </button>
      ))
 : <div>No notifications</div>}

            </div>
            {showMessage && (
            <div className=' border-red-950 w-72  fixed h-56 flex flex-col top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-100 border-4  shadow-lg px-2 py-2 rounded z-auto transition-opacity duration-300 opacity-100' >
              <div className='min-h-5/6 w-full test-center h-5/6 px-2'>{showMessage}</div>
              <div className='flex flex-row justify-end'>
                <button className='p-2 text-white  bg-gray-500 rounded-lg' onClick={closeMessageShow}>Close</button>
              </div>
            </div>

          )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
          </Modal>
          
    </>
  );
};

export default Layout;

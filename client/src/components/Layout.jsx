import React,{useState} from 'react';
import { employeeMenu, adminMenu,hrManagerMenu } from '../Data/data';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { setUser } from '../redux/features/userSlice';
import { useSnackbar } from 'notistack';
import CustomAlert from './CustomAlert';
// Import your GIF and profile picture here



const Layout = ({ children }) => {
  const [alertMessage, setAlertMessage] = useState(null);
  const {enqueueSnackbar}=useSnackbar();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);
  const location = useLocation();
  const navigate = useNavigate();

  // Get user image based on user type
  

  // Logout function
  const handleLogout = () => {
    localStorage.clear();
    
    setAlertMessage('Successfully Logged out')
    setTimeout(() => {
      dispatch(setUser(null));
      
      navigate('/login');
    }, 2000);
    
  };

  // Sidebar menu based on user type
  const SidebarMenu = user?.Auth_Level==='Admin User'
    ? adminMenu
    : user?.Auth_Level==='Employee' || user?.Auth_Level==='Second Manager' ? employeeMenu : user?.Auth_Level==='HR Manager' ? hrManagerMenu : "";
   

  return (
    <>
      <div className="flex">
        {/* Sidebar */}
        <div className="w-1/5 bg-yellow-700 text-white min-h-screen">
          
          <div className="p-4 text-xl">
            {SidebarMenu.map((menu, index) => {
              const isActive = location.pathname === menu.path;
              return (
                <div key={`${menu.path}-${index}`} className={`menu-item ${isActive && "bg-red-300 text-black cursor-pointer hover:bg-red-400"} p-2 shadow-2xl cursor-pointer rounded-md my-2 hover:bg-yellow-800`}>
                  <i className={`${menu.icon} mr-2`}></i>
                  <Link to={menu.path}>{menu.name}</Link>
                </div>
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
          <div className="bg-gray-100 p-4 shadow-md flex justify-between items-center h-[calc(10vh)]">
            <div className="flex items-center space-x-4">
              <i className="fa-solid fa-bell text-gray-600 cursor-pointer"></i>
              <span className="text-gray-600 text-4xl "><strong>Hello,</strong> {user?.User_Name}</span> {/* Added Hello before user name */}
            </div>
            
          </div>
          <div className="p-4 h-screen">
            {children}
          </div>
        </div>
        {alertMessage && (
        <CustomAlert message={alertMessage} onClose={() => setAlertMessage(null)} />
      )}
      </div>
    </>
  );
};

export default Layout;

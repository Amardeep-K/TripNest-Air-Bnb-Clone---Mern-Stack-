
 import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
   <>
        { user ?
             <div className='flex  flex-col gap-10 justify-center items-center h-screen'>
            <img className="rounded-full h-50 w-50 " src={user?.profile?.url} alt="" />
      <h1>Welcome {user?.username} 👋</h1>
      <button className="btn" onClick={logout}>Logout</button>
    
    </div> :navigate('/auth/login') 
}
    </>
  );
};

export default Dashboard;

import {useState} from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { Dice1 } from 'lucide-react';
const Header = () => {
  const {user, logout}=useAuth();

  const handleLogout=async()=>{
    try{
      await logout();
      console.log("Logged out successfully");
    } catch(err){
      console.error("Logout failed:", err);
    }
  }



  return (
    <div className="navbar flex bg-base-100 shadow-lg w-full justify-center  ">
      <div className='flex Header-container justify-between w-full   max-w-7xl'>
  <div className=" navbar-start w-50! ">
    <Link className="btn btn-ghost text-2xl" to='/'><i className="fa-solid fa-plane-departure"></i> TripNest</Link>
  </div>
   <div className="justify-center flex-1  navbar-center hidden sm:items-center sm:flex">
   
  </div>
   <div className="navbar-end  sm:w-fit ">
     <ul className="menu menu-horizontal hidden sm:flex text-base px-1 ">
      <li><Link to={`/`}>Home</Link></li>
         <li><Link to={`/create`}>Add your Air bnb</Link></li>
        
      
    </ul>
   
    { user ? (
      <div className='flex ml-3 gap-4 items-center sm:text-sm text-xs border-l border-gray-600 px-4'>
        <span>Welcome , {user.username}</span>
      
      {/* <button onClick={handleLogout} className=' ring-1 ring-sky-500 px-2 shadow-lg py-1  text-md rounded text-sky-500 font-medium '>Logout</button> */}
       <div className=" navbar-end w-fit  gap-2  focus:border-sky-500 focus:ring-sky-500!">
    {/* <input type="text" placeholder="Search" className="input   input-bordered w-24 md:w-auto" /> */}
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt={user.username}
            src={user.profile.url} />
        </div>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <Link to={'/dashboard'} className="justify-between">
            Profile
            {/* <span className="badge">New</span> */}
          </Link>
        </li>
         <li className='sm:hidden'><Link to={`/`}>Home</Link></li>
         <li className='sm:hidden' ><Link to={`/create`}>Add your Air bnb</Link></li>
       
        <li><Link onClick={handleLogout} to="/">Logout</Link></li>
      </ul>
    </div>
  </div>
      </div>
     ):
    (  <div className='flex gap-1.5'>
    <Link  className='bg-sky-500 px-2  shadow-lg py-1 rounded text-md text-black font-medium ' to="/auth/login">Login</Link>
    <Link className=' ring-1 ring-sky-500 px-2 shadow-lg py-1  text-md rounded text-sky-500 font-medium ' to="/auth/register">Sign In</Link> </div>  )}
  </div>
  </div>
 
</div>
  )
}

export default Header
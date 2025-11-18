import React from 'react'
import Login from '../../components/Authentication/Login';
import Register from '../../components/Authentication/Register';
import Oauth from '../../components/Authentication/Oauth';

const Authentication = () => {
    const isLoggedIn = true; // Example condition
  return (

    <div className='flex  justify-center items-center h-screen'>
        <div className='flex flex-col gap-6'>
        { isLoggedIn ? (
          <Login />
        ) : (
          <Register />

        )} 
         { isLoggedIn ? (
          <Oauth />

):null}
 
        </div>
    </div>

  )
}

export default Authentication
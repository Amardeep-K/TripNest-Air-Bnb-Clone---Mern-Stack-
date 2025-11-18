import React from 'react'
import Login from '../../components/Authentication/Login'
import Oauth from '../../components/Authentication/Oauth'
const LoginPage = () => {
  return (
      <div className='flex  justify-center items-center h-screen'>
        <div className='flex flex-col gap-6'>

             <Login />
            <Oauth />
        </div>
       
        </div>
  )
}

export default LoginPage
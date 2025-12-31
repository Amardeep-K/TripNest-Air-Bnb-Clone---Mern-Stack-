import React from 'react'
import ListingCard from '../components/Listings/ListingCard.jsx'
import { useAuth } from '@/context/AuthContext.jsx'
const Home = () => {
  const {loading,setLoading}= useAuth();
  return (
    <div className='min-h-screen w-full  place-items-center sm:gap-x-35  px-[5em] py-6 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1'>
      
        <ListingCard/>

    </div>
  )
}

export default Home
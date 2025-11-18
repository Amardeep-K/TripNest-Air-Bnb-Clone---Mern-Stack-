
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import Listing from './Listing.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import ListingCard from './components/Listings/ListingCard.jsx';
import ListingDetails from './components/Listings/ListingDetails.jsx';
import CreateListing from './components/Listings/createListing.jsx';
import Home from './pages/Home.jsx';
import { useAuth } from "./context/AuthContext.jsx";
import ShowListing from './pages/ShowListing.jsx';
import EditListing from "./components/Listings/editListing.jsx";
import './App.css'
import LoginPage from "./pages/AuthenticationPages/LoginPage.jsx";
import RegisterPage from "./pages/AuthenticationPages/RegisterPage.jsx";

import MagicLinkPage from "./pages/AuthenticationPages/MagicLinkPage.jsx";
import Dashboard from "./pages/AuthenticationPages/Dashboard.jsx";
import MagicLogin from "./pages/AuthenticationPages/MagicLogin.jsx";

 export default function App () {
  const {user}=useAuth();


  return (
    <div className=" flex flex-col w-full ">
      
      <Header />

      <main className="min-h-screen">
        <ToastContainer
position="top-center"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
transition={Bounce}
/>
        <Routes>
          {/* Home page (all listings) */}
          <Route path="/" element={<Home/>} />

          {/* Show route (single listing) */}
          
          <Route path="/:id/edit" element={<EditListing/>} />
         <Route path="/dashboard" element={user ? <Dashboard /> : <LoginPage />}/>
          <Route path="/:id" element={<ShowListing/>} />
          <Route path="/auth/login" element={<LoginPage/>} />
          <Route path="/auth/register" element={<RegisterPage/>} />
           <Route path="/auth/magic/verify/:token" element={<MagicLogin/>} />
             <Route path="/auth/magiclink" element={<MagicLinkPage/>} />
           <Route path="/create" element={<CreateListing />} />
        </Routes>
      </main>

      <Footer />
    
     
    </div>
  );
}

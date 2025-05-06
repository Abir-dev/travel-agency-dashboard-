import React from 'react'
import {logoutUser} from "~/appwrite/auth";
import {Link, useNavigate} from "react-router";

const PageLayout = () => {
    const navigate = useNavigate();
    const handleLogout = async () => {
        await logoutUser();
        navigate('/sign-in');
    }
    return (
        <main className="travel-hero min-h-screen ">

           <section className=" flex px-30 py-4 min-h-screen">
                   <Link to=''>
                       <img
                           src="/assets/icons/logo.svg"
                           alt='Logo'
                           className='size-[30px]'
                       />
                   </Link>
                   <h1 className='p-28-semibold text-dark-100 mt-1 mr-200 ml-2'>Tourvisto</h1>


               <button onClick={() => {navigate('/dashboard')}}
               className="cursor-pointer mb-200 text-white mt-1/2">
                   Admin Panel
               </button>

               <button
                   onClick={handleLogout}
                   className="cursor-pointer"
               >
                   <img src="/assets/icons/logout.svg" alt="logout" className="size-6 mb-200  ml-2" />
               </button>
           </section>
        </main>
    )
}
export default PageLayout

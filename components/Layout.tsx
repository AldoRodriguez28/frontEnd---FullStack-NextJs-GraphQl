'use client'
import React from "react";
import { useRouter, usePathname } from 'next/navigation';
import Sidebar from "./SideBar";


const Layout = ({children}: { children: React.ReactNode }) => {

  const pathname = usePathname();
  
  return(
    <>
    {pathname === "/login" ? (
      <div   className="bg-gray-200 min-h-screen flex flex-col justify-center">
          {children}
      </div>
  ):(
      <div   className="bg-gray-200 min-h-screen">
        <div className="flex min-h-screen">
          <Sidebar /> 
          <main className= "bg-slate-900	sm:w-4/5 xl:w-4/5 sm:min-h-screen p-5">
            {children}
          </main>
        </div>
      </div>
    )}
  </>
  )};
export default Layout;

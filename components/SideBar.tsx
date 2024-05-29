'use client';
import React from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation';

const Sidebar = ()=>{
      // routing de next
      const router = useRouter();
      const pathname = usePathname();
    return(
        <aside className="bg-gray-800 sm:w-1/5 xl:w-1/5 sm:min-h-screen p-5" >
        <div>
            <p className="text-white text-2xl font-black">CRM Clientes</p>
        </div>

        <nav className="mt-5 list-none">
        <li className={pathname === "/dashboard" ? "bg-blue-800 p-2" : "p-2"}>
                <Link href="/dashboard">
                    <p className="text-white block">
                        Dashboard
                    </p>
                </Link>
            </li>
            <li className={pathname === "/clientes" ? "bg-blue-800 p-2" : "p-2"}>
                <Link href="/clientes">
                    <p className="text-white block">
                        Clientes
                    </p>
                </Link>
            </li>
            <li className={pathname === "/gestiones" ? "bg-blue-800 p-2" : "p-2"}>
                <Link href="/gestiones">
                    <p className="text-white block">
                        Gestiones
                    </p>
                </Link>
            </li>
            <li className={pathname === "/usuarios" ? "bg-blue-800 p-2" : "p-2"}>
                <Link href="/usuarios">
                    <p className="text-white block">
                        Usuarios
                    </p>
                </Link>
            </li>
           
           
        </nav>

    </aside>
    )

}
export default Sidebar;